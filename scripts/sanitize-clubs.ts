/**
 * Removes legacy TheSportsDB junk, invalid coordinates, and cross-country duplicates.
 * Run: npx tsx scripts/sanitize-clubs.ts
 */
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import type { Club } from './lib/club-data.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CLUBS_DIR = path.join(ROOT, 'public', 'data', 'clubs')

function isValidCoord(c: Club): boolean {
  return (
    Number.isFinite(c.lat) &&
    Number.isFinite(c.lng) &&
    Math.abs(c.lat) <= 90 &&
    Math.abs(c.lng) <= 180 &&
    !(c.lat === 0 && c.lng === 0)
  )
}

function clubScore(c: Club): number {
  let score = 0
  if (c.source === 'rapidapi') score += 100
  else if (c.source === 'seed') score += 50
  else if (c.source === 'americas-curated') score += 45
  else if (c.source === 'eastern-europe-curated') score += 45
  else if (c.source === 'iceland-curated') score += 45
  else if (c.source === 'north-atlantic-curated') score += 45
  if (isValidCoord(c)) score += 30
  if (c.logoUrl) score += 5
  score += c.divisionTier
  return score
}

function preferClub(a: Club, b: Club): Club {
  return clubScore(a) >= clubScore(b) ? a : b
}

/** League name must match the country file it is stored in. */
const LEAGUE_COUNTRY_PATTERNS: Record<string, RegExp> = {
  GB: /english|premier league|efl|national league|non-league|la liga 2/i,
  'GB-SCT': /scottish|scotland|premiership/i,
  ES: /spanish|la\s*liga|primera federación/i,
  DE: /german|bundesliga|liga\s*3|2\.\s*bundesliga/i,
  IT: /italian|serie\s/i,
  FR: /french|ligue\s/i,
  PT: /portugal|liga portugal|primeira/i,
  NL: /eredivisie|eerste divisie|netherlands/i,
  BE: /pro league|belgium|belgian/i,
  TR: /super lig|turkey|türkiye|1\.\s*lig/i,
  BR: /brasileirão|brazil|brazilian/i,
  AR: /argentina|liga profesional|primera nacional|primera b|primera c|primera d|regional federal|departmental/i,
  US: /major league soccer|usl|npsl|upsl|amateur|regional elite/i,
  CA: /canadian premier|league1|ligue1|provincial|prairie|local senior/i,
  MX: /liga mx|expansión|expansion|liga premier|liga tdp|tercera|state amateur/i,
  CL: /chile|chilena|primera división|primera division|primera b|segunda división|segunda division|tercera|regional amateur/i,
  CO: /colombia|categoría|categoria|primera a|primera b|primera c|departamental|regional amateur/i,
  PE: /peru|perú|liga 1|liga 2|copa perú|copa peru|regional amateur|local amateur/i,
  UY: /uruguay|primera división|primera division|segunda división|segunda division|amateur|divisional|interior/i,
  EC: /ecuador|serie a|serie b|segunda categoría|segunda categoria|provincial|regional amateur/i,
  VE: /venezuela|primera división|primera division|segunda división|segunda division|tercera|state amateur|municipal/i,
  PY: /paraguay|primera división|primera division|división intermedia|division intermedia|primera b|primera c|interior/i,
  BO: /bolivia|división profesional|division profesional|simón bolívar|simon bolivar|departamental|provincial/i,
  PL: /ekstraklasa|poland|polish|i liga/i,
  RU: /russia|russian|premier league/i,
  IS: /iceland|besta deild|1\. deild|2\. deild|3\. deild|4\. deild|regional|local/i,
  GL: /greenland|kalaallit|brugseni|championship|regional|municipal|local/i,
  IE: /ireland|league of ireland|national league|senior league|provincial|regional|local/i,
  UA: /ukrainian|ukraine|premier league|persha|druha|amateur|oblast/i,
  CZ: /czech|bohemian|moravian|divize|regional|district/i,
  RO: /romania|liga i|liga ii|liga iii|county|local/i,
  RS: /serbian|serbia|superliga|first league|zone|regional|municipal/i,
  HR: /croatia|hnl|first nl|second nl|third nl|county|local/i,
  HU: /hungary|hungarian|nemzeti|megye|local/i,
  BG: /bulgaria|professional league|third league|regional|oblast|district/i,
  SK: /slovakia|slovak|niké|nike|2\. liga|3\. liga|4\. liga|5\. liga|6\. liga|7\. liga/i,
  SI: /slovenia|slovenian|prvaliga|snl|intercommunal|municipal/i,
  BY: /belarus|belarusian|first league|second league|oblast|city/i,
  MD: /moldova|super liga|liga 1|liga 2|municipal/i,
  AL: /albania|kategoria|regional|district|local/i,
  BA: /bosnia|premier league|first league|cantonal|municipal/i,
  MK: /macedonian|north macedonia|third league|regional|municipal/i,
  ME: /montenegro|first league|second league|third league|municipal/i,
  XK: /kosovo|superleague|first league|second league|municipal/i,
  LT: /lithuania|a lyga|i lyga|ii lyga|iii lyga|regional/i,
  LV: /latvia|virslīga|virsliga|first league|second league|third league/i,
  EE: /estonia|meistriliiga|esiliiga|ii liiga|iii liiga|iv liiga/i,
  SE: /allsvenskan|superettan|sweden|swedish/i,
  AT: /austria|austrian|2\.\s*liga/i,
  CH: /switzerland|swiss|super league/i,
  DK: /denmark|danish|superliga/i,
  FI: /finland|finnish|veikkausliiga/i,
  GR: /greece|greek|super league/i,
  CN: /china|chinese|super league/i,
  AU: /australia|a-league/i,
  EG: /egyptian|egypt\s|second division|third division|fourth division|fifth division|regional league/i,
  ZA: /south africa|premier soccer|national first|safa|dstv|motsepe/i,
  NG: /nigeria|npfl|professional football|national league/i,
  MA: /morocco|botola/i,
  TN: /tunisia|ligue i|ligue 2/i,
  DZ: /algeria|ligue 1|ligue 2/i,
  GH: /ghana|division one|premier league/i,
  KE: /kenya|fkf|super league/i,
  SN: /senegal|ligue 1|ligue 2/i,
  CI: /ivory|ligue 1/i,
  CM: /cameroon|elite one|elite two/i,
  JP: /japan|j\.?\s*league|j1|j2|j3|jfl/i,
  KR: /korea|k\s*league|k3|k4/i,
  CN: /china|chinese super|cfa super|league one/i,
  IN: /india|indian super|i-league|isl/i,
  SA: /saudi|pro league|first division/i,
  AE: /emirates|uae|pro league/i,
  QA: /qatar|stars league/i,
  TH: /thailand|thai league/i,
  ID: /indonesia|liga 1|super league/i,
  MY: /malaysia|liga super/i,
  IR: /iran|persian gulf|pro league/i,
  IL: /israel|ligat|premier league/i,
}

/** Clubs that appear in the wrong country file (API cross-league pollution). */
const FOREIGN_CLUB_BLOCKLIST: Record<string, RegExp[]> = {
  ES: [
    /^(atalanta|juventus|milan|inter|roma|lazio|napoli|fiorentina|torino|bologna|empoli|cagliari|parma|genoa|udinese|hellas verona|monza|sassuolo|sampdoria|cremonese|frosinone|lecce|salernitana|reggiana|sudtirol|palermo|bari|pisa|modena|como|venezia|spezia|carrarese|mantova|cesena|padova|pescara|avellino)/i,
  ],
  BE: [
    /basel|grasshopper|young boys|lugano|luzern|zürich|zurich|st\.?\s*gallen|servette|sion|winterthur|thun|lausanne|xamax|vaduz/i,
    /fc zürich|fc zurich|stade lausanne/i,
  ],
  FR: [
    /bratislava|košice|kosice|žilina|zilina|slovan|lehota|bystrica|pohronie|malženice|malzenice|samorin|dubnica|puchov|liptovsky|zvolen|moravce|mikulas/i,
  ],
  IT: [
    /qarabag|qabala|neftchi|sumqayit|gabala|kapaz|shamakhi|imisli|araz|karvan|tur(an)? tovuz|sabah|zira fk/i,
  ],
  RU: [
    /aalesund|bodø|bodoe|brann|molde|rosenborg|viking|fredrikstad|lillestrøm|lillestrom|tromsø|tromso|kristiansund|sandefjord|sarpsborg|hamarkameratene|kfum/i,
  ],
  NL: [/jong\s+(az|ajax|psv|utrecht)/i],
}

function isForeignClub(club: Club, countryCode: string): boolean {
  const patterns = FOREIGN_CLUB_BLOCKLIST[countryCode]
  if (!patterns) return false
  const name = club.name.toLowerCase()
  return patterns.some((p) => p.test(name))
}

const UK_REGION_CODES = new Set(['GB', 'GB-SCT', 'GB-WLS'])

function leagueMatchesCountry(club: Club, countryCode: string): boolean {
  const league = club.leagueName ?? ''
  if (!league) return true
  if (
    club.source === 'africa-curated' ||
    club.source === 'asia-curated' ||
    club.source === 'americas-curated' ||
    club.source === 'eastern-europe-curated' ||
    club.source === 'iceland-curated' ||
    club.source === 'north-atlantic-curated'
  ) {
    return true
  }

  const own = LEAGUE_COUNTRY_PATTERNS[countryCode]
  if (!own) return true
  if (own.test(league)) return true

  for (const [code, pattern] of Object.entries(LEAGUE_COUNTRY_PATTERNS)) {
    if (code === countryCode) continue
    if (
      UK_REGION_CODES.has(countryCode) &&
      UK_REGION_CODES.has(code)
    ) {
      continue
    }
    if (pattern.test(league)) return false
  }

  return true
}

async function main() {
  const files = (await fs.readdir(CLUBS_DIR)).filter((f) => f.endsWith('.json'))
  const byCountry = new Map<string, Club[]>()

  for (const file of files) {
    const code = file.replace('.json', '')
    const clubs = JSON.parse(
      await fs.readFile(path.join(CLUBS_DIR, file), 'utf-8'),
    ) as Club[]
    byCountry.set(
      code,
      clubs.filter((c) => c.source !== 'thesportsdb'),
    )
  }

  const globalByName = new Map<string, Club>()
  for (const clubs of byCountry.values()) {
    for (const club of clubs) {
      const key = `${club.countryCode}:${club.name.toLowerCase().trim()}`
      const prev = globalByName.get(key)
      globalByName.set(key, prev ? preferClub(club, prev) : club)
    }
  }

  let removed = 0
  const cleaned = new Map<string, Club[]>()

  for (const [code, clubs] of byCountry) {
    const kept: Club[] = []
    const seenIds = new Set<string>()

    for (const club of clubs) {
      const canonical = globalByName.get(
        `${code}:${club.name.toLowerCase().trim()}`,
      )
      if (canonical && canonical.countryCode !== code) {
        removed++
        continue
      }
      if (!isValidCoord(club)) {
        removed++
        continue
      }
      if (!leagueMatchesCountry(club, code)) {
        removed++
        continue
      }
      if (isForeignClub(club, code)) {
        removed++
        continue
      }
      if (seenIds.has(club.id)) continue
      seenIds.add(club.id)
      kept.push(club)
    }

    kept.sort((a, b) => a.name.localeCompare(b.name))
    cleaned.set(code, kept)
    await fs.writeFile(
      path.join(CLUBS_DIR, `${code}.json`),
      JSON.stringify(kept, null, 2),
    )
  }

  const { buildManifest } = await import('./build-manifest.js')
  await buildManifest()

  const total = [...cleaned.values()].reduce((s, c) => s + c.length, 0)
  console.log(`Sanitized: removed ${removed} bad/duplicate clubs. ${total} clubs remain.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
