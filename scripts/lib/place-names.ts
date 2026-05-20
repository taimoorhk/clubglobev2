/**
 * Derives a geographic place name from a football club name.
 */
import { AMERICAS_PLACE_OVERRIDES } from '../data/americas-clubs.js'
import { EASTERN_EUROPE_PLACE_OVERRIDES } from '../data/eastern-europe-clubs.js'
import { ICELAND_PLACE_OVERRIDES } from '../data/iceland-clubs.js'
import { NORTH_ATLANTIC_PLACE_OVERRIDES } from '../data/north-atlantic-clubs.js'

const GENERIC_SUFFIX =
  /\s+(FC|CF|AFC|SC|AC|AS|SV|SK|FK|BK|IF|FF|United|City|Town|Rovers|Athletic|Albion|Wanderers|Hotspur|County|Stanley|Wimbledon|Villa|Palace|Forest|Wednesday|Calcio|1913|1909|1907|1903|1899|1893)$/i

/** Per-country club name → city overrides */
const CLUB_PLACE_OVERRIDES: Record<string, Record<string, string>> = {
  GB: {
    'West Bromwich Albion': 'West Bromwich',
    'Brighton & Hove Albion': 'Brighton',
    'Queens Park Rangers': 'London',
    'Crystal Palace': 'London',
    'Aston Villa': 'Birmingham',
    'Tottenham Hotspur': 'London',
    'West Ham United': 'London',
    'Newcastle United': 'Newcastle',
    'Manchester United': 'Manchester',
    'Manchester City': 'Manchester',
    'Nottingham Forest': 'Nottingham',
    'Wolverhampton Wanderers': 'Wolverhampton',
    'Cardiff City': 'Cardiff',
    'MK Dons': 'Milton Keynes',
    Curzon: 'Ashton-under-Lyne',
    'Curzon Ashton': 'Ashton-under-Lyne',
  },
  DE: {
    'Bayern München': 'Munich',
    'Bayern Munich': 'Munich',
    'Borussia Dortmund': 'Dortmund',
    'Borussia Mönchengladbach': 'Mönchengladbach',
    'Bayer Leverkusen': 'Leverkusen',
    'Eintracht Frankfurt': 'Frankfurt',
    'Eintracht Braunschweig': 'Braunschweig',
    'RB Leipzig': 'Leipzig',
    '1. FC Köln': 'Cologne',
    '1. FC Nürnberg': 'Nuremberg',
    '1. FC Kaiserslautern': 'Kaiserslautern',
    '1. FC Magdeburg': 'Magdeburg',
    '1. FC Saarbrücken': 'Saarbrücken',
    '1860 München': 'Munich',
    'Hertha BSC': 'Berlin',
    'Union Berlin': 'Berlin',
    'Hamburger SV': 'Hamburg',
    'Hannover 96': 'Hannover',
    'SC Paderborn': 'Paderborn',
    'SC Freiburg': 'Freiburg',
    'SC Verl': 'Verl',
    'FSV Mainz': 'Mainz',
    'FSV Zwickau': 'Zwickau',
    'VfB Stuttgart': 'Stuttgart',
    'VfL Wolfsburg': 'Wolfsburg',
    'VfL Bochum': 'Bochum',
    'VfL Osnabrück': 'Osnabrück',
    'TSV Hartberg': 'Hartberg',
    'SpVgg Greuther Fürth': 'Fürth',
    'SpVgg Unterhaching': 'Unterhaching',
  },
  ES: {
    'Atlético Madrid': 'Madrid',
    'Atletico Madrid': 'Madrid',
    'Real Madrid': 'Madrid',
    'Real Betis': 'Seville',
    'Real Sociedad': 'San Sebastián',
    'Real Oviedo': 'Oviedo',
    'Real Zaragoza': 'Zaragoza',
    'Real Valladolid': 'Valladolid',
    'Athletic Bilbao': 'Bilbao',
    'Deportivo Alavés': 'Vitoria-Gasteiz',
    'Celta Vigo': 'Vigo',
    'Las Palmas': 'Las Palmas',
    'AD Ceuta FC': 'Ceuta',
    'Cultural Leonesa': 'León',
    Leganes: 'Leganés',
    Padova: 'Padua',
  },
  IT: {
    'Inter Milan': 'Milan',
    'AC Milan': 'Milan',
    'AS Roma': 'Rome',
    Roma: 'Rome',
    'SS Lazio': 'Rome',
    Lazio: 'Rome',
    'Hellas Verona': 'Verona',
    'US Lecce': 'Lecce',
    'US Cremonese': 'Cremona',
    'US Salernitana': 'Salerno',
    Carrarese: 'Carrara',
    Mantova: 'Mantua',
    'Virtus Entella': 'Chiavari',
    'AC Monza': 'Monza',
    'AC Pisa': 'Pisa',
    'AC Reggiana': 'Reggio Emilia',
    'UC Sampdoria': 'Genoa',
    Juventus: 'Turin',
    Napoli: 'Naples',
  },
  FR: {
    'Paris Saint-Germain': 'Paris',
    'Paris FC': 'Paris',
    'Olympique Marseille': 'Marseille',
    'Olympique Lyon': 'Lyon',
    'AS Monaco': 'Monaco',
    'AS Saint-Étienne': 'Saint-Étienne',
    'RC Lens': 'Lens',
    'RC Strasbourg': 'Strasbourg',
    'Stade Rennais': 'Rennes',
    'Stade de Reims': 'Reims',
    'Stade Brestois': 'Brest',
    'Stade Lavallois': 'Laval',
    'FC Nantes': 'Nantes',
    'FC Lorient': 'Lorient',
    'FC Metz': 'Metz',
    'FC Lorient': 'Lorient',
    'OGC Nice': 'Nice',
    'ESTAC Troyes': 'Troyes',
  },
  PT: {
    'Sporting CP': 'Lisbon',
    Benfica: 'Lisbon',
    'FC Porto': 'Porto',
    'SC Braga': 'Braga',
    'Vitória Guimarães': 'Guimarães',
    'Vitória Setúbal': 'Setúbal',
  },
  NL: {
    'Ajax Amsterdam': 'Amsterdam',
    Ajax: 'Amsterdam',
    'PSV Eindhoven': 'Eindhoven',
    'Feyenoord Rotterdam': 'Rotterdam',
    'FC Twente': 'Enschede',
    'FC Utrecht': 'Utrecht',
    'FC Groningen': 'Groningen',
    'FC Volendam': 'Volendam',
    'ADO Den Haag': 'The Hague',
    'Go Ahead Eagles': 'Deventer',
    'NAC Breda': 'Breda',
    'Willem II': 'Tilburg',
    'Sparta Rotterdam': 'Rotterdam',
    'Heracles Almelo': 'Almelo',
    'Fortuna Sittard': 'Sittard',
    'PEC Zwolle': 'Zwolle',
    'RKC Waalwijk': 'Waalwijk',
    'SC Heerenveen': 'Heerenveen',
    'SC Cambuur': 'Leeuwarden',
  },
  BE: {
    'Club Brugge': 'Bruges',
    'Royal Antwerp': 'Antwerp',
    'Standard Liège': 'Liège',
    'Union Saint-Gilloise': 'Brussels',
    'RSC Anderlecht': 'Brussels',
    'KRC Genk': 'Genk',
    'KAA Gent': 'Ghent',
    'KV Mechelen': 'Mechelen',
    'KV Kortrijk': 'Kortrijk',
    'OH Leuven': 'Leuven',
    'Cercle Brugge': 'Bruges',
    'RFC Seraing': 'Seraing',
    'RFC Liège': 'Liège',
  },
  TR: {
    'Galatasaray SK': 'Istanbul',
    'Fenerbahçe SK': 'Istanbul',
    'Beşiktaş JK': 'Istanbul',
    'İstanbul Başakşehir': 'Istanbul',
    'Trabzonspor': 'Trabzon',
    'Bursaspor': 'Bursa',
    'Antalyaspor': 'Antalya',
    'Adana Demirspor': 'Adana',
    'Göztepe SK': 'Izmir',
    'Kasımpaşa SK': 'Istanbul',
    'Konyaspor': 'Konya',
    'Sivasspor': 'Sivas',
    'Alanyaspor': 'Alanya',
    'Gaziantep FK': 'Gaziantep',
    'Hatayspor': 'Antakya',
    'Kayserispor': 'Kayseri',
    'Rizespor': 'Rize',
  },
  BR: {
    Flamengo: 'Rio de Janeiro',
    Fluminense: 'Rio de Janeiro',
    Botafogo: 'Rio de Janeiro',
    Vasco: 'Rio de Janeiro',
    'Vasco da Gama': 'Rio de Janeiro',
    Corinthians: 'São Paulo',
    Palmeiras: 'São Paulo',
    'São Paulo': 'São Paulo',
    Santos: 'Santos',
    Grêmio: 'Porto Alegre',
    Internacional: 'Porto Alegre',
    'Atlético Mineiro': 'Belo Horizonte',
    Cruzeiro: 'Belo Horizonte',
    Athletico: 'Curitiba',
    'Athletico Paranaense': 'Curitiba',
    Fortaleza: 'Fortaleza',
    Ceará: 'Fortaleza',
    Bahia: 'Salvador',
    Vitória: 'Salvador',
  },
  EG: {
    'Al Ahly': 'Cairo',
    Zamalek: 'Cairo',
    'Al Masry': 'Port Said',
    'Ismaily SC': 'Ismailia',
    'El Gouna': 'Hurghada',
    'Pyramids FC': 'Cairo',
    'Pharco FC': 'Alexandria',
    'Smouha SC': 'Alexandria',
    'ENPPI': 'Cairo',
    'Ceramica Cleopatra': 'Cairo',
  },
  ZA: {
    'Mamelodi Sundowns': 'Pretoria',
    'Orlando Pirates': 'Johannesburg',
    'Kaizer Chiefs': 'Johannesburg',
    'SuperSport United': 'Pretoria',
    'Cape Town City': 'Cape Town',
    'Cape Town Spurs': 'Cape Town',
    'Stellenbosch FC': 'Stellenbosch',
    'AmaZulu': 'Durban',
    'Golden Arrows': 'Durban',
    'Chippa United': 'Gqeberha',
    'Sekhukhune United': 'Polokwane',
    'Richards Bay': 'Richards Bay',
    'Black Leopards': 'Thohoyandou',
  },
  NG: {
    Enyimba: 'Aba',
    'Rangers International': 'Enugu',
    'Kano Pillars': 'Kano',
    'Plateau United': 'Jos',
    'Shooting Stars': 'Ibadan',
    'Bendel Insurance': 'Benin City',
    'Rivers United': 'Port Harcourt',
    'Wikki Tourists': 'Bauchi',
    'Nasarawa United': 'Lafia',
    'Katsina United': 'Katsina',
  },
  MA: {
    'Wydad AC': 'Casablanca',
    'Raja CA': 'Casablanca',
    'RS Berkane': 'Berkane',
    'FUS Rabat': 'Rabat',
    'FAR Rabat': 'Rabat',
    'AS FAR': 'Rabat',
    'Ittihad Tanger': 'Tangier',
    'Hassania Agadir': 'Agadir',
    'Olympic Safi': 'Safi',
    'Mouloudia Oujda': 'Oujda',
  },
  GH: {
    'Asante Kotoko': 'Kumasi',
    'Hearts of Oak': 'Accra',
    'Medeama SC': 'Tema',
    Medeama: 'Tema',
    'Berekum Chelsea': 'Berekum',
    'Bibiani Gold Stars': 'Bibiani',
    'Accra Lions': 'Accra',
    'Legon Cities': 'Accra',
  },
  KE: {
    'Gor Mahia': 'Nairobi',
    'AFC Leopards': 'Nairobi',
    Bandari: 'Mombasa',
    Tusker: 'Nairobi',
    'Kakamega Homeboyz': 'Kakamega',
    'Ulinzi Stars': 'Nakuru',
    'Mathare United': 'Nairobi',
    Shabana: 'Kericho',
    'Posta Rangers': 'Nairobi',
    'Kenya Commercial Bank': 'Nairobi',
    KCB: 'Nairobi',
  },
  UG: {
    KCCA: 'Kampala',
    'Vipers SC': 'Entebbe',
    'Express FC': 'Kampala',
    'Onduparaka': 'Arua',
    'Bul FC': 'Jinja',
  },
  TZ: {
    'Young Africans': 'Dar es Salaam',
    'Simba SC': 'Dar es Salaam',
    'Azam FC': 'Dar es Salaam',
    'Coastal Union': 'Tanga',
    'Kagera Sugar': 'Bukoba',
    'Mtibwa Sugar': 'Tanga',
  },
  SN: {
    'Génération Foot': 'Thiès',
    Teungueth: 'Rufisque',
    Jaraaf: 'Dakar',
    Pikine: 'Pikine',
    'Stade de Mbour': 'Mbour',
    Ouakam: 'Dakar',
  },
  CI: {
    'ASEC Mimosas': 'Abidjan',
    'Africa Sports': 'Abidjan',
    'Stella Abidjan': 'Abidjan',
    'Racing d\'Abidjan': 'Abidjan',
    'Bouaké FC': 'Bouaké',
    Korhogo: 'Korhogo',
  },
  CM: {
    'Coton Sport': 'Garoua',
    'Canon Yaoundé': 'Yaoundé',
    'Tonnerre Kalara': 'Douala',
    'Union Douala': 'Douala',
    'PWD Bamenda': 'Bamenda',
    'UMS de Loum': 'Loum',
  },
  DZ: {
    'CR Belouizdad': 'Algiers',
    'USM Alger': 'Algiers',
    'MC Alger': 'Algiers',
    'JS Kabylie': 'Tizi Ouzou',
    'MC Oran': 'Oran',
    'ES Sétif': 'Sétif',
    'Paradou AC': 'Algiers',
    'MO Béjaïa': 'Béjaïa',
  },
  TN: {
    'Espérance de Tunis': 'Tunis',
    'Club Africain': 'Tunis',
    'Étoile du Sahel': 'Sousse',
    'CS Sfaxien': 'Sfax',
    'US Monastir': 'Monastir',
    'Stade Tunisien': 'Tunis',
  },
  ZM: {
    'ZESCO United': 'Ndola',
    'Power Dynamos': 'Kitwe',
    Nkana: 'Kitwe',
    'Green Buffaloes': 'Lusaka',
    'Red Arrows': 'Lusaka',
    'Forest Rangers': 'Ndola',
  },
  ZW: {
    Dynamos: 'Harare',
    Highlanders: 'Bulawayo',
    'CAPS United': 'Harare',
    'FC Platinum': 'Zvishavane',
    'Chicken Inn': 'Bulawayo',
    'Bulawayo Chiefs': 'Bulawayo',
  },
  AO: {
    'Petro de Luanda': 'Luanda',
    'Primeiro de Agosto': 'Luanda',
    'G.D. Sagrada': 'Luanda',
    'Interclube': 'Luanda',
  },
  CD: {
    'TP Mazembe': 'Lubumbashi',
    'AS Vita Club': 'Kinshasa',
    'DC Motema Pembe': 'Kinshasa',
    'AS Dragons': 'Kinshasa',
  },
  JP: {
    'Urawa Red Diamonds': 'Saitama',
    'Kashima Antlers': 'Kashima',
    'Gamba Osaka': 'Osaka',
    'Cerezo Osaka': 'Osaka',
    'Kawasaki Frontale': 'Kawasaki',
    'Sanfrecce Hiroshima': 'Hiroshima',
    'Nagoya Grampus': 'Nagoya',
    'Kyoto Sanga': 'Kyoto',
    'Albirex Niigata': 'Niigata',
    'Avispa Fukuoka': 'Fukuoka',
    'Shonan Bellmare': 'Hiratsuka',
    'Kashiwa Reysol': 'Kashiwa',
    'Shimizu S-Pulse': 'Shizuoka',
    'Vissel Kobe': 'Kobe',
    'Yokohama F. Marinos': 'Yokohama',
    'FC Tokyo': 'Tokyo',
    'Tokyo Verdy': 'Tokyo',
    'Machida Zelvia': 'Machida',
  },
  KR: {
    'FC Seoul': 'Seoul',
    'Jeonbuk Hyundai Motors': 'Jeonju',
    'Ulsan HD': 'Ulsan',
    'Pohang Steelers': 'Pohang',
    'Suwon Samsung Bluewings': 'Suwon',
    'Incheon United': 'Incheon',
    'Daegu FC': 'Daegu',
    'Gangwon FC': 'Gangneung',
    'Jeju United': 'Jeju',
    'Gwangju FC': 'Gwangju',
  },
  CN: {
    'Beijing Guoan': 'Beijing',
    'Shanghai Shenhua': 'Shanghai',
    'Shanghai Port': 'Shanghai',
    'Guangzhou FC': 'Guangzhou',
    'Shandong Taishan': 'Jinan',
    'Tianjin Jinmen Tiger': 'Tianjin',
    'Wuhan Three Towns': 'Wuhan',
    'Chengdu Rongcheng': 'Chengdu',
    'Henan FC': 'Zhengzhou',
    'Changchun Yatai': 'Changchun',
    'Zhejiang FC': 'Hangzhou',
  },
  IN: {
    'Mumbai City': 'Mumbai',
    'Kolkata': 'Kolkata',
    'Bengaluru FC': 'Bengaluru',
    'Chennaiyin FC': 'Chennai',
    'Kerala Blasters': 'Kochi',
    'Hyderabad FC': 'Hyderabad',
    'East Bengal': 'Kolkata',
    'Mohun Bagan': 'Kolkata',
  },
  SA: {
    'Al Hilal': 'Riyadh',
    'Al Nassr': 'Riyadh',
    'Al Ittihad': 'Jeddah',
    'Al Ahli': 'Jeddah',
    'Al Shabab': 'Riyadh',
    'Al Ettifaq': 'Dammam',
  },
  AE: {
    'Al Ain': 'Al Ain',
    'Al Wahda': 'Abu Dhabi',
    'Shabab Al Ahli': 'Dubai',
    'Al Nasr': 'Dubai',
    'Al Wasl': 'Dubai',
  },
  TH: {
    'Buriram United': 'Buriram',
    'Muangthong United': 'Nonthaburi',
    'Bangkok United': 'Pathum Thani',
    'Chonburi FC': 'Chonburi',
  },
  ID: {
    'Persija Jakarta': 'Jakarta',
    'Persib Bandung': 'Bandung',
    'Arema FC': 'Malang',
    'Bali United': 'Gianyar',
  },
  'GB-SCT': {
    'Heart of Midlothian': 'Edinburgh',
    'Hibernian': 'Edinburgh',
    'Dundee United': 'Dundee',
    'Dundee FC': 'Dundee',
    'Greenock Morton': 'Greenock',
    'Queen of the South': 'Dumfries',
    'Raith Rovers': 'Kirkcaldy',
    'St Johnstone': 'Perth',
    'St Mirren': 'Paisley',
    'Partick Thistle': 'Glasgow',
    'Celtic': 'Glasgow',
    'Rangers': 'Glasgow',
  },
}

function stripGenericSuffixes(name: string): string {
  let cleaned = name.replace(/\s+&\s+.*$/, '').trim()
  for (let i = 0; i < 4; i++) {
    const next = cleaned.replace(GENERIC_SUFFIX, '').trim()
    if (next === cleaned) break
    cleaned = next
  }
  return cleaned || name
}

function stripGermanPrefix(name: string): string {
  return name
    .replace(/^\d+\.\s*/, '')
    .replace(/^(1\.\s*)?FC\s+/i, '')
    .replace(/^(SV|VfB|VfL|TSV|SC|SG|SpVgg|FSV|SSV|TSG|Borussia|Bayer|RB|SV\s+Werder)\s+/i, '')
    .replace(/^(Eintracht|Dynamo|Fortuna|Hannover|Hertha|Union|Werder)\s+/i, '')
    .trim()
}

function stripSpanishPrefix(name: string): string {
  return name
    .replace(/^(AD|CD|CF|RCD|UD|SD|CA|CE|Real|Atlético|Atletico|Deportivo|Sporting|Cultural|Racing)\s+/i, '')
    .trim()
}

function stripItalianPrefix(name: string): string {
  return name
    .replace(/^(AC|AS|US|SS|UC|FC|SC|SSD|SS|Calcio)\s+/i, '')
    .trim()
}

function stripFrenchPrefix(name: string): string {
  return name
    .replace(/^(AS|FC|SC|RC|AC|OGC|ESTAC|Stade|Paris|Olympique)\s+/i, '')
    .trim()
}

function matchSuffix(name: string, suffix: string): string | null {
  const re = new RegExp(`^(.+?)\\s+${suffix}$`, 'i')
  const m = name.match(re)
  return m ? m[1] : null
}

export function resolvePlaceName(teamName: string, countryCode: string): string {
  const overrides = CLUB_PLACE_OVERRIDES[countryCode]
  if (overrides?.[teamName]) return overrides[teamName]
  const americasOverrides = AMERICAS_PLACE_OVERRIDES[countryCode]
  if (americasOverrides?.[teamName]) return americasOverrides[teamName]
  const easternEuropeOverrides = EASTERN_EUROPE_PLACE_OVERRIDES[countryCode]
  if (easternEuropeOverrides?.[teamName]) return easternEuropeOverrides[teamName]
  const icelandOverrides = ICELAND_PLACE_OVERRIDES[countryCode]
  if (icelandOverrides?.[teamName]) return icelandOverrides[teamName]
  const northAtlanticOverrides = NORTH_ATLANTIC_PLACE_OVERRIDES[countryCode]
  if (northAtlanticOverrides?.[teamName]) return northAtlanticOverrides[teamName]

  const primary = teamName.split(/\s*\/\s*/)[0].trim()
  let place = stripGenericSuffixes(primary)

  if (countryCode === 'DE') {
    const de = stripGermanPrefix(teamName)
    if (de && de !== teamName) return de
  }
  if (countryCode === 'ES') {
    const es = stripSpanishPrefix(teamName)
    if (es && es !== teamName) return es
  }
  if (countryCode === 'IT') {
    const it = stripItalianPrefix(teamName)
    if (it && it !== teamName) return it
  }
  if (countryCode === 'FR') {
    const fr = stripFrenchPrefix(teamName)
    if (fr && fr !== teamName) return fr
  }

  const patterns = [
    (n: string) => matchSuffix(n, 'United'),
    (n: string) => matchSuffix(n, 'City'),
    (n: string) => matchSuffix(n, 'Town'),
    (n: string) => matchSuffix(n, 'Rovers'),
    (n: string) => matchSuffix(n, 'Athletic'),
    (n: string) => matchSuffix(n, 'Albion'),
    (n: string) => matchSuffix(n, 'Wanderers'),
    (n: string) => matchSuffix(n, 'Hotspur'),
    (n: string) => matchSuffix(n, 'County'),
    (n: string) => matchSuffix(n, 'Villa'),
    (n: string) => matchSuffix(n, 'Palace'),
    (n: string) => matchSuffix(n, 'Forest'),
    (n: string) => matchSuffix(n, 'Wednesday'),
    (n: string) => matchSuffix(n, 'North End'),
    (n: string) => n.match(/^AFC\s+(.+)$/i)?.[1] ?? null,
    (n: string) => n.match(/^(.+?)\s+SK$/i)?.[1] ?? null,
    (n: string) => n.match(/^(.+?)\s+JK$/i)?.[1] ?? null,
  ]

  for (const fn of patterns) {
    const hit = fn(place)
    if (hit) return hit.trim()
  }

  return place
}
