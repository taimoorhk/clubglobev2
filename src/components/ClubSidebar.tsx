import type { Club, CoverageFile, DataManifest } from '@/lib/types'
import { countByTier, getCountryOverviewStats } from '@/lib/filters'
import { ClubDetail } from './ClubDetail'
import { CountryOverview } from './CountryOverview'

interface ClubSidebarProps {
  clubs: Club[]
  allClubs: Club[]
  selectedClub: Club | null
  onSelectClub: (club: Club) => void
  onClearSelection: () => void
  recentFormRefreshing?: boolean
  recentFormRefreshError?: string
  manifest: DataManifest | null
  coverage: CoverageFile | null
  countryCode: string | null
  isLoading: boolean
  truncated: boolean
  totalFiltered: number
}

export function ClubSidebar({
  clubs,
  allClubs,
  selectedClub,
  onSelectClub,
  onClearSelection,
  recentFormRefreshing,
  recentFormRefreshError,
  manifest,
  coverage,
  countryCode,
  isLoading,
  truncated,
  totalFiltered,
}: ClubSidebarProps) {
  const tierCounts = countByTier(clubs)
  const countryMeta = manifest?.countries.find(
    (c) => c.countryCode === countryCode,
  )
  const countryCoverage = coverage?.countries.find(
    (c) => c.countryCode === countryCode,
  )
  const countryOverview =
    countryCode && countryMeta
      ? getCountryOverviewStats(allClubs, countryCode)
      : null

  return (
    <aside className="order-2 flex h-[38dvh] max-h-[360px] min-h-[220px] w-full shrink-0 flex-col overflow-hidden border-t border-slate-800 bg-slate-900/80 md:order-1 md:h-full md:max-h-none md:min-h-0 md:w-80 md:border-r md:border-t-0 md:bg-slate-900/60">
      <div className="shrink-0 border-b border-slate-800 p-3">
        <h2 className="text-sm font-semibold text-slate-200">Clubs</h2>
        <p className="mt-0.5 text-xs text-slate-500">
          {isLoading
            ? 'Loading…'
            : `${clubs.length} shown${truncated ? ` of ${totalFiltered}` : ''}`}
        </p>
        {countryMeta && (
          <p className="mt-1 text-xs text-emerald-500/90">
            {countryMeta.country}: tiers{' '}
            {countryMeta.tiersAvailable.join(', ')} ({countryMeta.clubCount}{' '}
            clubs)
          </p>
        )}
        {!countryOverview && countryCoverage?.notes && (
          <p className="mt-1 text-xs text-amber-500/80">{countryCoverage.notes}</p>
        )}
        {truncated && (
          <p className="mt-1 text-xs text-amber-400">
            Showing a subset of pins — select a country to see every club on the map.
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-1">
          {Object.entries(tierCounts)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([tier, count]) => (
              <span
                key={tier}
                className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400"
              >
                T{tier}: {count}
              </span>
            ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {countryMeta && countryOverview ? (
          <CountryOverview
            country={countryMeta}
            coverage={countryCoverage}
            stats={countryOverview}
          />
        ) : null}

        <div className="p-2">
          <ClubDetail
            club={selectedClub}
            onClearSelection={onClearSelection}
            recentFormRefreshing={recentFormRefreshing}
            recentFormRefreshError={recentFormRefreshError}
          />
        </div>

        <ul className="grid grid-cols-1 gap-1 p-2 pt-0 sm:grid-cols-2 md:block">
          {clubs.map((club) => (
            <li key={club.id}>
              <button
                type="button"
                onClick={() => onSelectClub(club)}
                className={`flex w-full items-center gap-2 rounded-lg px-2 py-2.5 text-left text-sm transition md:mb-1 md:py-2 ${
                  selectedClub?.id === club.id
                    ? 'bg-emerald-900/40 text-emerald-100'
                    : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                {club.logoUrl ? (
                  <img
                    src={club.logoUrl}
                    alt=""
                    className="h-6 w-6 shrink-0 rounded-full object-contain"
                  />
                ) : (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-700 text-[9px] font-bold">
                    {club.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
                <span className="min-w-0 flex-1 truncate">
                  <span className="font-medium">{club.name}</span>
                  <span className="block truncate text-xs text-slate-500">
                    {club.leagueName} · T{club.divisionTier}
                  </span>
                </span>
              </button>
            </li>
          ))}
          {!isLoading && clubs.length === 0 && (
            <li className="p-4 text-center text-sm text-slate-500">
              No clubs match your filters.
            </li>
          )}
        </ul>
      </div>
    </aside>
  )
}
