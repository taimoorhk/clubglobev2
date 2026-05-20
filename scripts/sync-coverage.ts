/**
 * Rebuilds tiersAvailable / tiersPlanned in coverage.json from club files.
 */
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import type { Club } from './lib/club-data.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CLUBS_DIR = path.join(ROOT, 'public', 'data', 'clubs')
const MAX_TIER = 7

async function main() {
  const coveragePath = path.join(ROOT, 'data', 'coverage.json')
  const coverage = JSON.parse(await fs.readFile(coveragePath, 'utf-8')) as {
    updatedAt: string
    countries: {
      countryCode: string
      country: string
      tiersAvailable: number[]
      tiersPlanned: number[]
    }[]
  }

  const byCountry = new Map<string, Club[]>()
  const files = (await fs.readdir(CLUBS_DIR)).filter((f) => f.endsWith('.json'))
  for (const file of files) {
    const code = file.replace('.json', '')
    const clubs = JSON.parse(
      await fs.readFile(path.join(CLUBS_DIR, file), 'utf-8'),
    ) as Club[]
    if (clubs.length) byCountry.set(code, clubs)
  }

  const known = new Set(coverage.countries.map((c) => c.countryCode))
  for (const [countryCode, clubs] of byCountry) {
    if (!known.has(countryCode)) {
      coverage.countries.push({
        countryCode,
        country: clubs[0].country,
        tiersAvailable: [],
        tiersPlanned: [...Array(MAX_TIER).keys()].map((i) => i + 1),
      })
      known.add(countryCode)
    }
  }

  for (const entry of coverage.countries) {
    const clubs = byCountry.get(entry.countryCode)
    if (!clubs?.length) continue
    const tiers = [...new Set(clubs.map((c) => c.divisionTier))].sort(
      (a, b) => a - b,
    )
    entry.tiersAvailable = tiers
    entry.tiersPlanned = [...Array(MAX_TIER).keys()]
      .map((i) => i + 1)
      .filter((t) => !tiers.includes(t))
  }

  coverage.updatedAt = new Date().toISOString().slice(0, 10)
  await fs.writeFile(coveragePath, JSON.stringify(coverage, null, 2))
  await fs.copyFile(
    coveragePath,
    path.join(ROOT, 'public', 'data', 'coverage.json'),
  )
  console.log(`Coverage synced for ${byCountry.size} countries.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
