/**
 * Probes Fotmob league IDs for African domestic leagues via RapidAPI.
 * Run: npx tsx scripts/discover-africa-leagues.ts
 */
import 'dotenv/config'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  type ApiEnvelope,
  rapidFetch,
} from './lib/rapidapi-football-client.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

interface LeagueDetail {
  name: string
  country?: string
  type?: string
}

const AFRICA_CCODES = new Set([
  'EGY',
  'RSA',
  'MAR',
  'NGA',
  'TUN',
  'ALG',
  'GHA',
  'KEN',
  'CIV',
  'SEN',
  'CMR',
  'UGA',
  'ZAM',
  'ZIM',
  'BOT',
  'NAM',
  'MOZ',
  'ANG',
  'ETH',
  'MLI',
  'BFA',
  'GAB',
  'CGO',
  'COD',
  'RWA',
  'BDI',
  'MTN',
  'LBY',
  'SDN',
  'GIN',
  'BEN',
  'TOG',
  'NIG',
  'MWI',
  'LES',
  'SWZ',
  'MAD',
  'MRI',
  'SEY',
  'GAM',
  'GNB',
  'CPV',
  'STP',
  'EQG',
  'CHA',
  'ERI',
  'DJI',
  'SOM',
  'COM',
])

const NAME_HINT =
  /egypt|south africa|morocco|nigeria|tunisia|algeria|ghana|kenya|senegal|cameroon|uganda|zambia|zimbabwe|botswana|namibia|mozambique|angola|ethiopia|mali|burkina|gabon|congo|rwanda|libya|sudan|guinea|benin|togo|niger|malawi|lesotho|eswatini|madagascar|mauritius|seychelles|gambia|cape verde|premier soccer|botola|ligue 1|premier league|national first|npfl|betway/i

/** Known / researched Fotmob IDs (verified where possible). */
const SEED_IDS = [
  536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550,
  551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565,
  566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580,
  581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595,
  596, 597, 598, 599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610,
  611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 622, 623, 624, 625,
  626, 627, 628, 629, 630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 640,
  641, 642, 643, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 654, 655,
  656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670,
  671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685,
  686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700,
  701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715,
  716, 717, 718, 719, 720, 721, 722, 723, 724, 725, 726, 727, 728, 729, 730,
  8800, 8801, 8802, 8803, 8804, 8805, 8806, 8807, 8808, 8809, 8810, 8811,
  8812, 8813, 8815, 8816, 8817, 8818, 8819, 8820, 8821, 8822, 8823, 8824,
  8825, 8826, 8827, 8828, 8829, 8830, 8831, 8832, 8833, 8834, 8835, 8836,
  8837, 8838, 8839, 8840, 8841, 8842, 8843, 8844, 8845, 8846, 8848, 8849,
  8850, 8851, 8852, 8853, 8854, 8855, 8856, 8857, 8858, 8859, 8860,
]

async function main() {
  const apiKey =
    process.env.RAPIDAPI_KEY?.trim() ?? process.env.VITE_RAPIDAPI_KEY?.trim()
  if (!apiKey) {
    console.error('Missing RAPIDAPI_KEY in .env')
    process.exit(1)
  }

  const from = Number(process.env.AFRICA_DISCOVER_FROM ?? 520)
  const to = Number(process.env.AFRICA_DISCOVER_TO ?? 660)
  const ids = new Set(SEED_IDS)
  for (let i = from; i <= to; i++) ids.add(i)

  const found: {
    id: number
    name: string
    ccode: string
    type: string
    teams: number
  }[] = []

  for (const id of [...ids].sort((a, b) => a - b)) {
    try {
      const detail = await rapidFetch<ApiEnvelope<{ leagues: LeagueDetail }>>(
        apiKey,
        'football-get-league-detail',
        { leagueid: id },
      )
      const league = detail.response?.leagues
      if (!league?.name || league.type === 'cup') continue

      const cc = league.country ?? ''
      const name = league.name
      if (!AFRICA_CCODES.has(cc) && !NAME_HINT.test(name)) continue

      let teams = 0
      try {
        const st = await rapidFetch<
          ApiEnvelope<{ standing: { name: string }[] }>
        >(apiKey, 'football-get-standing-all', { leagueid: id })
        teams = st.response?.standing?.length ?? 0
      } catch {
        // ignore
      }

      found.push({
        id,
        name,
        ccode: cc,
        type: league.type ?? 'league',
        teams,
      })
      console.log(
        `${id}\t${cc}\t${teams} teams\t${name} (${league.type})`,
      )
    } catch {
      // skip
    }
  }

  const outPath = path.join(ROOT, 'data', 'africa-league-discovery.json')
  await fs.writeFile(outPath, JSON.stringify(found, null, 2))
  console.log(`\nWrote ${found.length} leagues to ${outPath}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
