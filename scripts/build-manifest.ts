import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CLUBS_DIR = path.join(ROOT, 'public', 'data', 'clubs')

export async function buildManifest() {
  const files = (await fs.readdir(CLUBS_DIR)).filter((f) => f.endsWith('.json'))
  const countries = []

  for (const file of files) {
    const code = file.replace('.json', '')
    const clubs = JSON.parse(
      await fs.readFile(path.join(CLUBS_DIR, file), 'utf-8'),
    ) as { country: string; divisionTier: number }[]
    const tiers = [...new Set(clubs.map((c) => c.divisionTier))].sort()
    countries.push({
      countryCode: code,
      country: clubs[0]?.country ?? code,
      clubCount: clubs.length,
      tiersAvailable: tiers,
      file: `clubs/${file}`,
    })
  }

  countries.sort((a, b) => a.country.localeCompare(b.country))
  const manifest = {
    generatedAt: new Date().toISOString(),
    totalClubs: countries.reduce((s, c) => s + c.clubCount, 0),
    countries,
  }

  await fs.writeFile(
    path.join(ROOT, 'public', 'data', 'manifest.json'),
    JSON.stringify(manifest, null, 2),
  )
  console.log(`Manifest: ${manifest.totalClubs} clubs, ${countries.length} countries`)
}

buildManifest().catch((e) => {
  console.error(e)
  process.exit(1)
})
