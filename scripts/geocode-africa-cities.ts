/**
 * Geocodes place names for all African country club files.
 * Run: npx tsx scripts/geocode-africa-cities.ts
 */
import { AFRICA_CURATED } from './data/africa-clubs.js'
import { geocodeCountry } from './geocode-country-cities.js'
import { loadAllCities } from './lib/load-cities.js'

async function main() {
  const codes = new Set(Object.keys(AFRICA_CURATED))
  for (const c of ['DZ', 'EG', 'GH', 'MA', 'NG', 'ZA', 'TN']) codes.add(c)

  const cities = await loadAllCities()
  let total = 0
  for (const code of [...codes].sort()) {
    const n = await geocodeCountry(code, cities, false)
    total += n
  }

  console.log(`\nDone. ${total} city entries added/updated for Africa.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
