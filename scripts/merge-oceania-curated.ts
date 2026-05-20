/**
 * Merges curated Oceania clubs into public/data/clubs/{countryCode}.json.
 * Run: npx tsx scripts/merge-oceania-curated.ts
 */
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  OCEANIA_CURATED,
  getOceaniaClubLocation,
  type OceaniaClubEntry,
} from './data/oceania-clubs.js'
import { type Club, mergeClubs, slugify, todayIso } from './lib/club-data.js'
import { resolveClubLocation } from './lib/club-locations.js'
import { loadAllCities } from './lib/load-cities.js'
import {
  loadIndexFromCache,
  loadLeagueCountryMap,
  lookupTeamId,
  logoUrlForTeam,
  type TeamLogoIndex,
} from './lib/team-logo-index.js'
import { buildManifest } from './build-manifest.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'data', 'clubs')
const SEASON = '2025-26'
const TODAY = todayIso()

function hashId(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 10000
  return h
}

function spread(seed: number, axis: number): number {
  const n = (seed + axis * 97) % 41
  return (n - 20) * 0.004
}

function toClub(
  entry: OceaniaClubEntry,
  country: string,
  countryCode: string,
  tier: number,
  leagueName: string,
  cities: Awaited<ReturnType<typeof loadAllCities>>,
  logoIndex: TeamLogoIndex,
): Club {
  const id = `${countryCode.toLowerCase()}-${slugify(entry.name)}`
  const curatedLocation = getOceaniaClubLocation(countryCode, entry.name)
  const fallbackLocation = resolveClubLocation(countryCode, entry.name, id, cities)
  const seed = hashId(id)
  const geo = curatedLocation
    ? {
        city: curatedLocation.city,
        lat: curatedLocation.lat + spread(seed, 0),
        lng: curatedLocation.lng + spread(seed, 1),
      }
    : fallbackLocation
  const teamId = lookupTeamId(logoIndex, countryCode, entry.name)

  return {
    id,
    name: entry.name,
    countryCode,
    country,
    city: geo.city,
    lat: geo.lat,
    lng: geo.lng,
    divisionTier: tier,
    leagueId: `oceania-curated-${countryCode}-t${tier}`,
    leagueName,
    season: SEASON,
    logoUrl: teamId ? logoUrlForTeam(teamId) : '',
    source: 'oceania-curated',
    updatedAt: TODAY,
  }
}

async function main() {
  const cities = await loadAllCities()
  const leagueCountry = await loadLeagueCountryMap()
  const logoIndex: TeamLogoIndex = new Map()
  await loadIndexFromCache(logoIndex, leagueCountry)
  await fs.mkdir(OUT_DIR, { recursive: true })
  let added = 0

  for (const [countryCode, config] of Object.entries(OCEANIA_CURATED)) {
    const filePath = path.join(OUT_DIR, `${countryCode}.json`)
    let existing: Club[] = []
    try {
      existing = JSON.parse(await fs.readFile(filePath, 'utf-8')) as Club[]
    } catch {
      // new file
    }

    const rapidApiIds = new Set(
      existing.filter((club) => club.source === 'rapidapi').map((club) => club.id),
    )
    const incoming: Club[] = []
    for (const [tierStr, tierData] of Object.entries(config.tiers)) {
      const tier = Number(tierStr)
      for (const club of tierData.clubs) {
        const id = `${countryCode.toLowerCase()}-${slugify(club.name)}`
        if (rapidApiIds.has(id)) continue
        incoming.push(
          toClub(
            club,
            config.country,
            countryCode,
            tier,
            tierData.leagueName,
            cities,
            logoIndex,
          ),
        )
      }
    }

    const merged = mergeClubs(existing, incoming)
    added += incoming.length
    await fs.writeFile(filePath, JSON.stringify(merged, null, 2))
    console.log(`${countryCode}: +${incoming.length} curated -> ${merged.length} total`)
  }

  await buildManifest()
  console.log(`\nMerged ${added} curated Oceania clubs.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
