/**
 * Enriches club JSON with RapidAPI-only recent form and trophy availability.
 *
 * Recent form comes from football-get-all-matches-by-league where available.
 * The current RapidAPI does not expose a trophy endpoint, so trophies are
 * marked unavailable unless a compatible response appears in the future.
 *
 * Run: npx tsx scripts/enrich-club-stats.ts
 *      npx tsx scripts/enrich-club-stats.ts --country GB,JP,EG
 */
import 'dotenv/config'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  type ApiEnvelope,
  RapidApiFootballError,
  rapidFetch,
} from './lib/rapidapi-football-client.js'
import {
  type Club,
  type ClubMatchOutcome,
  type ClubRecentForm,
  type ClubRecentMatch,
  type ClubTrophies,
  todayIso,
} from './lib/club-data.js'
import { buildManifest } from './build-manifest.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CLUBS_DIR = path.join(ROOT, 'public', 'data', 'clubs')
const CACHE_DIR = path.join(ROOT, 'data', 'rapidapi-cache')
const RAW_MATCH_DIR = path.join(CACHE_DIR, 'matches-raw')
const TROPHY_CACHE_DIR = path.join(CACHE_DIR, 'trophies')
const TODAY = todayIso()
const LAST_MATCH_COUNT = 10
const NO_RECENT_FORM_DATA = 'no data to show'

type TeamSide = {
  id?: number | string
  name?: string
  score?: number
}

type MatchStatus = {
  utcTime?: string
  finished?: boolean
  started?: boolean
  cancelled?: boolean
  awarded?: boolean
  scoreStr?: string
  reason?: {
    short?: string
    long?: string
    shortKey?: string
    longKey?: string
  }
}

type LeagueMatch = {
  id?: number | string
  leagueId?: number | string
  pageUrl?: string
  home?: TeamSide
  away?: TeamSide
  status?: MatchStatus
  notStarted?: boolean
  tournament?: { name?: string; stage?: string }
  displayTournament?: boolean
}

type StandingTeam = {
  id: number | string
  name: string
  shortName?: string
}

type TrophyResponse = {
  trophies?: unknown[]
  honours?: unknown[]
  titles?: unknown[]
}

type TrophySupport = 'supported' | 'unsupported' | 'unknown'

function normalizeTeamName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/\b(fc|afc|sc|cf|ac|as|club|football club)\b/g, '')
    .replace(/[^a-z0-9]/g, '')
}

function numericLeagueId(leagueId: string): number | null {
  if (!/^\d+$/.test(leagueId)) return null
  return Number(leagueId)
}

function teamIdFromLogo(logoUrl: string): string | null {
  return logoUrl.match(/teamlogo\/(\d+)\.png/)?.[1] ?? null
}

function teamIdKey(id: number | string | undefined): string | null {
  if (id === undefined || id === null || id === '') return null
  return String(id)
}

async function readJson<T>(filePath: string): Promise<T | null> {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf-8')) as T
  } catch {
    return null
  }
}

async function writeJson(filePath: string, value: unknown): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, JSON.stringify(value, null, 2))
}

async function fetchRawMatches(
  apiKey: string,
  leagueId: number,
): Promise<LeagueMatch[]> {
  const cachePath = path.join(RAW_MATCH_DIR, `${leagueId}.json`)
  const cached = await readJson<LeagueMatch[]>(cachePath)
  if (cached?.length) return cached

  const data = await rapidFetch<ApiEnvelope<{ matches?: LeagueMatch[] }>>(
    apiKey,
    'football-get-all-matches-by-league',
    { leagueid: leagueId },
  )
  const matches = Array.isArray(data.response?.matches)
    ? data.response.matches
    : []
  if (matches.length) await writeJson(cachePath, matches)
  return matches
}

async function loadStandingTeams(leagueId: number): Promise<StandingTeam[]> {
  const standings =
    (await readJson<StandingTeam[]>(
      path.join(CACHE_DIR, 'standings', `${leagueId}.json`),
    )) ?? []
  const matches =
    (await readJson<StandingTeam[]>(
      path.join(CACHE_DIR, 'matches', `${leagueId}.json`),
    )) ?? []

  const byId = new Map<string, StandingTeam>()
  for (const row of [...standings, ...matches]) {
    const key = teamIdKey(row.id)
    if (key && row.name) byId.set(key, row)
  }
  return [...byId.values()]
}

async function buildTeamIndex(
  leagueId: number,
  rawMatches: LeagueMatch[],
): Promise<Map<string, string>> {
  const index = new Map<string, string>()
  const add = (id: number | string | undefined, name?: string) => {
    const key = teamIdKey(id)
    if (!key || !name) return
    index.set(`id:${key}`, key)
    index.set(`name:${normalizeTeamName(name)}`, key)
  }

  for (const row of await loadStandingTeams(leagueId)) {
    add(row.id, row.name)
    add(row.id, row.shortName)
  }

  for (const match of rawMatches) {
    add(match.home?.id, match.home?.name)
    add(match.away?.id, match.away?.name)
  }

  return index
}

function clubTeamId(club: Club, index: Map<string, string>): string | null {
  const logoTeamId = teamIdFromLogo(club.logoUrl)
  if (logoTeamId && index.has(`id:${logoTeamId}`)) return logoTeamId

  const nameHit = index.get(`name:${normalizeTeamName(club.name)}`)
  if (nameHit) return nameHit

  return null
}

function matchDate(match: LeagueMatch): string | undefined {
  return match.status?.utcTime
}

function isCancelled(match: LeagueMatch): boolean {
  const status = match.status
  const reason = [
    status?.reason?.short,
    status?.reason?.long,
    status?.reason?.shortKey,
    status?.reason?.longKey,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return Boolean(
    status?.cancelled ||
      reason.includes('cancel') ||
      reason.includes('postpon') ||
      reason.includes('abandon') ||
      reason.includes('suspend'),
  )
}

function isCompletedOrCancelled(match: LeagueMatch): boolean {
  return Boolean(match.status?.finished || isCancelled(match))
}

function sideForTeam(
  match: LeagueMatch,
  teamId: string,
): { side: 'home' | 'away'; team: TeamSide; opponent: TeamSide } | null {
  if (teamIdKey(match.home?.id) === teamId) {
    return { side: 'home', team: match.home ?? {}, opponent: match.away ?? {} }
  }
  if (teamIdKey(match.away?.id) === teamId) {
    return { side: 'away', team: match.away ?? {}, opponent: match.home ?? {} }
  }
  return null
}

function outcomeForMatch(
  match: LeagueMatch,
  team: TeamSide,
  opponent: TeamSide,
): ClubMatchOutcome {
  if (isCancelled(match)) return 'C'
  if (typeof team.score !== 'number' || typeof opponent.score !== 'number') {
    return 'C'
  }
  if (team.score > opponent.score) return 'W'
  if (team.score < opponent.score) return 'L'
  return 'D'
}

function matchScore(match: LeagueMatch, team: TeamSide, opponent: TeamSide): string | undefined {
  if (match.status?.scoreStr) return match.status.scoreStr
  if (typeof team.score === 'number' && typeof opponent.score === 'number') {
    return `${team.score} - ${opponent.score}`
  }
  return undefined
}

function recentFormForClub(
  club: Club,
  teamId: string | null,
  matches: LeagueMatch[],
): ClubRecentForm {
  if (!teamId) {
    return {
      wins: 0,
      draws: 0,
      losses: 0,
      cancelled: 0,
      matches: [],
      source: 'rapidapi',
      updatedAt: TODAY,
      unavailableReason: NO_RECENT_FORM_DATA,
    }
  }

  const recent = matches
    .filter(isCompletedOrCancelled)
    .map((match) => {
      const side = sideForTeam(match, teamId)
      if (!side) return null
      const outcome = outcomeForMatch(match, side.team, side.opponent)
      return {
        date: matchDate(match),
        opponent: side.opponent.name ?? 'Unknown opponent',
        homeAway: side.side,
        score: matchScore(match, side.team, side.opponent),
        outcome,
        competition: match.tournament?.name ?? match.tournament?.stage,
        status: match.status?.reason?.short ?? match.status?.reason?.long,
      } satisfies ClubRecentMatch
    })
    .filter((match): match is ClubRecentMatch => Boolean(match))
    .sort((a, b) => {
      const aTime = a.date ? Date.parse(a.date) || 0 : 0
      const bTime = b.date ? Date.parse(b.date) || 0 : 0
      return bTime - aTime
    })
    .slice(0, LAST_MATCH_COUNT)

  const counts = recent.reduce(
    (acc, match) => {
      if (match.outcome === 'W') acc.wins++
      else if (match.outcome === 'D') acc.draws++
      else if (match.outcome === 'L') acc.losses++
      else acc.cancelled++
      return acc
    },
    { wins: 0, draws: 0, losses: 0, cancelled: 0 },
  )

  return {
    ...counts,
    matches: recent,
    source: 'rapidapi',
    updatedAt: TODAY,
    unavailableReason: recent.length ? undefined : NO_RECENT_FORM_DATA,
  }
}

async function trophySupport(apiKey: string, teamId: string | null): Promise<TrophySupport> {
  if (!teamId) return 'unknown'

  const markerPath = path.join(TROPHY_CACHE_DIR, 'support.json')
  const cached = await readJson<{ status: TrophySupport }>(markerPath)
  if (cached?.status) return cached.status

  const endpoints = [
    'football-get-team-trophies',
    'football-get-team-trophy',
    'football-get-team-detail',
    'football-get-team',
    'football-team-info',
  ]

  for (const endpoint of endpoints) {
    try {
      const data = await rapidFetch<ApiEnvelope<TrophyResponse>>(
        apiKey,
        endpoint,
        { teamid: teamId },
      )
      const response = data.response
      const items = response?.trophies ?? response?.honours ?? response?.titles
      if (Array.isArray(items)) {
        await writeJson(markerPath, { status: 'supported', endpoint })
        return 'supported'
      }
    } catch (err) {
      if (err instanceof RapidApiFootballError && err.status !== 404) {
        break
      }
    }
  }

  await writeJson(markerPath, { status: 'unsupported' })
  return 'unsupported'
}

function trophiesUnavailable(reason: string): ClubTrophies {
  return {
    items: [],
    source: 'rapidapi',
    updatedAt: TODAY,
    unavailableReason: reason,
  }
}

async function trophiesForClub(
  apiKey: string,
  teamId: string | null,
): Promise<ClubTrophies> {
  const support = await trophySupport(apiKey, teamId)
  if (support !== 'supported') {
    return trophiesUnavailable('Trophies not available from current API.')
  }

  // The current API has no confirmed trophy endpoint. This branch is kept so
  // future compatible responses can be wired without changing the club schema.
  return trophiesUnavailable('Trophy endpoint detected but parser is not configured.')
}

function parseCountryFilter(): Set<string> | null {
  const argCountry = process.argv.includes('--country')
    ? process.argv[process.argv.indexOf('--country') + 1]
    : process.env.STATS_COUNTRY_CODES
  if (!argCountry) return null
  return new Set(
    argCountry
      .split(',')
      .map((code) => code.trim().toUpperCase())
      .filter(Boolean),
  )
}

async function main() {
  const apiKey =
    process.env.RAPIDAPI_KEY?.trim() ?? process.env.VITE_RAPIDAPI_KEY?.trim()
  if (!apiKey) {
    console.error('Missing RAPIDAPI_KEY in .env')
    process.exit(1)
  }

  const countryFilter = parseCountryFilter()
  const files = (await fs.readdir(CLUBS_DIR)).filter((file) => file.endsWith('.json'))
  const leagueCache = new Map<
    number,
    { matches: LeagueMatch[]; teamIndex: Map<string, string> }
  >()

  let clubsUpdated = 0
  let formAvailable = 0
  let formUnavailable = 0

  for (const file of files) {
    const countryCode = file.replace('.json', '')
    if (countryFilter && !countryFilter.has(countryCode)) continue

    const filePath = path.join(CLUBS_DIR, file)
    const clubs = (await readJson<Club[]>(filePath)) ?? []
    let changed = false

    for (const club of clubs) {
      const leagueId = numericLeagueId(club.leagueId)
      if (!leagueId) {
        club.recentForm = recentFormForClub(club, null, [])
        club.trophies = await trophiesForClub(apiKey, null)
        formUnavailable++
        clubsUpdated++
        changed = true
        continue
      }

      let league = leagueCache.get(leagueId)
      if (!league) {
        const matches = await fetchRawMatches(apiKey, leagueId)
        league = {
          matches,
          teamIndex: await buildTeamIndex(leagueId, matches),
        }
        leagueCache.set(leagueId, league)
      }

      const teamId = clubTeamId(club, league.teamIndex)
      club.recentForm = recentFormForClub(club, teamId, league.matches)
      club.trophies = await trophiesForClub(apiKey, teamId)
      if (club.recentForm.matches.length) formAvailable++
      else formUnavailable++
      clubsUpdated++
      changed = true
    }

    if (changed) {
      await writeJson(filePath, clubs)
      console.log(`${countryCode}: ${clubs.length} clubs enriched`)
    }
  }

  await buildManifest()
  console.log(
    `\nDone. ${clubsUpdated} clubs processed. Recent form: ${formAvailable} available, ${formUnavailable} unavailable.`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
