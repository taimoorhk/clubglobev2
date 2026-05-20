/**
 * Geocodes place names for all Asian country club files.
 * Run: npx tsx scripts/geocode-asia-cities.ts
 */
import { ASIA_CURATED } from './data/asia-clubs.js'
import { geocodeCountry } from './geocode-country-cities.js'
import { loadAllCities } from './lib/load-cities.js'

async function main() {
  const codes = new Set(Object.keys(ASIA_CURATED))
  for (const c of [
    'JP', 'KR', 'CN', 'SA', 'AE', 'QA', 'KZ', 'UZ', 'ID', 'TH', 'MY', 'IN',
  ]) {
    codes.add(c)
  }

  const cities = await loadAllCities()
  let total = 0
  for (const code of [...codes].sort()) {
    total += await geocodeCountry(code, cities, false)
  }
  console.log(`\nDone. ${total} city entries added/updated for Asia.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
