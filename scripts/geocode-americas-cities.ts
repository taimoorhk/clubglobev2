/**
 * Writes curated city coordinates for Americas clubs.
 * Run: npx tsx scripts/geocode-americas-cities.ts
 */
import fs from 'fs/promises'
import { AMERICAS_CITY_COORDS } from './data/americas-clubs.js'
import { loadAllCities, citiesFilePath } from './lib/load-cities.js'
import type { CitiesMap } from './lib/club-data.js'

async function main() {
  const allCities = await loadAllCities()
  let total = 0

  for (const [countryCode, coords] of Object.entries(AMERICAS_CITY_COORDS)) {
    const outPath = citiesFilePath(countryCode)
    let existing: CitiesMap = {}
    try {
      existing = JSON.parse(await fs.readFile(outPath, 'utf-8')) as CitiesMap
    } catch {
      // new file
    }

    let added = 0
    for (const [city, geo] of Object.entries(coords)) {
      const existingCity =
        allCities[city]?.countryCode === countryCode ? allCities[city] : existing[city]
      if (
        existingCity &&
        existingCity.countryCode === countryCode &&
        existingCity.lat === geo.lat &&
        existingCity.lng === geo.lng
      ) {
        continue
      }
      existing[city] = {
        ...geo,
        countryCode,
      }
      added++
    }

    await fs.writeFile(outPath, JSON.stringify(existing, null, 2))
    total += added
    console.log(`${countryCode}: ${added} curated city coordinates`)
  }

  console.log(`\nDone. ${total} Americas city coordinates added/updated.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
