import { useCallback, useEffect, useRef, useState } from 'react'
import { FilterBar } from './components/FilterBar'
import { ClubSidebar } from './components/ClubSidebar'
import { GlobeMap } from './components/GlobeMap'
import { useClubData } from './hooks/useClubData'
import { useGlobeControls } from './hooks/useGlobeControls'
import type { Club } from './lib/types'

function App() {
  const {
    manifest,
    coverage,
    filters,
    updateFilter,
    filteredClubs,
    pinData,
    allLoadedClubs,
    refreshRecentFormsForLeague,
    refreshingRecentFormLeagueIds,
    recentFormRefreshErrors,
    isLoading,
  } = useClubData()

  const {
    globeRef,
    flyToClub,
    flyToCountry,
    resetView,
    setAutoRotate,
    setupControls,
    zoomIn,
    zoomOut,
  } = useGlobeControls()
  const [selectedClub, setSelectedClub] = useState<Club | null>(null)
  const [autoRotate, setAutoRotateState] = useState(true)
  const previousSearchRef = useRef(filters.searchQuery)
  const pendingSearchSelectionRef = useRef<string | null>(null)

  const handleClearSelection = useCallback(
    (resetCamera = true) => {
      setSelectedClub(null)
      setAutoRotateState(true)
      setAutoRotate(true)
      if (!resetCamera) return
      if (filters.countryCode && filteredClubs.length > 0) {
        flyToCountry(filteredClubs)
      } else {
        resetView()
      }
    },
    [
      filteredClubs,
      filters.countryCode,
      flyToCountry,
      resetView,
      setAutoRotate,
    ],
  )

  const handleSelectClub = useCallback(
    (club: Club) => {
      if (selectedClub?.id === club.id) {
        handleClearSelection()
        return
      }
      setAutoRotateState(false)
      setAutoRotate(false)
      setSelectedClub(club)
      flyToClub(club)
    },
    [flyToClub, handleClearSelection, selectedClub?.id, setAutoRotate],
  )

  const handleSearchSelectClub = useCallback(
    (club: Club) => {
      pendingSearchSelectionRef.current = club.id
      if (filters.countryCode !== club.countryCode) {
        updateFilter('countryCode', club.countryCode)
      }
      updateFilter('city', null)
      updateFilter('leagueId', null)
      if (!filters.divisionTiers.includes(club.divisionTier)) {
        updateFilter(
          'divisionTiers',
          [...filters.divisionTiers, club.divisionTier].sort(),
        )
      }
      updateFilter('searchQuery', club.name)
      setAutoRotateState(false)
      setAutoRotate(false)
      setSelectedClub(club)
      flyToClub(club)
    },
    [
      filters.countryCode,
      filters.divisionTiers,
      flyToClub,
      setAutoRotate,
      updateFilter,
    ],
  )

  useEffect(() => {
    const previous = previousSearchRef.current.trim()
    const current = filters.searchQuery.trim()
    previousSearchRef.current = filters.searchQuery
    if (previous && !current && selectedClub) {
      handleClearSelection()
    }
  }, [filters.searchQuery, handleClearSelection, selectedClub])

  useEffect(() => {
    if (!selectedClub) return
    const selectionStillVisible = filteredClubs.some((club) => club.id === selectedClub.id)
    if (pendingSearchSelectionRef.current === selectedClub.id) {
      if (selectionStillVisible) pendingSearchSelectionRef.current = null
      return
    }
    if (!selectionStillVisible) handleClearSelection(false)
  }, [filteredClubs, handleClearSelection, selectedClub])

  useEffect(() => {
    if (!selectedClub) return
    const latest = allLoadedClubs.find((club) => club.id === selectedClub.id)
    if (latest && latest !== selectedClub) setSelectedClub(latest)
  }, [allLoadedClubs, selectedClub])

  useEffect(() => {
    if (!selectedClub?.leagueId) return
    void refreshRecentFormsForLeague(selectedClub.leagueId)
  }, [refreshRecentFormsForLeague, selectedClub?.leagueId])

  useEffect(() => {
    if (!filters.countryCode || filteredClubs.length === 0) return
    const countryClubs = filteredClubs.filter(
      (c) => c.countryCode === filters.countryCode,
    )
    if (countryClubs.length > 0) flyToCountry(countryClubs)
  }, [filters.countryCode, flyToCountry, filteredClubs.length])

  const handleGlobeReady = useCallback(() => {
    setupControls(autoRotate)
  }, [setupControls, autoRotate])

  useEffect(() => {
    setupControls(autoRotate)
  }, [autoRotate, setupControls])

  const handleAutoRotateChange = (enabled: boolean) => {
    setAutoRotateState(enabled)
    setAutoRotate(enabled)
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden md:h-screen">
      <FilterBar
        manifest={manifest}
        coverage={coverage}
        filters={filters}
        allClubs={allLoadedClubs}
        onFilterChange={updateFilter}
        onSelectClub={handleSearchSelectClub}
        autoRotate={autoRotate}
        onAutoRotateChange={handleAutoRotateChange}
      />

      <div className="relative z-0 flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row">
        <ClubSidebar
          clubs={filteredClubs}
          allClubs={allLoadedClubs}
          selectedClub={selectedClub}
          onSelectClub={handleSelectClub}
          onClearSelection={handleClearSelection}
          recentFormRefreshing={
            selectedClub
              ? refreshingRecentFormLeagueIds.has(selectedClub.leagueId)
              : false
          }
          recentFormRefreshError={
            selectedClub
              ? recentFormRefreshErrors[selectedClub.leagueId]
              : undefined
          }
          manifest={manifest}
          coverage={coverage}
          countryCode={filters.countryCode}
          isLoading={isLoading}
          truncated={pinData.truncated}
          totalFiltered={pinData.total}
        />

        <main className="relative z-0 order-1 min-h-0 min-w-0 flex-1 overflow-hidden md:order-2">
          <GlobeMap
            clubs={pinData.visible}
            selectedClub={selectedClub}
            onSelectClub={handleSelectClub}
            onClearSelection={handleClearSelection}
            globeRef={globeRef}
            autoRotate={autoRotate}
            onGlobeReady={handleGlobeReady}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
          />

          {pinData.truncated && (
            <div className="pointer-events-none absolute bottom-4 left-1/2 max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-full border border-amber-500/30 bg-slate-900/90 px-4 py-2 text-center text-xs text-amber-300">
              {pinData.total} clubs match — showing {pinData.visible.length}. Zoom
              in or filter further.
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
