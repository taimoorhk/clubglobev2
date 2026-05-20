import type { Club, FilterState } from './types'
import { MAX_VISIBLE_PINS_ALL_COUNTRIES } from './types'

export interface LeagueOption {
  leagueId: string
  leagueName: string
  clubCount: number
}

export interface CountItem {
  name: string
  count: number
}

export interface CountryOverviewStats {
  totalClubs: number
  tierCounts: Record<number, number>
  topCities: CountItem[]
  topLeagues: LeagueOption[]
  leagueCount: number
  recentFormAvailable: number
  recentFormUnavailable: number
  logosAvailable: number
  apiClubs: number
  curatedClubs: number
}

export interface ClubSearchSuggestion {
  club: Club
  matchField: 'name' | 'city' | 'league' | 'country'
}

export function isPlottableClub(club: Club): boolean {
  return (
    Number.isFinite(club.lat) &&
    Number.isFinite(club.lng) &&
    Math.abs(club.lat) <= 90 &&
    Math.abs(club.lng) <= 180 &&
    !(club.lat === 0 && club.lng === 0)
  )
}

export function applyFilters(clubs: Club[], filters: FilterState): Club[] {
  let result = clubs.filter(isPlottableClub)

  if (filters.countryCode) {
    result = result.filter((c) => c.countryCode === filters.countryCode)
  }

  if (filters.city) {
    const cityLower = filters.city.toLowerCase()
    result = result.filter((c) => c.city.toLowerCase() === cityLower)
  }

  if (filters.leagueId) {
    result = result.filter((c) => c.leagueId === filters.leagueId)
  }

  if (filters.divisionTiers.length > 0) {
    result = result.filter((c) => filters.divisionTiers.includes(c.divisionTier))
  }

  if (filters.searchQuery.trim()) {
    const q = filters.searchQuery.trim().toLowerCase()
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.leagueName.toLowerCase().includes(q),
    )
  }

  return result
}

/** Prefer rapidapi/seed over legacy; one row per name per country when merging loads */
export function dedupeClubs(clubs: Club[]): Club[] {
  const byKey = new Map<string, Club>()

  function score(c: Club): number {
    let s = 0
    if (c.source === 'rapidapi') s += 100
    else if (c.source === 'seed') s += 50
    if (isPlottableClub(c)) s += 40
    s += c.divisionTier
    return s
  }

  for (const club of clubs) {
    const key = `${club.countryCode}:${club.name.toLowerCase().trim()}`
    const prev = byKey.get(key)
    if (!prev || score(club) > score(prev)) {
      byKey.set(key, club)
    }
  }

  return [...byKey.values()]
}

function roundRobinByCountry(clubs: Club[], limit: number): Club[] {
  const buckets = new Map<string, Club[]>()
  for (const c of clubs) {
    const list = buckets.get(c.countryCode) ?? []
    list.push(c)
    buckets.set(c.countryCode, list)
  }
  for (const list of buckets.values()) {
    list.sort((a, b) => a.name.localeCompare(b.name))
  }

  const codes = [...buckets.keys()].sort()
  const out: Club[] = []
  let round = 0
  while (out.length < limit) {
    let added = false
    for (const code of codes) {
      const list = buckets.get(code)!
      if (round < list.length) {
        out.push(list[round])
        added = true
        if (out.length >= limit) break
      }
    }
    if (!added) break
    round++
  }
  return out
}

export function limitPinsForGlobe(
  clubs: Club[],
  countryCode: string | null = null,
): {
  visible: Club[]
  truncated: boolean
  total: number
} {
  const plottable = clubs.filter(isPlottableClub)
  const total = plottable.length

  if (countryCode) {
    return { visible: plottable, truncated: false, total }
  }

  const cap = MAX_VISIBLE_PINS_ALL_COUNTRIES
  if (total <= cap) {
    return { visible: plottable, truncated: false, total }
  }

  return {
    visible: roundRobinByCountry(plottable, cap),
    truncated: true,
    total,
  }
}

export function getCitiesForCountry(clubs: Club[], countryCode: string): string[] {
  const cities = new Set<string>()
  for (const club of clubs) {
    if (club.countryCode === countryCode && club.city) {
      cities.add(club.city)
    }
  }
  return [...cities].sort((a, b) => a.localeCompare(b))
}

export function getLeaguesForCountry(
  clubs: Club[],
  countryCode: string,
): LeagueOption[] {
  const byId = new Map<string, LeagueOption>()
  for (const club of clubs) {
    if (club.countryCode !== countryCode || !club.leagueId) continue
    const current = byId.get(club.leagueId)
    if (current) {
      current.clubCount++
    } else {
      byId.set(club.leagueId, {
        leagueId: club.leagueId,
        leagueName: club.leagueName,
        clubCount: 1,
      })
    }
  }
  return [...byId.values()].sort((a, b) => {
    if (a.leagueName === b.leagueName) return a.leagueId.localeCompare(b.leagueId)
    return a.leagueName.localeCompare(b.leagueName)
  })
}

export function countByTier(clubs: Club[]): Record<number, number> {
  const counts: Record<number, number> = {}
  for (const club of clubs) {
    counts[club.divisionTier] = (counts[club.divisionTier] ?? 0) + 1
  }
  return counts
}

function topCounts(values: string[], limit: number): CountItem[] {
  const counts = new Map<string, number>()
  for (const value of values) {
    if (!value) continue
    counts.set(value, (counts.get(value) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, limit)
}

export function getCountryOverviewStats(
  clubs: Club[],
  countryCode: string,
): CountryOverviewStats {
  const countryClubs = clubs.filter(
    (club) => club.countryCode === countryCode && isPlottableClub(club),
  )
  const totalClubs = countryClubs.length
  const topLeagues = getLeaguesForCountry(countryClubs, countryCode).sort(
    (a, b) => b.clubCount - a.clubCount || a.leagueName.localeCompare(b.leagueName),
  )
  return {
    totalClubs,
    tierCounts: countByTier(countryClubs),
    topCities: topCounts(countryClubs.map((club) => club.city), 5),
    topLeagues: topLeagues.slice(0, 5),
    leagueCount: topLeagues.length,
    recentFormAvailable: countryClubs.filter(
      (club) => (club.recentForm?.matches.length ?? 0) > 0,
    ).length,
    recentFormUnavailable: countryClubs.filter(
      (club) => (club.recentForm?.matches.length ?? 0) === 0,
    ).length,
    logosAvailable: countryClubs.filter((club) => Boolean(club.logoUrl)).length,
    apiClubs: countryClubs.filter((club) => club.source === 'rapidapi').length,
    curatedClubs: countryClubs.filter((club) => club.source !== 'rapidapi').length,
  }
}

export function getClubSearchSuggestions(
  clubs: Club[],
  query: string,
  limit = 8,
): ClubSearchSuggestion[] {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return []

  const suggestions: { suggestion: ClubSearchSuggestion; score: number }[] = []
  for (const club of clubs) {
    if (!isPlottableClub(club)) continue
    const fields: Array<[ClubSearchSuggestion['matchField'], string, number]> = [
      ['name', club.name, 0],
      ['city', club.city, 1],
      ['league', club.leagueName, 2],
      ['country', club.country, 3],
    ]
    let best: { field: ClubSearchSuggestion['matchField']; score: number } | null = null
    for (const [field, value, weight] of fields) {
      const lower = value.toLowerCase()
      if (!lower.includes(q)) continue
      const score = (lower.startsWith(q) ? 0 : 10) + weight
      if (!best || score < best.score) best = { field, score }
    }
    if (best) {
      suggestions.push({
        suggestion: {
          club,
          matchField: best.field,
        },
        score: best.score,
      })
    }
  }

  return suggestions
    .sort((a, b) => {
      if (a.score !== b.score) return a.score - b.score
      return a.suggestion.club.name.localeCompare(b.suggestion.club.name)
    })
    .slice(0, limit)
    .map(({ suggestion }) => suggestion)
}
