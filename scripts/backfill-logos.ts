/**
 * Fills missing logoUrl from Fotmob team IDs (RapidAPI standings/matches).
 * Run: npx tsx scripts/backfill-logos.ts
 *      npx tsx scripts/backfill-logos.ts --country KE
 */
import 'dotenv/config'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import type { Club } from './lib/club-data.js'
import { todayIso } from './lib/club-data.js'
import {
  ingestLeagueTeams,
  loadIndexFromCache,
  loadLeagueCountryMap,
  logoUrlForTeam,
  lookupTeamId,
  type TeamLogoIndex,
} from './lib/team-logo-index.js'
import { fetchWikipediaLogo } from './lib/wikipedia-logo.js'
import { buildManifest } from './build-manifest.js'
import { AMERICAS_CODES } from './data/americas-clubs.js'
import { OCEANIA_CODES } from './data/oceania-clubs.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CLUBS_DIR = path.join(ROOT, 'public', 'data', 'clubs')
const TODAY = todayIso()

const AFRICA_CODES = new Set(
  'DZ EG GH MA NG ZA TN KE SN CI CM UG ZM ZW TZ ET AO MZ BW NA ML BF GA CG CD RW BI LY SD GN BJ TG NE MW LS SZ MG MU SC GM GW CV ST GQ TD MR LR SL SS CF SO DJ ER KM'.split(
    ' ',
  ),
)

const ASIA_CODES = new Set(
  'JP KR CN TW HK IN PK BD LK NP AF TH VN ID MY SG PH MM KH LA BN TL SA AE QA KW BH OM IQ IR IL JO LB SY YE KZ UZ TM KG TJ GE AM AZ MN'.split(
    ' ',
  ),
)

async function main() {
  const apiKey =
    process.env.RAPIDAPI_KEY?.trim() ?? process.env.VITE_RAPIDAPI_KEY?.trim()

  const onlyCountry = process.argv.includes('--country')
    ? process.argv[process.argv.indexOf('--country') + 1]
    : null
  const africaOnly = process.argv.includes('--africa')
  const asiaOnly = process.argv.includes('--asia')
  const americasOnly = process.argv.includes('--americas')
  const oceaniaOnly = process.argv.includes('--oceania')
  const wikiOnly = process.argv.includes('--wikipedia-only')
  const useWikipedia =
    wikiOnly ||
    process.argv.includes('--wikipedia') ||
    ((africaOnly || asiaOnly || americasOnly || oceaniaOnly) &&
      !process.argv.includes('--no-wikipedia'))

  if (!wikiOnly && !apiKey) {
    console.error('Missing RAPIDAPI_KEY in .env')
    process.exit(1)
  }

  const leagueCountry = await loadLeagueCountryMap()
  const index: TeamLogoIndex = new Map()

  if (!wikiOnly) {
    await loadIndexFromCache(index, leagueCountry)
  }

  const leagueMap = JSON.parse(
    await fs.readFile(path.join(ROOT, 'data', 'rapidapi-league-map.json'), 'utf-8'),
  ) as {
    leagues: { id: number; countryCode: string; source?: 'matches' | 'standings' }[]
  }

  if (!wikiOnly && apiKey) {
    console.log('Fetching team lists from RapidAPI…')
  }
  for (const league of leagueMap.leagues) {
    if (wikiOnly || !apiKey) break
    if (africaOnly && !AFRICA_CODES.has(league.countryCode)) continue
    if (asiaOnly && !ASIA_CODES.has(league.countryCode)) continue
    if (onlyCountry && league.countryCode !== onlyCountry) continue
    if (americasOnly && !AMERICAS_CODES.has(league.countryCode)) continue
    if (oceaniaOnly && !OCEANIA_CODES.has(league.countryCode)) continue
    const n = await ingestLeagueTeams(apiKey, index, league)
    if (n > 0) console.log(`  League ${league.id} (${league.countryCode}): ${n} teams`)
  }

  // Extra discovered African leagues
  try {
    const discovered = JSON.parse(
      await fs.readFile(path.join(ROOT, 'data', 'africa-league-discovery.json'), 'utf-8'),
    ) as { id: number; ccode: string }[]
    const { AFRICA_CCODE_MAP } = await import('./lib/africa-ccodes.js')
    for (const l of discovered) {
      const cc = AFRICA_CCODE_MAP[l.ccode]?.countryCode
      if (!cc) continue
      if (onlyCountry && cc !== onlyCountry) continue
      if (africaOnly && !AFRICA_CODES.has(cc)) continue
      if (leagueMap.leagues.some((x) => x.id === l.id)) continue
      const n = await ingestLeagueTeams(apiKey, index, {
        id: l.id,
        countryCode: cc,
        source: l.id === 519 ? 'matches' : 'standings',
      })
      if (n > 0) console.log(`  Discovered ${l.id} (${cc}): ${n} teams`)
    }
  } catch {
    // optional
  }

  if (!wikiOnly && index.size) {
    console.log(`Fotmob team index: ${index.size} name entries`)
  }

  const files = (await fs.readdir(CLUBS_DIR)).filter((f) => f.endsWith('.json'))
  if (useWikipedia) {
    console.log(
      wikiOnly
        ? 'Wikipedia logo pass (may take several minutes)…'
        : 'Filling remaining logos from Wikipedia…',
    )
  }
  let fotmobUpdated = 0
  let wikiUpdated = 0
  let stillMissing = 0

  for (const file of files) {
    const code = file.replace('.json', '')
    if (onlyCountry && code !== onlyCountry) continue
    if (africaOnly && !AFRICA_CODES.has(code)) continue
    if (asiaOnly && !ASIA_CODES.has(code)) continue
    if (americasOnly && !AMERICAS_CODES.has(code)) continue
    if (oceaniaOnly && !OCEANIA_CODES.has(code)) continue

    const clubs = JSON.parse(
      await fs.readFile(path.join(CLUBS_DIR, file), 'utf-8'),
    ) as Club[]
    let fileFotmob = 0
    let fileWiki = 0

    for (const club of clubs) {
      if (club.logoUrl) continue

      if (!wikiOnly) {
        const teamId = lookupTeamId(index, club.countryCode, club.name)
        if (teamId) {
          club.logoUrl = logoUrlForTeam(teamId)
          club.updatedAt = TODAY
          fileFotmob++
          fotmobUpdated++
          continue
        }
      }

      if (useWikipedia) {
        const wiki = await fetchWikipediaLogo(club.name, club.country)
        if (wiki) {
          club.logoUrl = wiki
          club.updatedAt = TODAY
          fileWiki++
          wikiUpdated++
          continue
        }
      }

      stillMissing++
    }

    if (fileFotmob > 0 || fileWiki > 0) {
      await fs.writeFile(
        path.join(CLUBS_DIR, file),
        JSON.stringify(clubs, null, 2),
      )
      const parts = []
      if (fileFotmob) parts.push(`${fileFotmob} fotmob`)
      if (fileWiki) parts.push(`${fileWiki} wiki`)
      console.log(`${code}: +${parts.join(', ')}`)
    }
  }

  await buildManifest()
  console.log(
    `\nDone. Fotmob: ${fotmobUpdated}, Wikipedia: ${wikiUpdated}, still missing: ${stillMissing}.`,
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
