/**
 * Probes Fotmob league IDs for Asian domestic leagues via RapidAPI.
 * Run: npx tsx scripts/discover-asia-leagues.ts
 */
import 'dotenv/config'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { type ApiEnvelope, rapidFetch } from './lib/rapidapi-football-client.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const ASIA_CCODES = new Set([
  'JPN', 'KOR', 'CHN', 'TPE', 'HKG', 'IND', 'PAK', 'BAN', 'SRI', 'NEP', 'AFG',
  'THA', 'VNM', 'IDN', 'MAS', 'SIN', 'PHI', 'MYA', 'CAM', 'LAO', 'BRU', 'TLS',
  'KSA', 'UAE', 'QAT', 'KUW', 'BHR', 'OMA', 'IRQ', 'IRN', 'ISR', 'JOR', 'LIB',
  'SYR', 'YEM', 'KAZ', 'UZB', 'TKM', 'KGZ', 'TJK', 'GEO', 'ARM', 'AZE', 'MNG',
])

const NAME_HINT =
  /japan|korea|china|taiwan|hong kong|india|pakistan|bangladesh|sri lanka|nepal|afghanistan|thailand|vietnam|indonesia|malaysia|singapore|philippines|myanmar|cambodia|laos|brunei|saudi|emirates|qatar|kuwait|bahrain|oman|iraq|iran|israel|jordan|lebanon|syria|yemen|kazakhstan|uzbekistan|turkmenistan|kyrgyz|tajikistan|georgia|armenia|azerbaijan|mongolia|j\.?\s*league|k\s*league|chinese super|isl|i-league|botola|pro league|v\.?\s*league|liga 1|super league|premier league/i

const SEED_RANGES: [number, number][] = [
  [200, 280],
  [900, 1000],
  [1100, 1200],
  [2000, 2100],
  [9000, 9150],
]

async function teamCount(apiKey: string, id: number): Promise<number> {
  try {
    const st = await rapidFetch<ApiEnvelope<{ standing?: unknown[] }>>(
      apiKey,
      'football-get-standing-all',
      { leagueid: id },
    )
    const n = st.response?.standing?.length ?? 0
    if (n) return n
  } catch {
    // fall through
  }
  try {
    const m = await rapidFetch<
      ApiEnvelope<{ matches?: { home?: { id?: number }; away?: { id?: number } }[] }>
    >(apiKey, 'football-get-all-matches-by-league', { leagueid: id })
    const ids = new Set<number>()
    for (const match of m.response?.matches ?? []) {
      if (match.home?.id) ids.add(match.home.id)
      if (match.away?.id) ids.add(match.away.id)
    }
    return ids.size
  } catch {
    return 0
  }
}

async function main() {
  const apiKey =
    process.env.RAPIDAPI_KEY?.trim() ?? process.env.VITE_RAPIDAPI_KEY?.trim()
  if (!apiKey) {
    console.error('Missing RAPIDAPI_KEY')
    process.exit(1)
  }

  const ids = new Set<number>()
  for (const [from, to] of SEED_RANGES) {
    for (let i = from; i <= to; i++) ids.add(i)
  }

  const found: {
    id: number
    name: string
    ccode: string
    type: string
    teams: number
  }[] = []

  for (const id of [...ids].sort((a, b) => a - b)) {
    try {
      const d = await rapidFetch<
        ApiEnvelope<{ name: string; country?: string; ccode?: string; type?: string; leagues?: { name: string; country?: string; ccode?: string; type?: string } }>
      >(apiKey, 'football-get-league-detail', { leagueid: id })
      const L = d.response?.leagues ?? d.response
      if (!L?.name) continue
      const cc = L.ccode ?? ''
      const text = `${L.name} ${L.country ?? ''}`
      if (!ASIA_CCODES.has(cc) && !NAME_HINT.test(text)) continue
      const teams = await teamCount(apiKey, id)
      if (teams < 6) continue
      found.push({ id, name: L.name, ccode: cc, type: L.type ?? '', teams })
      console.log(`${id}\t${cc}\t${teams} teams\t${L.name} (${L.type})`)
    } catch {
      // skip
    }
  }

  const out = path.join(ROOT, 'data', 'asia-league-discovery.json')
  await fs.writeFile(out, JSON.stringify(found, null, 2))
  console.log(`\nWrote ${found.length} leagues to ${out}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
