import type { CountryCoverage, CountryManifest } from '@/lib/types'
import type { CountryOverviewStats } from '@/lib/filters'
import { ALL_TIERS } from '@/lib/types'

interface CountryOverviewProps {
  country: CountryManifest
  coverage?: CountryCoverage
  stats: CountryOverviewStats
}

function percent(value: number, total: number) {
  if (!total) return 0
  return Math.round((value / total) * 100)
}

export function CountryOverview({
  country,
  coverage,
  stats,
}: CountryOverviewProps) {
  return (
    <section className="space-y-3 border-b border-slate-800 p-3">
      <div>
        <h3 className="text-sm font-semibold text-slate-100">
          {country.country} overview
        </h3>
        <p className="mt-0.5 text-xs text-slate-500">
          {stats.totalClubs} clubs across {stats.leagueCount} leagues
        </p>
        {coverage?.notes ? (
          <p className="mt-1 text-xs text-amber-500/80">{coverage.notes}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-2">
          <div className="text-base font-semibold text-emerald-300">
            {percent(stats.logosAvailable, stats.totalClubs)}%
          </div>
          <div className="text-[10px] uppercase tracking-wide text-slate-500">
            logos
          </div>
        </div>
        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-2">
          <div className="text-base font-semibold text-emerald-300">
            {percent(stats.recentFormAvailable, stats.totalClubs)}%
          </div>
          <div className="text-[10px] uppercase tracking-wide text-slate-500">
            form
          </div>
        </div>
        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-2">
          <div className="text-base font-semibold text-emerald-300">
            {percent(stats.apiClubs, stats.totalClubs)}%
          </div>
          <div className="text-[10px] uppercase tracking-wide text-slate-500">
            API
          </div>
        </div>
      </div>

      <div>
        <div className="mb-1 text-xs font-medium text-slate-400">Tier distribution</div>
        <div className="flex flex-wrap gap-1">
          {ALL_TIERS.map((tier) => (
            <span
              key={tier}
              className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400"
            >
              T{tier}: {stats.tierCounts[tier] ?? 0}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-3 text-xs md:grid-cols-1">
        <div>
          <div className="mb-1 font-medium text-slate-400">Top cities</div>
          <ul className="space-y-1 text-slate-300">
            {stats.topCities.map((city) => (
              <li key={city.name} className="flex justify-between gap-3">
                <span className="truncate">{city.name}</span>
                <span className="font-semibold text-slate-400">{city.count}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-1 font-medium text-slate-400">Top leagues</div>
          <ul className="space-y-1 text-slate-300">
            {stats.topLeagues.map((league) => (
              <li key={league.leagueId} className="flex justify-between gap-3">
                <span className="truncate">{league.leagueName}</span>
                <span className="font-semibold text-slate-400">
                  {league.clubCount}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-lg bg-slate-950/40 p-2 text-[11px] text-slate-400">
        <span className="font-medium text-slate-300">Source mix:</span>{' '}
        {stats.apiClubs} API, {stats.curatedClubs} curated.{' '}
        {stats.recentFormUnavailable} clubs have no recent form data yet.
      </div>
    </section>
  )
}
