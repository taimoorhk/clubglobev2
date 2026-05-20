/**
 * Builds Fotmob team id → logo URL index from RapidAPI cache and live fetches.
 */
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  type ApiEnvelope,
  type StandingRow,
  rapidFetch,
  teamLogoUrl,
} from './rapidapi-football-client.js'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')
const CACHE_DIR = path.join(ROOT, 'data', 'rapidapi-cache')

export type TeamLogoEntry = { id: number; name: string; shortName?: string }

export type TeamLogoIndex = Map<string, TeamLogoEntry>

function normalizeTeamName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/\s+(fc|sc|afc|cf|ac|as|sk|bk|if|ff|united|city|town|rovers)\.?$/gi, '')
    .replace(/[^a-z0-9]/g, '')
}

function indexKey(countryCode: string, name: string): string {
  return `${countryCode}:${normalizeTeamName(name)}`
}

function addTeam(
  index: TeamLogoIndex,
  countryCode: string,
  row: { id: number; name: string; shortName?: string },
): void {
  if (!row.id || !row.name) return
  const entry: TeamLogoEntry = {
    id: row.id,
    name: row.name,
    shortName: row.shortName,
  }
  index.set(indexKey(countryCode, row.name), entry)
  if (row.shortName && row.shortName !== row.name) {
    index.set(indexKey(countryCode, row.shortName), entry)
  }
}

async function readCacheRows(
  subdir: 'standings' | 'matches',
  leagueId: number,
): Promise<StandingRow[]> {
  try {
    return JSON.parse(
      await fs.readFile(path.join(CACHE_DIR, subdir, `${leagueId}.json`), 'utf-8'),
    ) as StandingRow[]
  } catch {
    return []
  }
}

async function fetchStandings(
  apiKey: string,
  leagueId: number,
): Promise<StandingRow[]> {
  const cached = await readCacheRows('standings', leagueId)
  if (cached.length) return cached

  const data = await rapidFetch<ApiEnvelope<{ standing?: StandingRow[] }>>(
    apiKey,
    'football-get-standing-all',
    { leagueid: leagueId },
  )
  const rows =
    data.status === 'success' && Array.isArray(data.response?.standing)
      ? data.response.standing
      : []
  if (rows.length) {
    await fs.mkdir(path.join(CACHE_DIR, 'standings'), { recursive: true })
    await fs.writeFile(
      path.join(CACHE_DIR, 'standings', `${leagueId}.json`),
      JSON.stringify(rows, null, 2),
    )
  }
  return rows
}

async function fetchMatchTeams(
  apiKey: string,
  leagueId: number,
): Promise<StandingRow[]> {
  const cached = await readCacheRows('matches', leagueId)
  if (cached.length) return cached

  const data = await rapidFetch<
    ApiEnvelope<{
      matches?: { home?: { id?: number; name?: string }; away?: { id?: number; name?: string } }[]
    }>
  >(apiKey, 'football-get-all-matches-by-league', { leagueid: leagueId })

  const byId = new Map<number, StandingRow>()
  for (const match of data.response?.matches ?? []) {
    for (const side of [match.home, match.away]) {
      if (side?.id && side.name) {
        byId.set(side.id, { id: side.id, name: side.name, shortName: side.name })
      }
    }
  }
  const rows = [...byId.values()]
  if (rows.length) {
    await fs.mkdir(path.join(CACHE_DIR, 'matches'), { recursive: true })
    await fs.writeFile(
      path.join(CACHE_DIR, 'matches', `${leagueId}.json`),
      JSON.stringify(rows, null, 2),
    )
  }
  return rows
}

export interface LeagueRef {
  id: number
  countryCode: string
  source?: 'matches' | 'standings'
}

export async function ingestLeagueTeams(
  apiKey: string,
  index: TeamLogoIndex,
  league: LeagueRef,
): Promise<number> {
  let rows: StandingRow[] = []
  if (league.source === 'matches') {
    rows = await fetchMatchTeams(apiKey, league.id)
  } else {
    rows = await fetchStandings(apiKey, league.id)
    if (rows.length < 8) {
      rows = await fetchMatchTeams(apiKey, league.id)
    }
  }
  for (const row of rows) addTeam(index, league.countryCode, row)
  return rows.length
}

/** Load every cached standings/matches file into the index. */
export async function loadIndexFromCache(
  index: TeamLogoIndex,
  leagueCountry: Map<number, string>,
): Promise<void> {
  for (const subdir of ['standings', 'matches'] as const) {
    const dir = path.join(CACHE_DIR, subdir)
    let files: string[] = []
    try {
      files = (await fs.readdir(dir)).filter((f) => f.endsWith('.json'))
    } catch {
      continue
    }
    for (const file of files) {
      const leagueId = Number(file.replace('.json', ''))
      const countryCode = leagueCountry.get(leagueId)
      if (!countryCode) continue
      const rows = JSON.parse(
        await fs.readFile(path.join(dir, file), 'utf-8'),
      ) as StandingRow[]
      for (const row of rows) addTeam(index, countryCode, row)
    }
  }
}

export async function loadLeagueCountryMap(): Promise<Map<number, string>> {
  const map = new Map<number, string>()

  const leagueMapPath = path.join(ROOT, 'data', 'rapidapi-league-map.json')
  const leagueMap = JSON.parse(await fs.readFile(leagueMapPath, 'utf-8')) as {
    leagues: { id: number; countryCode: string; ccode?: string }[]
  }
  for (const l of leagueMap.leagues) {
    map.set(l.id, l.countryCode)
  }

  const { AFRICA_CCODE_MAP } = await import('./africa-ccodes.js')
  const { ASIA_CCODE_MAP } = await import('./asia-ccodes.js')
  for (const file of ['africa-league-discovery.json', 'asia-league-discovery.json']) {
    try {
      const discovered = JSON.parse(
        await fs.readFile(path.join(ROOT, 'data', file), 'utf-8'),
      ) as { id: number; ccode: string }[]
      for (const l of discovered) {
        const cc =
          AFRICA_CCODE_MAP[l.ccode]?.countryCode ??
          ASIA_CCODE_MAP[l.ccode]?.countryCode
        if (cc) map.set(l.id, cc)
      }
    } catch {
      // optional
    }
  }

  return map
}

export function lookupTeamId(
  index: TeamLogoIndex,
  countryCode: string,
  clubName: string,
): number | null {
  const exact = index.get(indexKey(countryCode, clubName))
  if (exact) return exact.id

  const norm = normalizeTeamName(clubName)
  let best: TeamLogoEntry | null = null
  let bestScore = 0

  for (const [key, entry] of index) {
    if (!key.startsWith(`${countryCode}:`)) continue
    const entryNorm = normalizeTeamName(entry.name)
    if (entryNorm === norm) return entry.id
    if (entryNorm.includes(norm) || norm.includes(entryNorm)) {
      const score = Math.min(entryNorm.length, norm.length)
      if (score > bestScore) {
        bestScore = score
        best = entry
      }
    }
  }

  return best?.id ?? null
}

export function logoUrlForTeam(teamId: number): string {
  return teamLogoUrl(teamId)
}

export { normalizeTeamName, indexKey }
