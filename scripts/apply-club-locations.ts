/**
 * Applies accurate coordinates for all countries using club-locations resolver.
 * Run: npx tsx scripts/apply-club-locations.ts
 */
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
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

async function main() {
  const args = process.argv.slice(2)
  const onlyCountries = args.includes('--country')
    ? new Set(
        args[args.indexOf('--country') + 1]
          .split(',')
          .map((code) => code.trim().toUpperCase())
          .filter(Boolean),
      )
    : null
  const cities = await loadAllCities()
  const files = (await fs.readdir(CLUBS_DIR)).filter((f) => f.endsWith('.json'))
  let totalUpdated = 0

  for (const file of files) {
    const countryCode = file.replace('.json', '')
    if (onlyCountries && !onlyCountries.has(countryCode.toUpperCase())) continue

    const filePath = path.join(CLUBS_DIR, file)
    const clubs = JSON.parse(await fs.readFile(filePath, 'utf-8')) as Club[]
    if (!clubs.length) continue

    let updated = 0
    for (const club of clubs) {
      const loc = resolveClubLocation(
        club.countryCode,
        club.name,
        club.id,
        cities,
      )
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

    if (updated > 0) {
      await fs.writeFile(filePath, JSON.stringify(clubs, null, 2))
    }
    totalUpdated += updated
    const code = clubs[0]?.countryCode ?? file.replace('.json', '')
    console.log(`${code}: ${updated}/${clubs.length} updated`)
  }

  console.log(`\nTotal: ${totalUpdated} clubs repositioned.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
