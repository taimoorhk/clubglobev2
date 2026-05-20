/**
 * Fetches club data from TheSportsDB and writes per-country JSON to public/data/clubs/
 * Run: npm run data:build
 */
import 'dotenv/config'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'data', 'clubs')
const API_KEY = process.env.THESPORTSDB_API_KEY ?? '3'
const BASE = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`
const SEASON = '2025-26'
const TODAY = new Date().toISOString().slice(0, 10)

interface LeagueConfig {
  id: string
  name: string
  country: string
  countryCode: string
  tier: number
}

interface Club {
  id: string
  name: string
  countryCode: string
  country: string
  city: string
  lat: number
  lng: number
  divisionTier: number
  leagueId: string
  leagueName: string
  season: string
  logoUrl: string
  source: string
  updatedAt: string
}

interface CityEntry {
  lat: number
  lng: number
  countryCode: string
}

type CitiesMap = Record<string, CityEntry>

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function fetchJson<T>(url: string, retries = 3): Promise<T> {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url)
    if (res.status === 429) {
      await new Promise((r) => setTimeout(r, 3000 * (i + 1)))
      continue
    }
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
    return res.json() as Promise<T>
  }
  throw new Error(`Rate limited: ${url}`)
}

interface SportsDbTeam {
  idTeam: string
  strTeam: string
  strTeamShort?: string
  strStadium?: string
  strLocation?: string
  strCountry?: string
  strLeague?: string
  idLeague?: string
  strTeamBadge?: string
  strStadiumThumb?: string
  intStadiumCapacity?: string
}

interface LookupTeamsResponse {
  teams: SportsDbTeam[] | null
}

function parseCity(team: SportsDbTeam, league: LeagueConfig): string {
  const loc = team.strLocation?.trim()
  if (loc) {
    const parts = loc.split(',')
    return parts[0].trim()
  }
  const stadium = team.strStadium?.trim()
  if (stadium) return stadium
  return league.country
}

function geocode(
  city: string,
  countryCode: string,
  cities: CitiesMap,
  team: SportsDbTeam,
): { lat: number; lng: number } {
  const entry = cities[city]
  if (entry && entry.countryCode === countryCode) {
    return { lat: entry.lat, lng: entry.lng }
  }
  for (const [name, c] of Object.entries(cities)) {
    if (c.countryCode === countryCode && city.toLowerCase().includes(name.toLowerCase())) {
      return { lat: c.lat, lng: c.lng }
    }
  }
  const countryEntry = Object.values(cities).find((c) => c.countryCode === countryCode)
  if (countryEntry) {
    const jitter = (parseInt(team.idTeam, 10) % 100) * 0.002
    return { lat: countryEntry.lat + jitter, lng: countryEntry.lng + jitter }
  }
  return { lat: 0, lng: 0 }
}

interface LookupTableRow {
  idTeam: string
  strTeam: string
  strTeamBadge?: string
}

interface LookupTableResponse {
  table: LookupTableRow[] | null
}

interface TeamDetailResponse {
  teams: SportsDbTeam[] | null
}

async function enrichTeamBadge(team: SportsDbTeam): Promise<SportsDbTeam> {
  if (team.strTeamBadge) return team
  try {
    const detail = await fetchJson<TeamDetailResponse>(
      `${BASE}/lookupteam.php?id=${team.idTeam}`,
    )
    return detail.teams?.[0] ?? team
  } catch {
    return team
  }
}

async function collectLeagueTeams(league: LeagueConfig): Promise<SportsDbTeam[]> {
  const byId = new Map<string, SportsDbTeam>()

  const search = await fetchJson<LookupTeamsResponse>(
    `${BASE}/search_all_teams.php?l=${encodeURIComponent(league.name)}`,
  )
  for (const team of search.teams ?? []) {
    byId.set(team.idTeam, team)
  }

  try {
    const lookup = await fetchJson<LookupTeamsResponse>(
      `${BASE}/lookup_all_teams.php?id=${league.id}`,
    )
    for (const team of lookup.teams ?? []) {
      if (team.idLeague === league.id || team.strLeague === league.name) {
        byId.set(team.idTeam, team)
      }
    }
  } catch {
    // lookup may fail on free tier
  }

  try {
    const table = await fetchJson<LookupTableResponse>(
      `${BASE}/lookuptable.php?l=${league.id}&s=2024-2025`,
    )
    for (const row of table.table ?? []) {
      if (!byId.has(row.idTeam)) {
        byId.set(row.idTeam, {
          idTeam: row.idTeam,
          strTeam: row.strTeam,
          strTeamBadge: row.strTeamBadge,
          idLeague: league.id,
          strLeague: league.name,
        })
      }
    }
  } catch {
    // table may be partial on free tier
  }

  return [...byId.values()]
}

function teamToClub(
  team: SportsDbTeam,
  league: LeagueConfig,
  cities: CitiesMap,
): Club {
    const city = parseCity(team, league)
    const { lat, lng } = geocode(city, league.countryCode, cities, team)
    const name = team.strTeam
    return {
      id: `${league.countryCode.toLowerCase()}-${slugify(name)}`,
      name,
      countryCode: league.countryCode,
      country: league.country,
      city,
      lat,
      lng,
      divisionTier: league.tier,
      leagueId: league.id,
      leagueName: league.name,
      season: SEASON,
      logoUrl: team.strTeamBadge ?? '',
      source: 'thesportsdb',
      updatedAt: TODAY,
    }
}

async function fetchLeagueTeams(
  league: LeagueConfig,
  cities: CitiesMap,
): Promise<Club[]> {
  const rawTeams = await collectLeagueTeams(league)
  const clubs: Club[] = []

  for (const team of rawTeams) {
    const enriched = await enrichTeamBadge(team)
    clubs.push(teamToClub(enriched, league, cities))
    await new Promise((r) => setTimeout(r, 250))
  }

  return clubs
}

async function buildManifest(byCountry: Map<string, Club[]>) {
  const countries = [...byCountry.entries()]
    .map(([countryCode, clubs]) => {
      const tiers = [...new Set(clubs.map((c) => c.divisionTier))].sort()
      return {
        countryCode,
        country: clubs[0]?.country ?? countryCode,
        clubCount: clubs.length,
        tiersAvailable: tiers,
        file: `clubs/${countryCode}.json`,
      }
    })
    .sort((a, b) => a.country.localeCompare(b.country))

  const manifest = {
    generatedAt: new Date().toISOString(),
    totalClubs: countries.reduce((s, c) => s + c.clubCount, 0),
    countries,
  }

  await fs.writeFile(
    path.join(ROOT, 'public', 'data', 'manifest.json'),
    JSON.stringify(manifest, null, 2),
  )
}

async function main() {
  const tierMapPath = path.join(ROOT, 'data', 'league-tier-map.json')
  const citiesPath = path.join(ROOT, 'data', 'cities.json')
  const coveragePath = path.join(ROOT, 'data', 'coverage.json')

  const tierMap = JSON.parse(await fs.readFile(tierMapPath, 'utf-8')) as {
    leagues: LeagueConfig[]
  }
  const cities = JSON.parse(await fs.readFile(citiesPath, 'utf-8')) as CitiesMap

  await fs.mkdir(OUT_DIR, { recursive: true })
  await fs.mkdir(path.join(ROOT, 'public', 'data'), { recursive: true })

  const byCountry = new Map<string, Club[]>()
  const seenIds = new Set<string>()

  // Load existing seed/API files and merge
  const existingFiles = await fs.readdir(OUT_DIR).catch(() => [] as string[])
  for (const file of existingFiles.filter((f) => f.endsWith('.json'))) {
    const code = file.replace('.json', '')
    const clubs = JSON.parse(
      await fs.readFile(path.join(OUT_DIR, file), 'utf-8'),
    ) as Club[]
    byCountry.set(code, clubs)
    for (const c of clubs) seenIds.add(c.id)
  }

  for (const league of tierMap.leagues) {
    process.stdout.write(`Fetching ${league.name}… `)
    try {
      const clubs = await fetchLeagueTeams(league, cities)
      const list = byCountry.get(league.countryCode) ?? []
      for (const club of clubs) {
        const idx = list.findIndex((c) => c.id === club.id)
        if (idx >= 0) {
          if (club.logoUrl) list[idx] = { ...list[idx], ...club, logoUrl: club.logoUrl }
        } else if (!seenIds.has(club.id)) {
          seenIds.add(club.id)
          list.push(club)
        }
      }
      byCountry.set(league.countryCode, list)
      console.log(`${clubs.length} teams`)
    } catch (err) {
      console.log(`failed: ${err}`)
    }
    await new Promise((r) => setTimeout(r, 2000))
  }

  for (const [code, clubs] of byCountry) {
    clubs.sort((a, b) => a.name.localeCompare(b.name))
    await fs.writeFile(
      path.join(OUT_DIR, `${code}.json`),
      JSON.stringify(clubs, null, 2),
    )
  }

  await buildManifest(byCountry)
  await fs.copyFile(coveragePath, path.join(ROOT, 'public', 'data', 'coverage.json'))

  console.log(`\nDone. ${seenIds.size} clubs across ${byCountry.size} countries.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
