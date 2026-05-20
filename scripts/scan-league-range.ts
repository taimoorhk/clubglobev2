/**
 * Scan Fotmob league IDs for African competitions.
 * Run: npx tsx scripts/scan-league-range.ts 9000 9200
 */
import 'dotenv/config'
import {
  type ApiEnvelope,
  rapidFetch,
} from './lib/rapidapi-football-client.js'

const AFRICA_CCODES = new Set([
  'EGY', 'RSA', 'MAR', 'NGA', 'TUN', 'ALG', 'GHA', 'KEN', 'CIV', 'SEN', 'CMR',
  'UGA', 'ZAM', 'ZIM', 'BOT', 'NAM', 'MOZ', 'ANG', 'ETH', 'MLI', 'BFA', 'GAB',
  'CGO', 'COD', 'RWA', 'BDI', 'MTN', 'LBY', 'SDN', 'GIN', 'BEN', 'TOG', 'NIG',
  'MWI', 'LES', 'SWZ', 'MAD', 'MRI', 'SEY', 'GAM', 'GNB', 'CPV', 'STP', 'EQG',
  'CHA', 'ERI', 'DJI', 'SOM', 'COM', 'TAN', 'LIB', 'SLE', 'SSD', 'CAF',
])

const NAME_HINT =
  /kenya|uganda|senegal|zambia|zimbabwe|tanzania|cameroon|ivory|angola|ethiopia|botswana|namibia|mozambique|mali|burkina|gabon|rwanda|libya|sudan|guinea|benin|togo|niger|malawi|lesotho|madagascar|mauritius|seychelles|gambia|cape verde|congo|egypt|south africa|morocco|nigeria|tunisia|algeria|ghana|premier soccer|botola|npfl/i

async function teamCount(apiKey: string, id: number): Promise<number> {
  try {
    const st = await rapidFetch<ApiEnvelope<{ standing?: { id: number }[] }>>(
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

  const from = Number(process.argv[2] ?? 9000)
  const to = Number(process.argv[3] ?? 9200)

  for (let id = from; id <= to; id++) {
    try {
      const d = await rapidFetch<
        ApiEnvelope<{ name: string; country?: string; ccode?: string; type?: string }>
      >(apiKey, 'football-get-league-detail', { leagueid: id })
      const L = d.response
      if (!L?.name) continue
      const cc = L.ccode ?? ''
      const text = `${L.name} ${L.country ?? ''}`
      if (!AFRICA_CCODES.has(cc) && !NAME_HINT.test(text)) continue
      const teams = await teamCount(apiKey, id)
      console.log(`${id}\t${cc}\t${teams}\t${L.name}`)
    } catch {
      // skip invalid ids
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
