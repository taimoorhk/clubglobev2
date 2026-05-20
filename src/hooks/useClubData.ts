import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type {
  Club,
  CoverageFile,
  DataManifest,
  FilterState,
} from '@/lib/types'
import { applyFilters, dedupeClubs, limitPinsForGlobe } from '@/lib/filters'
import { fetchLiveRecentFormsForLeague } from '@/lib/recentFormRefresh'

interface UseClubDataOptions {
  allCountriesPinLimit?: number
}

const DEFAULT_FILTERS: FilterState = {
  countryCode: null,
  city: null,
  leagueId: null,
  divisionTiers: [1, 2, 3, 4, 5, 6, 7],
  searchQuery: '',
}

const LOAD_ALL_COUNTRIES_CONCURRENCY = 8

export function useClubData(options: UseClubDataOptions = {}) {
  const [manifest, setManifest] = useState<DataManifest | null>(null)
  const [coverage, setCoverage] = useState<CoverageFile | null>(null)
  const [loadedClubs, setLoadedClubs] = useState<Map<string, Club[]>>(
    new Map(),
  )
  const [loadingCountries, setLoadingCountries] = useState<Set<string>>(
    new Set(),
  )
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [debouncedFilters, setDebouncedFilters] =
    useState<FilterState>(DEFAULT_FILTERS)
  const [error, setError] = useState<string | null>(null)
  const refreshedRecentFormLeaguesRef = useRef<Set<string>>(new Set())
  const [refreshingRecentFormLeagueIds, setRefreshingRecentFormLeagueIds] =
    useState<Set<string>>(new Set())
  const [recentFormRefreshErrors, setRecentFormRefreshErrors] = useState<
    Record<string, string>
  >({})
  const loadedClubsRef = useRef(loadedClubs)
  const loadingCountriesRef = useRef(loadingCountries)

  useEffect(() => {
    loadedClubsRef.current = loadedClubs
  }, [loadedClubs])

  useEffect(() => {
    loadingCountriesRef.current = loadingCountries
  }, [loadingCountries])

  useEffect(() => {
    const t = setTimeout(() => setDebouncedFilters(filters), 150)
    return () => clearTimeout(t)
  }, [filters])

  useEffect(() => {
    Promise.all([
      fetch('/data/manifest.json').then((r) => r.json()),
      fetch('/data/coverage.json').then((r) => r.json()),
    ])
      .then(([m, c]) => {
        setManifest(m as DataManifest)
        setCoverage(c as CoverageFile)
      })
      .catch(() => setError('Failed to load data manifest'))
  }, [])

  const loadCountry = useCallback(async (countryCode: string) => {
    if (
      loadedClubsRef.current.has(countryCode) ||
      loadingCountriesRef.current.has(countryCode)
    ) {
      return
    }

    const loadingNext = new Set(loadingCountriesRef.current).add(countryCode)
    loadingCountriesRef.current = loadingNext
    setLoadingCountries(loadingNext)

    try {
      const res = await fetch(`/data/clubs/${countryCode}.json`)
      if (!res.ok) throw new Error(`No data for ${countryCode}`)
      const clubs = (await res.json()) as Club[]
      setLoadedClubs((prev) => {
        if (prev.has(countryCode)) return prev
        const next = new Map(prev).set(countryCode, clubs)
        loadedClubsRef.current = next
        return next
      })
    } catch {
      setError(`Could not load clubs for ${countryCode}`)
    } finally {
      const nextLoading = new Set(loadingCountriesRef.current)
      nextLoading.delete(countryCode)
      loadingCountriesRef.current = nextLoading
      setLoadingCountries(nextLoading)
    }
  }, [])

  const loadAllCountries = useCallback(async () => {
    if (!manifest) return
    for (let i = 0; i < manifest.countries.length; i += LOAD_ALL_COUNTRIES_CONCURRENCY) {
      const batch = manifest.countries.slice(i, i + LOAD_ALL_COUNTRIES_CONCURRENCY)
      await Promise.all(batch.map((c) => loadCountry(c.countryCode)))
    }
  }, [manifest, loadCountry])

  useEffect(() => {
    if (!manifest) return
    if (debouncedFilters.countryCode) {
      void loadCountry(debouncedFilters.countryCode)
    } else {
      void loadAllCountries()
    }
  }, [
    debouncedFilters.countryCode,
    manifest,
    loadCountry,
    loadAllCountries,
  ])

  const allLoadedClubs = useMemo(() => {
    const list: Club[] = []
    for (const clubs of loadedClubs.values()) {
      list.push(...clubs)
    }
    return dedupeClubs(list)
  }, [loadedClubs])

  const filteredClubs = useMemo(
    () => applyFilters(allLoadedClubs, debouncedFilters),
    [allLoadedClubs, debouncedFilters],
  )

  const pinData = useMemo(
    () =>
      limitPinsForGlobe(
        filteredClubs,
        debouncedFilters.countryCode,
        options.allCountriesPinLimit,
      ),
    [filteredClubs, debouncedFilters.countryCode, options.allCountriesPinLimit],
  )

  const updateFilter = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }))
    },
    [],
  )

  const refreshRecentFormsForLeague = useCallback(
    async (leagueId: string) => {
      if (!/^\d+$/.test(leagueId)) return
      if (refreshedRecentFormLeaguesRef.current.has(leagueId)) return

      const leagueClubs = allLoadedClubs.filter((club) => club.leagueId === leagueId)
      if (leagueClubs.length === 0) return

      refreshedRecentFormLeaguesRef.current.add(leagueId)
      setRefreshingRecentFormLeagueIds((prev) => new Set(prev).add(leagueId))
      setRecentFormRefreshErrors((prev) => {
        const next = { ...prev }
        delete next[leagueId]
        return next
      })

      try {
        const updates = await fetchLiveRecentFormsForLeague(leagueClubs, leagueId)
        if (updates.size === 0) return

        setLoadedClubs((prev) => {
          let changed = false
          const next = new Map(prev)
          for (const [countryCode, clubs] of next) {
            const updatedClubs = clubs.map((club) => {
              const recentForm = updates.get(club.id)
              if (!recentForm) return club
              changed = true
              return { ...club, recentForm }
            })
            if (updatedClubs !== clubs) next.set(countryCode, updatedClubs)
          }
          return changed ? next : prev
        })
      } catch (err) {
        setRecentFormRefreshErrors((prev) => ({
          ...prev,
          [leagueId]:
            err instanceof Error ? err.message : 'Recent form refresh failed',
        }))
      } finally {
        setRefreshingRecentFormLeagueIds((prev) => {
          const next = new Set(prev)
          next.delete(leagueId)
          return next
        })
      }
    },
    [allLoadedClubs],
  )

  const isLoading =
    loadingCountries.size > 0 ||
    (manifest !== null && loadedClubs.size === 0 && !error)

  return {
    manifest,
    coverage,
    filters,
    debouncedFilters,
    updateFilter,
    setFilters,
    filteredClubs,
    pinData,
    allLoadedClubs,
    loadCountry,
    refreshRecentFormsForLeague,
    refreshingRecentFormLeagueIds,
    recentFormRefreshErrors,
    isLoading,
    loadingCountries,
    error,
  }
}
