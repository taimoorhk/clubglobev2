import type { Club } from '@/lib/types'
import { getInitials, initialsColor } from '@/lib/initialsAvatar'

interface ClubDetailProps {
  club: Club | null
  onClearSelection?: () => void
  recentFormRefreshing?: boolean
  recentFormRefreshError?: string
}

const FORM_SEGMENTS = [
  { key: 'wins', label: 'W', className: 'bg-emerald-500' },
  { key: 'draws', label: 'D', className: 'bg-slate-400' },
  { key: 'losses', label: 'L', className: 'bg-rose-500' },
  { key: 'cancelled', label: 'C', className: 'bg-amber-400' },
] as const

const OUTCOME_STYLES = {
  W: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  D: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  L: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  C: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
} as const

function formatDate(date?: string) {
  if (!date) return ''
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return ''
  return parsed.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}

export function ClubDetail({
  club,
  onClearSelection,
  recentFormRefreshing,
  recentFormRefreshError,
}: ClubDetailProps) {
  if (!club) {
    return (
      <div className="rounded-lg border border-dashed border-slate-700 p-4 text-center text-sm text-slate-500">
        Select a club on the map or from the list
      </div>
    )
  }

  return (
    <div className="space-y-3 rounded-lg border border-slate-700 bg-slate-800/50 p-4">
      <div className="flex items-start gap-3">
        {club.logoUrl ? (
          <img
            src={club.logoUrl}
            alt={club.name}
            className="h-14 w-14 rounded-full border border-slate-600 bg-slate-900 object-contain p-1"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: initialsColor(club.name) }}
          >
            {getInitials(club.name)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold text-white">{club.name}</h2>
          <p className="text-sm text-slate-400">
            {club.city}, {club.country}
          </p>
        </div>
        {onClearSelection ? (
          <button
            type="button"
            aria-label="Close selected club"
            title="Close selected club"
            onClick={onClearSelection}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-600 text-sm font-bold text-slate-300 hover:bg-slate-700"
          >
            X
          </button>
        ) : null}
      </div>

      <dl className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <dt className="text-slate-500">Division tier</dt>
          <dd className="font-medium text-emerald-400">Tier {club.divisionTier}</dd>
        </div>
        <div>
          <dt className="text-slate-500">League</dt>
          <dd className="font-medium">{club.leagueName}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Season</dt>
          <dd>{club.season}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Coordinates</dt>
          <dd className="font-mono text-xs">
            {club.lat.toFixed(4)}, {club.lng.toFixed(4)}
          </dd>
        </div>
      </dl>

      <section className="space-y-2 rounded-lg border border-slate-700 bg-slate-900/40 p-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-white">Last 10 games</h3>
            <p className="text-[10px] text-slate-500">
              {recentFormRefreshing
                ? 'Refreshing live stats...'
                : club.recentForm?.source === 'rapidapi-live'
                  ? `Live updated ${club.recentForm.updatedAt}`
                  : 'Loaded from saved stats'}
            </p>
          </div>
          {club.recentForm?.matches.length ? (
            <div className="flex gap-1 text-[10px] font-bold">
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-emerald-300">
                W {club.recentForm.wins}
              </span>
              <span className="rounded bg-slate-500/20 px-1.5 py-0.5 text-slate-300">
                D {club.recentForm.draws}
              </span>
              <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-rose-300">
                L {club.recentForm.losses}
              </span>
              <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-amber-300">
                C {club.recentForm.cancelled}
              </span>
            </div>
          ) : null}
        </div>

        {recentFormRefreshError ? (
          <p className="rounded border border-amber-500/30 bg-amber-950/30 px-2 py-1 text-[10px] text-amber-300">
            Live refresh unavailable: {recentFormRefreshError}
          </p>
        ) : null}

        {club.recentForm?.matches.length ? (
          <>
            <div className="flex h-2 overflow-hidden rounded-full bg-slate-800">
              {FORM_SEGMENTS.map((segment) => {
                const total = club.recentForm?.matches.length ?? 0
                const value = club.recentForm?.[segment.key] ?? 0
                if (!total || !value) return null
                return (
                  <div
                    key={segment.key}
                    className={segment.className}
                    title={`${segment.label}: ${value}`}
                    style={{ width: `${(value / total) * 100}%` }}
                  />
                )
              })}
            </div>
            <div className="grid gap-1.5">
              {club.recentForm.matches.map((match, index) => (
                <div
                  key={`${match.date ?? 'match'}-${match.opponent}-${index}`}
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-lg border border-slate-700 bg-slate-950/30 px-2 py-1.5"
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold ${OUTCOME_STYLES[match.outcome]}`}
                    title={match.status}
                  >
                    {match.outcome}
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1 text-xs text-slate-200">
                      <span className="text-[10px] font-semibold uppercase text-slate-500">
                        {match.homeAway === 'away' ? '@' : 'vs'}
                      </span>
                      <span className="truncate">{match.opponent}</span>
                    </span>
                    <span className="block truncate text-[10px] text-slate-500">
                      {formatDate(match.date) || 'Date TBD'}
                      {match.competition ? ` · ${match.competition}` : ''}
                    </span>
                  </span>
                  <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-semibold text-slate-300">
                    {match.score || '-'}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-xs text-slate-500">no data to show</p>
        )}
      </section>

      <section className="space-y-2 rounded-lg border border-slate-700 bg-slate-900/40 p-3">
        <h3 className="text-sm font-semibold text-white">Trophies</h3>
        {club.trophies?.items.length ? (
          <ul className="space-y-1 text-xs text-slate-300">
            {club.trophies.items.map((trophy) => (
              <li key={trophy.name} className="flex justify-between gap-3">
                <span>{trophy.name}</span>
                {typeof trophy.count === 'number' ? (
                  <span className="font-semibold text-emerald-300">
                    {trophy.count}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-slate-500">
            {club.trophies?.unavailableReason ??
              'Trophies not available from current API.'}
          </p>
        )}
      </section>
    </div>
  )
}
