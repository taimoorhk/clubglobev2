/**
 * Applies accurate UK club coordinates from gb-club-locations resolver.
 * Run: npx tsx scripts/apply-gb-locations.ts
 */
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { resolveGbClubLocation } from './lib/gb-club-locations.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const GB_PATH = path.join(ROOT, 'public', 'data', 'clubs', 'GB.json')

interface Club {
  id: string
  name: string
  city: string
  lat: number
  lng: number
  [key: string]: unknown
}

async function loadCities() {
  const base = JSON.parse(
    await fs.readFile(path.join(ROOT, 'data', 'cities.json'), 'utf-8'),
  )
  const uk = JSON.parse(
    await fs.readFile(path.join(ROOT, 'data', 'cities-uk.json'), 'utf-8'),
  )
  return { ...base, ...uk }
}

async function main() {
  const cities = await loadCities()
  const clubs = JSON.parse(await fs.readFile(GB_PATH, 'utf-8')) as Club[]
  let updated = 0

  for (const club of clubs) {
    const loc = resolveGbClubLocation(club.name, club.id, cities)
    if (
      club.lat !== loc.lat ||
      club.lng !== loc.lng ||
      club.city !== loc.city
    ) {
      club.lat = loc.lat
      club.lng = loc.lng
      club.city = loc.city
      updated++
    }
  }

  await fs.writeFile(GB_PATH, JSON.stringify(clubs, null, 2))
  console.log(`Updated ${updated} / ${clubs.length} England clubs with accurate locations.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
