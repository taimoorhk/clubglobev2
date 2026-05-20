import type { CoverageFile, DataManifest, FilterState, Club } from '@/lib/types'
import { ALL_TIERS } from '@/lib/types'
import {
  getCitiesForCountry,
  getClubSearchSuggestions,
  getLeaguesForCountry,
} from '@/lib/filters'
import { SearchAutocomplete } from './SearchAutocomplete'

interface FilterBarProps {
  manifest: DataManifest | null
  coverage: CoverageFile | null
  filters: FilterState
  allClubs: Club[]
  onFilterChange: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void
  onSelectClub: (club: Club) => void
  autoRotate: boolean
  onAutoRotateChange: (v: boolean) => void
}

export function FilterBar({
  manifest,
  coverage,
  filters,
  allClubs,
  onFilterChange,
  onSelectClub,
  autoRotate,
  onAutoRotateChange,
}: FilterBarProps) {
  const countries = manifest?.countries ?? []
  const cities = filters.countryCode
    ? getCitiesForCountry(allClubs, filters.countryCode)
    : []
  const leagues = filters.countryCode
    ? getLeaguesForCountry(allClubs, filters.countryCode)
    : []
  const suggestions = getClubSearchSuggestions(allClubs, filters.searchQuery, 8)

  const coverageForCountry = coverage?.countries.find(
    (c) => c.countryCode === filters.countryCode,
  )

  return (
    <header className="relative z-[100] flex shrink-0 flex-wrap items-stretch gap-2 overflow-visible border-b border-slate-800 bg-slate-900/90 px-3 py-2 backdrop-blur md:flex-nowrap md:items-center md:py-1.5">
      <div className="order-1 flex min-w-0 flex-1 shrink-0 items-center gap-2 whitespace-nowrap md:order-none md:flex-none">
        <span className="text-base font-bold tracking-tight text-emerald-400">
          ⚽ ClubGlobe
        </span>
      </div>

      <SearchAutocomplete
        query={filters.searchQuery}
        suggestions={suggestions}
        onQueryChange={(query) => onFilterChange('searchQuery', query)}
        onSelectClub={onSelectClub}
      />

        <select
          value={filters.countryCode ?? ''}
          onChange={(e) => {
            onFilterChange('countryCode', e.target.value || null)
            onFilterChange('city', null)
            onFilterChange('leagueId', null)
          }}
        className="order-3 h-9 min-w-0 flex-1 rounded-md border border-slate-700 bg-slate-800 px-2 text-xs focus:border-emerald-500 focus:outline-none md:order-none md:h-8 md:w-32 md:flex-none"
        >
          <option value="">All countries</option>
          {countries.map((c) => (
            <option key={c.countryCode} value={c.countryCode}>
              {c.country} ({c.clubCount})
            </option>
          ))}
        </select>

        <select
          value={filters.leagueId ?? ''}
          onChange={(e) => onFilterChange('leagueId', e.target.value || null)}
          disabled={!filters.countryCode}
        className="order-3 h-9 min-w-0 flex-1 rounded-md border border-slate-700 bg-slate-800 px-2 text-xs disabled:opacity-40 focus:border-emerald-500 focus:outline-none md:order-none md:h-8 md:w-28 md:flex-none"
        >
          <option value="">All leagues</option>
          {leagues.map((league) => (
            <option key={league.leagueId} value={league.leagueId}>
              {league.leagueName} ({league.clubCount})
            </option>
          ))}
        </select>

        <select
          value={filters.city ?? ''}
          onChange={(e) => onFilterChange('city', e.target.value || null)}
          disabled={!filters.countryCode}
        className="order-3 h-9 min-w-0 flex-1 rounded-md border border-slate-700 bg-slate-800 px-2 text-xs disabled:opacity-40 focus:border-emerald-500 focus:outline-none md:order-none md:h-8 md:w-24 md:flex-none"
        >
          <option value="">All cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

      <div className="order-4 flex w-full shrink-0 items-center gap-1 overflow-x-auto pb-0.5 md:order-none md:w-auto md:overflow-visible md:pb-0">
        <span className="hidden text-xs text-slate-500 sm:inline">Tier:</span>
          {ALL_TIERS.map((tier) => {
            const available =
              !coverageForCountry ||
              coverageForCountry.tiersAvailable.includes(tier) ||
              !filters.countryCode
            const active = filters.divisionTiers.includes(tier)
            return (
              <button
                key={tier}
                type="button"
                title={
                  available
                    ? `Division tier ${tier}`
                    : `Tier ${tier} — coming soon`
                }
                disabled={!available && !!filters.countryCode}
                onClick={() => {
                  const next = active
                    ? filters.divisionTiers.filter((t) => t !== tier)
                    : [...filters.divisionTiers, tier].sort()
                  onFilterChange('divisionTiers', next)
                }}
              className={`min-w-8 rounded px-2 py-1.5 text-xs font-medium transition md:min-w-0 md:px-1.5 md:py-1 ${
                  active
                    ? 'bg-emerald-600 text-white'
                    : available
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'cursor-not-allowed bg-slate-900 text-slate-600 line-through'
                }`}
              >
                {tier}
              </button>
            )
          })}
      </div>

        <button
          type="button"
          onClick={() => onAutoRotateChange(!autoRotate)}
          title={autoRotate ? 'Stop globe rotation' : 'Resume globe rotation'}
        className={`order-1 h-9 shrink-0 rounded-md border px-3 text-xs font-medium transition md:order-none md:h-8 ${
            autoRotate
              ? 'border-emerald-600/50 bg-emerald-900/40 text-emerald-300 hover:bg-emerald-900/60'
              : 'border-slate-600 bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          {autoRotate ? 'Stop Rotation' : 'Start'}
        </button>
    </header>
  )
}
