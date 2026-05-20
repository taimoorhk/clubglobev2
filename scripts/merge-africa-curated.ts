/**
 * Merges curated African clubs into public/data/clubs/{countryCode}.json
 * Run: npx tsx scripts/merge-africa-curated.ts
 */
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { AFRICA_CURATED } from './data/africa-clubs.js'
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

function toClub(
  name: string,
  country: string,
  countryCode: string,
  tier: number,
  leagueName: string,
  cities: Awaited<ReturnType<typeof loadAllCities>>,
  logoIndex: TeamLogoIndex,
): Club {
  const id = `${countryCode.toLowerCase()}-${slugify(name)}`
  const geo = resolveClubLocation(countryCode, name, id, cities)
  const teamId = lookupTeamId(logoIndex, countryCode, name)
  return {
    id,
    name,
    countryCode,
    country,
    city: geo.city,
    lat: geo.lat,
    lng: geo.lng,
    divisionTier: tier,
    leagueId: `africa-curated-${countryCode}-t${tier}`,
    leagueName,
    season: SEASON,
    logoUrl: teamId ? logoUrlForTeam(teamId) : '',
    source: 'africa-curated',
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

  for (const [countryCode, config] of Object.entries(AFRICA_CURATED)) {
    const filePath = path.join(OUT_DIR, `${countryCode}.json`)
    let existing: Club[] = []
    try {
      existing = JSON.parse(await fs.readFile(filePath, 'utf-8')) as Club[]
    } catch {
      // new file
    }

    const incoming: Club[] = []
    for (const [tierStr, tierData] of Object.entries(config.tiers)) {
      const tier = Number(tierStr)
      for (const name of tierData.clubs) {
        incoming.push(
          toClub(
            name,
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
    console.log(`${countryCode}: +${incoming.length} curated → ${merged.length} total`)
  }

  await buildManifest()
  console.log(`\nMerged ${added} curated African clubs.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
