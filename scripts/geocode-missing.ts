/**
 * Fills missing or zero coordinates from data/cities.json
 */
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CLUBS_DIR = path.join(ROOT, 'public', 'data', 'clubs')
const CITIES_PATH = path.join(ROOT, 'data', 'cities.json')
const CITIES_UK_PATH = path.join(ROOT, 'data', 'cities-uk.json')

interface Club {
  name: string
  city: string
  countryCode: string
  lat: number
  lng: number
}

type CitiesMap = Record<string, { lat: number; lng: number; countryCode: string }>

function findCity(
  club: Club,
  cities: CitiesMap,
): { lat: number; lng: number; city: string } | null {
  const direct = cities[club.city]
  if (direct && direct.countryCode === club.countryCode) {
    return { lat: direct.lat, lng: direct.lng, city: club.city }
  }

  const lowerCity = club.city.toLowerCase()
  const lowerName = club.name.toLowerCase()

  for (const [name, entry] of Object.entries(cities)) {
    if (entry.countryCode !== club.countryCode) continue
    const n = name.toLowerCase()
    if (
      lowerCity.includes(n) ||
      n.includes(lowerCity) ||
      lowerName.includes(n)
    ) {
      return { lat: entry.lat, lng: entry.lng, city: name }
    }
  }

  return null
}

async function main() {
  const base = JSON.parse(await fs.readFile(CITIES_PATH, 'utf-8')) as CitiesMap
  let uk: CitiesMap = {}
  try {
    uk = JSON.parse(await fs.readFile(CITIES_UK_PATH, 'utf-8')) as CitiesMap
  } catch {
    // optional
  }
  const cities = { ...base, ...uk }
  const files = (await fs.readdir(CLUBS_DIR)).filter((f) => f.endsWith('.json'))
  let updated = 0

  for (const file of files) {
    const filePath = path.join(CLUBS_DIR, file)
    const clubs = JSON.parse(await fs.readFile(filePath, 'utf-8')) as Club[]
    let changed = false

    for (const club of clubs) {
      if (club.lat !== 0 && club.lng !== 0) continue
      const hit = findCity(club, cities)
      if (hit) {
        club.lat = hit.lat
        club.lng = hit.lng
        club.city = hit.city
        updated++
        changed = true
      }
    }

    if (changed) {
      await fs.writeFile(filePath, JSON.stringify(clubs, null, 2))
    }
  }

  console.log(`Geocoded ${updated} clubs with missing coordinates.`)
}

main()
