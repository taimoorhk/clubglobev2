/**
 * Ingest clubs from RapidAPI Free API Live Football Data (Creativesdev).
 * https://rapidapi.com/Creativesdev/api/free-api-live-football-data
 *
 * Requires RAPIDAPI_KEY in .env (X-RapidAPI-Key header).
 * Run: npm run data:rapidapi
 */
import 'dotenv/config'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  type Club,
  type CitiesMap,
  SEASON,
  mergeClubs,
  slugify,
  todayIso,
} from './lib/club-data.js'
import { resolveClubLocation } from './lib/club-locations.js'
import { loadAllCities } from './lib/load-cities.js'
import {
  type ApiEnvelope,
  type StandingRow,
  RapidApiFootballError,
  rapidFetch,
  teamLogoUrl,
} from './lib/rapidapi-football-client.js'
import { AFRICA_CCODE_MAP } from './lib/africa-ccodes.js'
import { ASIA_CCODE_MAP } from './lib/asia-ccodes.js'
import { OCEANIA_CCODE_MAP } from './lib/oceania-ccodes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'data', 'clubs')
const CACHE_DIR = path.join(ROOT, 'data', 'rapidapi-cache')
const TODAY = todayIso()
const MAX_TIER = Number(process.env.RAPIDAPI_MAX_TIER ?? 7)
const MIN_TEAMS = Number(process.env.RAPIDAPI_MIN_TEAMS ?? 8)

interface LeagueConfig {
  id: number
  name: string
  country: string
  countryCode: string
  ccode?: string
  tier: number
  /** Prefer fixtures endpoint when standings are empty */
  source?: 'matches' | 'standings'
}

interface MatchSide {
  id?: number
  name?: string
}

interface MatchRow {
  home?: MatchSide
  away?: MatchSide
}

interface LeagueMapFile {
  leagues: LeagueConfig[]
}

const REGION_FALLBACKS: Record<string, { lat: number; lng: number }> = {
  GB: { lat: 52.5, lng: -1.5 },
  'GB-SCT': { lat: 56.2, lng: -3.5 },
  'GB-WLS': { lat: 52.3, lng: -3.4 },
  ES: { lat: 40.4, lng: -3.7 },
  DE: { lat: 51.2, lng: 10.4 },
  IT: { lat: 41.9, lng: 12.5 },
  FR: { lat: 46.6, lng: 2.2 },
  PT: { lat: 39.4, lng: -8.2 },
  NL: { lat: 52.2, lng: 5.3 },
  BE: { lat: 50.8, lng: 4.4 },
  US: { lat: 39.8, lng: -98.5 },
  BR: { lat: -14.2, lng: -51.9 },
  AR: { lat: -34.6, lng: -58.4 },
  DEFAULT: { lat: 20, lng: 0 },
}

const loadCities = loadAllCities

async function loadLeagueMap(): Promise<LeagueConfig[]> {
  const file = JSON.parse(
    await fs.readFile(path.join(ROOT, 'data', 'rapidapi-league-map.json'), 'utf-8'),
  ) as LeagueMapFile
  return file.leagues.filter((l) => l.tier <= MAX_TIER)
}

async function fetchStandings(
  apiKey: string,
  leagueId: number,
): Promise<StandingRow[]> {
  const cachePath = path.join(CACHE_DIR, 'standings', `${leagueId}.json`)
  try {
    const cached = JSON.parse(await fs.readFile(cachePath, 'utf-8')) as StandingRow[]
    if (cached.length) return cached
  } catch {
    // miss
  }

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
    await fs.mkdir(path.dirname(cachePath), { recursive: true })
    await fs.writeFile(cachePath, JSON.stringify(rows, null, 2))
  }
  return rows
}

async function fetchTeamsFromMatches(
  apiKey: string,
  leagueId: number,
): Promise<StandingRow[]> {
  const cachePath = path.join(CACHE_DIR, 'matches', `${leagueId}.json`)
  try {
    const cached = JSON.parse(await fs.readFile(cachePath, 'utf-8')) as StandingRow[]
    if (cached.length) return cached
  } catch {
    // miss
  }

  const data = await rapidFetch<ApiEnvelope<{ matches?: MatchRow[] }>>(
    apiKey,
    'football-get-all-matches-by-league',
    { leagueid: leagueId },
  )

  const byId = new Map<number, StandingRow>()
  for (const match of data.response?.matches ?? []) {
    for (const side of [match.home, match.away]) {
      if (side?.id && side.name) {
        byId.set(side.id, {
          id: side.id,
          name: side.name,
          shortName: side.name,
        })
      }
    }
  }

  const rows = [...byId.values()]
  if (rows.length) {
    await fs.mkdir(path.dirname(cachePath), { recursive: true })
    await fs.writeFile(cachePath, JSON.stringify(rows, null, 2))
  }
  return rows
}

async function fetchLeagueTeams(
  apiKey: string,
  league: LeagueConfig,
): Promise<StandingRow[]> {
  if (league.source !== 'matches') {
    const standings = await fetchStandings(apiKey, league.id)
    if (standings.length >= MIN_TEAMS) return standings
  }
  return fetchTeamsFromMatches(apiKey, league.id)
}

function standingToClub(
  row: StandingRow,
  league: LeagueConfig,
  cities: CitiesMap,
): Club {
  const geo = resolveClubLocation(
    league.countryCode,
    row.name,
    row.id,
    cities,
  )

  return {
    id: `${league.countryCode.toLowerCase()}-${slugify(row.name)}`,
    name: row.name,
    countryCode: league.countryCode,
    country: league.country,
    city: geo.city,
    lat: geo.lat,
    lng: geo.lng,
    divisionTier: league.tier,
    leagueId: String(league.id),
    leagueName: league.name,
    season: SEASON,
    logoUrl: teamLogoUrl(row.id),
    source: 'rapidapi',
    updatedAt: TODAY,
  }
}

async function loadExistingByCountry(): Promise<Map<string, Club[]>> {
  const map = new Map<string, Club[]>()
  await fs.mkdir(OUT_DIR, { recursive: true })
  const files = (await fs.readdir(OUT_DIR)).filter((f) => f.endsWith('.json'))
  for (const file of files) {
    const code = file.replace('.json', '')
    const clubs = JSON.parse(
      await fs.readFile(path.join(OUT_DIR, file), 'utf-8'),
    ) as Club[]
    map.set(
      code,
      clubs.filter(
        (c) =>
          c.source === 'rapidapi' ||
          c.source === 'seed' ||
          c.source === 'africa-curated' ||
          c.source === 'asia-curated' ||
          c.source === 'americas-curated' ||
          c.source === 'eastern-europe-curated' ||
          c.source === 'iceland-curated' ||
          c.source === 'north-atlantic-curated' ||
          c.source === 'oceania-curated',
      ),
    )
  }
  return map
}

async function updateCoverage(byCountry: Map<string, Club[]>): Promise<void> {
  const coveragePath = path.join(ROOT, 'data', 'coverage.json')
  const coverage = JSON.parse(await fs.readFile(coveragePath, 'utf-8')) as {
    updatedAt: string
    countries: {
      countryCode: string
      country: string
      tiersAvailable: number[]
      tiersPlanned: number[]
      notes?: string
    }[]
  }

  const maxTier = MAX_TIER
  const known = new Set(coverage.countries.map((c) => c.countryCode))

  for (const [countryCode, clubs] of byCountry) {
    if (!clubs.length) continue
    if (!known.has(countryCode)) {
      coverage.countries.push({
        countryCode,
        country: clubs[0].country,
        tiersAvailable: [],
        tiersPlanned: [...Array(maxTier).keys()].map((i) => i + 1),
      })
      known.add(countryCode)
    }
  }

  for (const entry of coverage.countries) {
    const clubs = byCountry.get(entry.countryCode)
    if (!clubs?.length) continue
    const tiers = [...new Set(clubs.map((c) => c.divisionTier))].sort()
    entry.tiersAvailable = tiers
    entry.tiersPlanned = [...Array(maxTier).keys()]
      .map((i) => i + 1)
      .filter((t) => !tiers.includes(t))
    if (entry.tiersPlanned.length === 0) delete entry.notes
  }

  coverage.updatedAt = TODAY
  await fs.writeFile(coveragePath, JSON.stringify(coverage, null, 2))
  await fs.copyFile(
    coveragePath,
    path.join(ROOT, 'public', 'data', 'coverage.json'),
  )
}

/** Scan league ID range and append discoveries to cache (optional --discover). */
async function discoverLeagues(
  apiKey: string,
  from: number,
  to: number,
): Promise<LeagueConfig[]> {
  const found: LeagueConfig[] = []
  const ccodeToCountry: Record<string, { country: string; countryCode: string }> = {
    ENG: { country: 'England', countryCode: 'GB' },
    SCO: { country: 'Scotland', countryCode: 'GB-SCT' },
    ESP: { country: 'Spain', countryCode: 'ES' },
    GER: { country: 'Germany', countryCode: 'DE' },
    ITA: { country: 'Italy', countryCode: 'IT' },
    FRA: { country: 'France', countryCode: 'FR' },
    NED: { country: 'Netherlands', countryCode: 'NL' },
    POR: { country: 'Portugal', countryCode: 'PT' },
    USA: { country: 'USA', countryCode: 'US' },
    BRA: { country: 'Brazil', countryCode: 'BR' },
    ARG: { country: 'Argentina', countryCode: 'AR' },
    ...AFRICA_CCODE_MAP,
    ...ASIA_CCODE_MAP,
    ...OCEANIA_CCODE_MAP,
  }

  for (let id = from; id <= to; id++) {
    try {
      const detail = await rapidFetch<ApiEnvelope<{ leagues: LeagueDetail }>>(
        apiKey,
        'football-get-league-detail',
        { leagueid: id },
      )
      const league = detail.response?.leagues
      if (!league?.name || league.type === 'cup') continue

      const standings = await fetchStandings(apiKey, id)
      if (standings.length < MIN_TEAMS) continue

      const cc = league.country ?? 'INT'
      if (cc === 'INT') continue
      const mapped = ccodeToCountry[cc] ?? {
        country: cc,
        countryCode: cc,
      }

      found.push({
        id,
        name: league.name,
        country: mapped.country,
        countryCode: mapped.countryCode,
        ccode: cc,
        tier: 1,
      })
      console.log(`  discovered ${id}: ${league.name} (${cc}) — ${standings.length} teams`)
    } catch {
      // skip invalid ids
    }
  }

  return found
}

async function main() {
  const apiKey =
    process.env.RAPIDAPI_KEY?.trim() ?? process.env.VITE_RAPIDAPI_KEY?.trim()
  if (!apiKey) {
    console.error(
      'Missing RAPIDAPI_KEY. Add your RapidAPI key to .env (see .env.example).',
    )
    process.exit(1)
  }

  const discover = process.argv.includes('--discover')
  let leagues = await loadLeagueMap()

  const countryFilter = process.env.RAPIDAPI_COUNTRY_CODES?.split(',').map((s) =>
    s.trim().toUpperCase(),
  )
  if (countryFilter?.length) {
    leagues = leagues.filter((l) => countryFilter.includes(l.countryCode.toUpperCase()))
    console.log(`Filtering to countries: ${countryFilter.join(', ')}`)
  }

  if (discover) {
    const from = Number(process.env.RAPIDAPI_DISCOVER_FROM ?? 40)
    const to = Number(process.env.RAPIDAPI_DISCOVER_TO ?? 200)
    console.log(`Discovering leagues (ids ${from}–${to})…`)
    const extra = await discoverLeagues(apiKey, from, to)
    const byId = new Map(leagues.map((l) => [l.id, l]))
    for (const l of extra) {
      if (!byId.has(l.id)) byId.set(l.id, l)
    }
    leagues = [...byId.values()]
  }

  const cities = await loadCities()
  const byCountry = await loadExistingByCountry()
  let totalAdded = 0
  let skipped = 0

  console.log(`Ingesting ${leagues.length} leagues (tiers 1–${MAX_TIER})…\n`)

  for (const league of leagues) {
    process.stdout.write(`${league.name} (${league.country}, tier ${league.tier})… `)

    try {
      const standings = await fetchLeagueTeams(apiKey, league)
      if (standings.length < MIN_TEAMS) {
        console.log(`skipped (${standings.length} teams)`)
        skipped++
        continue
      }

      const clubs = standings.map((row) => standingToClub(row, league, cities))
      const existing = byCountry.get(league.countryCode) ?? []
      byCountry.set(league.countryCode, mergeClubs(existing, clubs))
      totalAdded += clubs.length
      console.log(`${clubs.length} teams`)
    } catch (err) {
      if (err instanceof RapidApiFootballError && err.status === 429) {
        console.log('\nRate limited — partial data saved. Re-run later or increase RAPIDAPI_DELAY_MS.')
        break
      }
      console.log(`failed: ${err}`)
      skipped++
    }
  }

  for (const [code, clubs] of byCountry) {
    await fs.writeFile(
      path.join(OUT_DIR, `${code}.json`),
      JSON.stringify(clubs, null, 2),
    )
  }

  await updateCoverage(byCountry)
  const { buildManifest } = await import('./build-manifest.js')
  await buildManifest()

  const summary = [...byCountry.entries()]
    .map(([code, clubs]) => {
      const tiers = [...new Set(clubs.map((c) => c.divisionTier))].sort()
      return `  ${code}: ${clubs.length} clubs (tiers ${tiers.join(', ')})`
    })
    .join('\n')

  console.log(`\nDone. ${totalAdded} team rows processed, ${skipped} leagues skipped.\n${summary}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
