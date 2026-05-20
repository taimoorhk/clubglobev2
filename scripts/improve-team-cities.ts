/**
 * Fixes city field when it equals team name; improves coordinates from city lookup.
 * Only updates clubs that still lack valid coordinates or have city === name.
 */
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { type CitiesMap } from './lib/club-data.js'
import { resolveClubLocation } from './lib/club-locations.js'
import { loadAllCities } from './lib/load-cities.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CLUBS_DIR = path.join(ROOT, 'public', 'data', 'clubs')

interface Club {
  id: string
  name: string
  city: string
  countryCode: string
  lat: number
  lng: number
  [key: string]: unknown
}

function isValidCoord(c: Club): boolean {
  return (
    Number.isFinite(c.lat) &&
    Number.isFinite(c.lng) &&
    !(c.lat === 0 && c.lng === 0)
  )
}

async function main() {
  const cities = await loadAllCities()
  const files = (await fs.readdir(CLUBS_DIR)).filter((f) => f.endsWith('.json'))
  let fixed = 0

  for (const file of files) {
    const filePath = path.join(CLUBS_DIR, file)
    const clubs = JSON.parse(await fs.readFile(filePath, 'utf-8')) as Club[]
    let changed = false

    for (const club of clubs) {
      const needsCity =
        !club.city ||
        club.city === club.name ||
        club.city.toLowerCase() === club.name.toLowerCase()

      const needsCoords = !isValidCoord(club)

      if (!needsCity && !needsCoords) continue

      const geo = resolveClubLocation(
        club.countryCode,
        club.name,
        club.id,
        cities,
      )

      if (!isValidCoord({ ...club, lat: geo.lat, lng: geo.lng })) continue

      club.lat = geo.lat
      club.lng = geo.lng
      club.city = geo.city
      fixed++
      changed = true
    }

    if (changed) {
      await fs.writeFile(filePath, JSON.stringify(clubs, null, 2))
    }
  }

  console.log(`Updated coordinates/cities for ${fixed} clubs.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
