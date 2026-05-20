/**
 * Cross-verifies current GB tier 4–7 clubs against OpenStreetMap/Nominatim
 * and generates scripts/lib/gb-extra-stadium-locations.ts.
 *
 * Run: npx tsx scripts/geocode-gb-tier-stadiums.ts
 */
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import type { Club } from './lib/club-data.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const GB_CLUBS_PATH = path.join(ROOT, 'public', 'data', 'clubs', 'GB.json')
const CACHE_PATH = path.join(ROOT, 'data', 'geocode-cache', 'gb-stadiums.json')
const OUT_PATH = path.join(ROOT, 'scripts', 'lib', 'gb-extra-stadium-locations.ts')
const DELAY_MS = 1100

type NominatimResult = {
  lat: string
  lon: string
  display_name: string
  class?: string
  type?: string
  importance?: number
  address?: {
    city?: string
    town?: string
    village?: string
    suburb?: string
    county?: string
  }
}

type StadiumHit = {
  city: string
  lat: number
  lng: number
  displayName: string
  query: string
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function canonicalQueryName(name: string): string {
  const overrides: Record<string, string> = {
    Canvey: 'Canvey Island FC',
    Chelmsford: 'Chelmsford City FC',
    Curzon: 'Curzon Ashton FC',
    Dover: 'Dover Athletic FC',
    Harborough: 'Harborough Town FC',
    Horsham: 'Horsham FC',
    Macclesfield: 'Macclesfield FC',
    Merthyr: 'Merthyr Town FC',
    Redditch: 'Redditch United FC',
    Spennymoor: 'Spennymoor Town FC',
    Tonbridge: 'Tonbridge Angels FC',
    Warrington: 'Warrington Town FC',
    Worthing: 'Worthing FC',
  }
  return overrides[name] ?? name
}

function cityFrom(result: NominatimResult): string {
  return (
    result.address?.city ??
    result.address?.town ??
    result.address?.village ??
    result.address?.suburb ??
    result.address?.county ??
    result.display_name.split(',')[1]?.trim() ??
    result.display_name.split(',')[0]?.trim() ??
    'England'
  )
}

function scoreResult(result: NominatimResult): number {
  const text = `${result.display_name} ${result.class ?? ''} ${result.type ?? ''}`.toLowerCase()
  let score = result.importance ?? 0
  if (text.includes('football')) score += 5
  if (text.includes('stadium')) score += 5
  if (text.includes('fc')) score += 4
  if (text.includes('club')) score += 4
  if (text.includes('sports')) score += 2
  if (result.class === 'leisure') score += 3
  if (['stadium', 'pitch', 'sports_centre'].includes(result.type ?? '')) score += 3
  return score
}

async function nominatim(query: string): Promise<NominatimResult[]> {
  const url = new URL('https://nominatim.openstreetmap.org/search')
  url.searchParams.set('q', query)
  url.searchParams.set('format', 'json')
  url.searchParams.set('limit', '5')
  url.searchParams.set('addressdetails', '1')
  url.searchParams.set('countrycodes', 'gb')

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'ClubGlobe/1.0 (GB tier 4-7 stadium coordinate verification)',
    },
  })
  if (!res.ok) return []
  return (await res.json()) as NominatimResult[]
}

async function resolveClub(name: string): Promise<StadiumHit | null> {
  const qName = canonicalQueryName(name)
  const queries = [
    `${qName} football club stadium`,
    `${qName} football ground`,
    `${qName} FC stadium`,
    `${qName} football club`,
  ]

  for (const query of queries) {
    const results = await nominatim(query)
    await sleep(DELAY_MS)
    if (!results.length) continue

    const best = [...results].sort((a, b) => scoreResult(b) - scoreResult(a))[0]
    if (!best) continue
    return {
      city: cityFrom(best),
      lat: Number(best.lat),
      lng: Number(best.lon),
      displayName: best.display_name,
      query,
    }
  }

  return null
}

function tsString(value: string): string {
  return JSON.stringify(value)
}

async function main() {
  const clubs = JSON.parse(await fs.readFile(GB_CLUBS_PATH, 'utf-8')) as Club[]
  const target = clubs.filter(
    (club) => club.divisionTier >= 4 && club.divisionTier <= 7,
  )

  let cache: Record<string, StadiumHit | null> = {}
  try {
    cache = JSON.parse(await fs.readFile(CACHE_PATH, 'utf-8')) as Record<
      string,
      StadiumHit | null
    >
  } catch {
    // new cache
  }

  for (const club of target) {
    if (club.name in cache) continue
    process.stdout.write(`${club.name}… `)
    const hit = await resolveClub(club.name)
    cache[club.name] = hit
    await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true })
    await fs.writeFile(CACHE_PATH, JSON.stringify(cache, null, 2))
    console.log(hit ? `${hit.lat.toFixed(5)}, ${hit.lng.toFixed(5)}` : 'not found')
  }

  const entries = Object.entries(cache)
    .filter((entry): entry is [string, StadiumHit] => Boolean(entry[1]))
    .sort(([a], [b]) => a.localeCompare(b))

  const lines = [
    "import type { ClubLocation } from './gb-club-locations.js'",
    '',
    '/** OpenStreetMap/Nominatim verified grounds for current GB tier 4–7 clubs. */',
    'export const GB_EXTRA_STADIUM_LOCATIONS: Record<string, ClubLocation> = {',
    ...entries.map(([name, hit]) => {
      const comment = ` // ${hit.displayName}`
      return `  ${tsString(name)}: { city: ${tsString(hit.city)}, lat: ${hit.lat.toFixed(6)}, lng: ${hit.lng.toFixed(6)} },${comment}`
    }),
    '}',
    '',
  ]

  await fs.writeFile(OUT_PATH, lines.join('\n'))
  console.log(`\nVerified ${entries.length}/${target.length} clubs.`)
  console.log(`Wrote ${path.relative(ROOT, OUT_PATH)}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
