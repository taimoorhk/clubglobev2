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
    <header className="relative z-[100] flex shrink-0 items-center gap-2 overflow-visible border-b border-slate-800 bg-slate-900/90 px-2 py-0.5 backdrop-blur">
      <div className="flex shrink-0 items-center gap-2 whitespace-nowrap">
        <span className="text-sm font-bold tracking-tight text-emerald-400">
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
        className="h-6 w-28 shrink-0 rounded-md border border-slate-700 bg-slate-800 px-2 text-[11px] focus:border-emerald-500 focus:outline-none md:w-32"
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
        className="h-6 w-24 shrink-0 rounded-md border border-slate-700 bg-slate-800 px-2 text-[11px] disabled:opacity-40 focus:border-emerald-500 focus:outline-none md:w-28"
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
        className="h-6 w-24 shrink-0 rounded-md border border-slate-700 bg-slate-800 px-2 text-[11px] disabled:opacity-40 focus:border-emerald-500 focus:outline-none"
        >
          <option value="">All cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

      <div className="flex shrink-0 items-center gap-1">
        <span className="hidden text-[10px] text-slate-500 sm:inline">Tier:</span>
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
              className={`rounded px-1 py-0.5 text-[10px] font-medium transition ${
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
        className={`h-6 shrink-0 rounded-md border px-2 text-[10px] font-medium transition ${
            autoRotate
              ? 'border-emerald-600/50 bg-emerald-900/40 text-emerald-300 hover:bg-emerald-900/60'
              : 'border-slate-600 bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          {autoRotate ? 'Stop' : 'Start'}
        </button>
    </header>
  )
}
