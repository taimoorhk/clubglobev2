/**
 * Geocodes unique place names per country via OpenStreetMap Nominatim.
 * Writes/merges results into data/cities-{countryCode}.json
 *
 * Run: npx tsx scripts/geocode-country-cities.ts
 *      npx tsx scripts/geocode-country-cities.ts --country DE
 */
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { loadAllCities, citiesFilePath } from './lib/load-cities.js'
import { NOMINATIM_COUNTRY } from './lib/region-fallbacks.js'
import { resolvePlaceName } from './lib/place-names.js'
import type { CitiesMap } from './lib/club-data.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CLUBS_DIR = path.join(ROOT, 'public', 'data', 'clubs')
const CACHE_DIR = path.join(ROOT, 'data', 'geocode-cache')
const DELAY_MS = 2500

interface Club {
  name: string
  countryCode: string
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

function queryFor(place: string, countryCode: string): string {
  const country = NOMINATIM_COUNTRY[countryCode]
  if (!country) return place
  if (countryCode === 'GB') return `${place}, England, United Kingdom`
  if (countryCode === 'GB-SCT') return `${place}, Scotland, United Kingdom`
  return `${place}, ${country}`
}

async function nominatimQuery(
  q: string,
): Promise<{ lat: number; lng: number } | null> {
  const url = new URL('https://nominatim.openstreetmap.org/search')
  url.searchParams.set('q', q)
  url.searchParams.set('format', 'json')
  url.searchParams.set('limit', '1')

  const res = await fetch(url.toString(), {
    headers: { 'User-Agent': 'ClubGlobe/1.0 (football map data build)' },
  })
  if (res.status === 429) {
    console.warn(`  Rate limited, waiting 15s…`)
    await sleep(15000)
    return nominatimQuery(q)
  }
  if (!res.ok) {
    console.warn(`  Nominatim HTTP ${res.status} for ${q}`)
    return null
  }

  const data = (await res.json()) as { lat: string; lon: string }[]
  if (!data.length) return null
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
}

async function nominatim(
  place: string,
  countryCode: string,
  teamName?: string,
): Promise<{ lat: number; lng: number } | null> {
  if (!NOMINATIM_COUNTRY[countryCode]) return null

  const cachePath = path.join(
    CACHE_DIR,
    countryCode,
    `${slug(place)}.json`,
  )
  try {
    return JSON.parse(await fs.readFile(cachePath, 'utf-8')) as {
      lat: number
      lng: number
    }
  } catch {
    // miss
  }

  const queries = [
    queryFor(place, countryCode),
    teamName && teamName !== place
      ? queryFor(`${teamName} football club`, countryCode)
      : null,
    teamName ? queryFor(teamName, countryCode) : null,
  ].filter(Boolean) as string[]

  for (const q of queries) {
    const result = await nominatimQuery(q)
    await sleep(DELAY_MS)
    if (result) {
      await fs.mkdir(path.dirname(cachePath), { recursive: true })
      await fs.writeFile(cachePath, JSON.stringify(result, null, 2))
      return result
    }
  }

  return null
}

export async function geocodeCountry(
  countryCode: string,
  cities: CitiesMap,
  force: boolean,
): Promise<number> {
  const filePath = path.join(CLUBS_DIR, `${countryCode}.json`)
  let clubs: Club[] = []
  try {
    clubs = JSON.parse(await fs.readFile(filePath, 'utf-8')) as Club[]
  } catch {
    return 0
  }
  if (!clubs.length) return 0

  const outPath = citiesFilePath(countryCode)
  let existing: CitiesMap = {}
  try {
    existing = JSON.parse(await fs.readFile(outPath, 'utf-8')) as CitiesMap
  } catch {
    // new file
  }

  const places = new Set<string>()
  const placeTeams = new Map<string, string>()
  for (const club of clubs) {
    const place = resolvePlaceName(club.name, countryCode)
    places.add(place)
    if (!placeTeams.has(place)) placeTeams.set(place, club.name)
  }

  let added = 0
  console.log(`\n${countryCode}: ${places.size} places`)

  for (const place of [...places].sort()) {
    if (!force && existing[place]) continue
    if (!force && cities[place]?.countryCode === countryCode) {
      existing[place] = cities[place]
      continue
    }

    const geo = await nominatim(place, countryCode, placeTeams.get(place))
    if (!geo) {
      console.warn(`  ✗ ${place}`)
      continue
    }

    existing[place] = {
      lat: geo.lat,
      lng: geo.lng,
      countryCode,
    }
    added++
    console.log(`  ✓ ${place} → ${geo.lat.toFixed(4)}, ${geo.lng.toFixed(4)}`)
  }

  await fs.mkdir(path.dirname(outPath), { recursive: true })
  await fs.writeFile(outPath, JSON.stringify(existing, null, 2))
  return added
}

async function main() {
  const args = process.argv.slice(2)
  const onlyCountry = args.includes('--country')
    ? args[args.indexOf('--country') + 1]
    : null
  const force = args.includes('--force')

  const cities = await loadAllCities()
  const files = (await fs.readdir(CLUBS_DIR)).filter((f) => f.endsWith('.json'))
  let total = 0

  for (const file of files) {
    const code = file.replace('.json', '')
    if (onlyCountry && code !== onlyCountry) continue
    if (code === 'GB') {
      console.log('\nGB: using cities-uk.json (skip Nominatim)')
      continue
    }
    total += await geocodeCountry(code, cities, force)
  }

  console.log(`\nDone. Added/updated ${total} city entries.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
