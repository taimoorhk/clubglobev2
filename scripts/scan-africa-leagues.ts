/**
 * One-shot scan for all African leagues in Fotmob ID range.
 * Run: npx tsx scripts/scan-africa-leagues.ts > data/africa-league-scan.txt
 */
import 'dotenv/config'
import { rapidFetch, type ApiEnvelope } from './lib/rapidapi-football-client.js'

const AFRICA_CCODES = new Set([
  'EGY', 'RSA', 'MAR', 'NGA', 'TUN', 'ALG', 'GHA', 'KEN', 'CIV', 'SEN', 'CMR',
  'UGA', 'ZAM', 'ZIM', 'BOT', 'NAM', 'MOZ', 'ANG', 'ETH', 'MLI', 'BFA', 'GAB',
  'CGO', 'COD', 'RWA', 'BDI', 'MTN', 'LBY', 'SDN', 'GIN', 'BEN', 'TOG', 'NIG',
  'MWI', 'LES', 'SWZ', 'MAD', 'MRI', 'SEY', 'GAM', 'GNB', 'CPV', 'STP', 'EQG',
  'CHA', 'ERI', 'DJI', 'SOM', 'COM', 'TAN',
])

async function teamCount(
  apiKey: string,
  id: number,
): Promise<number> {
  try {
    const st = await rapidFetch<ApiEnvelope<{ standing: unknown[] }>>(
      apiKey,
      'football-get-standing-all',
      { leagueid: id },
    )
    const n = st.response?.standing?.length ?? 0
    if (n > 0) return n
  } catch {
    // fall through
  }
  try {
    const m = await rapidFetch<
      ApiEnvelope<{ matches: { home?: { name?: string }; away?: { name?: string } }[] }>
    >(apiKey, 'football-get-all-matches-by-league', { leagueid: id })
    const names = new Set<string>()
    for (const match of m.response?.matches ?? []) {
      if (match.home?.name) names.add(match.home.name)
      if (match.away?.name) names.add(match.away.name)
    }
    return names.size
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

  const from = Number(process.env.SCAN_FROM ?? 1)
  const to = Number(process.env.SCAN_TO ?? 1200)

  for (let id = from; id <= to; id++) {
    try {
      const detail = await rapidFetch<
        ApiEnvelope<{ leagues: { name: string; country?: string; type?: string } }>
      >(apiKey, 'football-get-league-detail', { leagueid: id })
      const L = detail.response?.leagues
      if (!L?.name || L.type === 'cup') continue
      const cc = L.country ?? ''
      if (!AFRICA_CCODES.has(cc)) continue
      const teams = await teamCount(apiKey, id)
      console.log(`${id}\t${cc}\t${teams}\t${L.name}\t${L.type}`)
    } catch {
      // skip
    }
  }
}

main()
