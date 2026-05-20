/**
 * Curated Oceania clubs by country and tier.
 *
 * RapidAPI/Fotmob coverage is strongest for A-League and New Zealand's
 * National League, so this file fills the rest of the regional pyramid with
 * city-level coordinates.
 */

export type OceaniaClubEntry = { name: string; city: string }
export type OceaniaTierEntry = { leagueName: string; clubs: OceaniaClubEntry[] }
export type OceaniaCountryClubs = {
  country: string
  tiers: Record<number, OceaniaTierEntry>
}
export type CityCoord = { lat: number; lng: number }

const t = (
  leagueName: string,
  clubs: [name: string, city: string][],
): OceaniaTierEntry => ({
  leagueName,
  clubs: clubs.map(([name, city]) => ({ name, city })),
})

export const OCEANIA_CITY_COORDS: Record<string, Record<string, CityCoord>> = {
  AU: {
    Adelaide: { lat: -34.9285, lng: 138.6007 },
    Auckland: { lat: -36.8509, lng: 174.7645 },
    Brisbane: { lat: -27.4698, lng: 153.0251 },
    Gosford: { lat: -33.425, lng: 151.3422 },
    Melbourne: { lat: -37.8136, lng: 144.9631 },
    Newcastle: { lat: -32.9283, lng: 151.7817 },
    Perth: { lat: -31.9523, lng: 115.8613 },
    Sydney: { lat: -33.8688, lng: 151.2093 },
    Campbelltown: { lat: -34.0674, lng: 150.8144 },
    Tarneit: { lat: -37.836, lng: 144.6696 },
    Wellington: { lat: -41.2865, lng: 174.7762 },
    Wollongong: { lat: -34.4278, lng: 150.8931 },
    Rockdale: { lat: -33.9526, lng: 151.1366 },
    Blacktown: { lat: -33.771, lng: 150.9063 },
    Marconi: { lat: -33.858, lng: 150.889 },
    Hume: { lat: -37.598, lng: 144.948 },
    Heidelberg: { lat: -37.753, lng: 145.07 },
    Oakleigh: { lat: -37.9004, lng: 145.0898 },
    Bentleigh: { lat: -37.9183, lng: 145.0356 },
    GoldCoast: { lat: -28.0167, lng: 153.4 },
    Redcliffe: { lat: -27.2307, lng: 153.1157 },
    Fremantle: { lat: -32.0569, lng: 115.7439 },
    Stirling: { lat: -31.8839, lng: 115.8094 },
    Hobart: { lat: -42.8821, lng: 147.3272 },
    Devonport: { lat: -41.1771, lng: 146.3513 },
    Canberra: { lat: -35.2809, lng: 149.13 },
    Belconnen: { lat: -35.2387, lng: 149.0659 },
    Maitland: { lat: -32.7331, lng: 151.5574 },
    Broadmeadow: { lat: -32.923, lng: 151.735 },
    Bankstown: { lat: -33.9173, lng: 151.0359 },
    Bonnyrigg: { lat: -33.893, lng: 150.889 },
    'St Albans': { lat: -37.745, lng: 144.8 },
    Dandenong: { lat: -37.9875, lng: 145.214 },
    Preston: { lat: -37.741, lng: 145.006 },
    Kingston: { lat: -42.9764, lng: 147.3095 },
    Sunshine: { lat: -37.7896, lng: 144.8314 },
    'Box Hill': { lat: -37.818, lng: 145.125 },
    Hawthorn: { lat: -37.8247, lng: 145.0358 },
    WaggaWagga: { lat: -35.1082, lng: 147.3598 },
    Griffith: { lat: -34.2885, lng: 146.0509 },
    Ballarat: { lat: -37.5622, lng: 143.8503 },
    Geelong: { lat: -38.1499, lng: 144.3617 },
    Bendigo: { lat: -36.757, lng: 144.2794 },
    Altona: { lat: -37.8698, lng: 144.8304 },
    Ringwood: { lat: -37.814, lng: 145.23 },
    Knox: { lat: -37.898, lng: 145.238 },
    Bundoora: { lat: -37.698, lng: 145.06 },
    Frankston: { lat: -38.144, lng: 145.122 },
    Bayswater: { lat: -37.844, lng: 145.267 },
    Morwell: { lat: -38.236, lng: 146.399 },
    Launceston: { lat: -41.4332, lng: 147.1441 },
    Burnie: { lat: -41.052, lng: 145.906 },
    Queanbeyan: { lat: -35.3549, lng: 149.232 },
    Gungahlin: { lat: -35.185, lng: 149.136 },
  },
  NZ: {
    Auckland: { lat: -36.8509, lng: 174.7645 },
    Wellington: { lat: -41.2865, lng: 174.7762 },
    Christchurch: { lat: -43.5321, lng: 172.6362 },
    Hamilton: { lat: -37.787, lng: 175.2793 },
    Napier: { lat: -39.4928, lng: 176.912 },
    'Lower Hutt': { lat: -41.212, lng: 174.903 },
    Dunedin: { lat: -45.8788, lng: 170.5028 },
    Nelson: { lat: -41.2706, lng: 173.284 },
    Tauranga: { lat: -37.6878, lng: 176.1651 },
    Porirua: { lat: -41.1333, lng: 174.85 },
    Petone: { lat: -41.226, lng: 174.878 },
    Miramar: { lat: -41.315, lng: 174.817 },
    'East Auckland': { lat: -36.901, lng: 174.899 },
    Manukau: { lat: -36.9928, lng: 174.8794 },
    Cashmere: { lat: -43.566, lng: 172.623 },
    Birkenhead: { lat: -36.812, lng: 174.725 },
    'West Auckland': { lat: -36.879, lng: 174.627 },
    'North Shore': { lat: -36.786, lng: 174.756 },
  },
  FJ: {
    Ba: { lat: -17.5333, lng: 177.6833 },
    Lautoka: { lat: -17.6167, lng: 177.45 },
    Suva: { lat: -18.1416, lng: 178.4419 },
    Labasa: { lat: -16.4333, lng: 179.3667 },
    Nadi: { lat: -17.8, lng: 177.4167 },
    Nausori: { lat: -18.0244, lng: 178.5454 },
    Navua: { lat: -18.241, lng: 178.178 },
    Sigatoka: { lat: -18.1438, lng: 177.5069 },
    Tavua: { lat: -17.45, lng: 177.8667 },
  },
  PG: {
    'Port Moresby': { lat: -9.4438, lng: 147.1803 },
    Lae: { lat: -6.732, lng: 147.0 },
    Madang: { lat: -5.2247, lng: 145.7853 },
    Goroka: { lat: -6.0833, lng: 145.3867 },
    Wewak: { lat: -3.5534, lng: 143.6268 },
    Kimbe: { lat: -5.55, lng: 150.143 },
    'Mount Hagen': { lat: -5.8581, lng: 144.2274 },
    Arawa: { lat: -6.229, lng: 155.565 },
  },
  SB: {
    Honiara: { lat: -9.4456, lng: 159.9729 },
    Henderson: { lat: -9.428, lng: 160.054 },
    Auki: { lat: -8.7676, lng: 160.6974 },
    Gizo: { lat: -8.103, lng: 156.8419 },
  },
  VU: {
    'Port Vila': { lat: -17.7333, lng: 168.3273 },
    Luganville: { lat: -15.5199, lng: 167.1624 },
    Isangel: { lat: -19.5417, lng: 169.2817 },
    Lakatoro: { lat: -16.0999, lng: 167.4164 },
  },
  NC: {
    Noumea: { lat: -22.2758, lng: 166.458 },
    Kone: { lat: -21.0595, lng: 164.8658 },
    Lifou: { lat: -20.9, lng: 167.25 },
    Mare: { lat: -21.5167, lng: 168.05 },
    Dumbea: { lat: -22.15, lng: 166.45 },
    'Mont-Dore': { lat: -22.2667, lng: 166.5833 },
  },
  PF: {
    Papeete: { lat: -17.5516, lng: -149.5585 },
    Pirae: { lat: -17.5333, lng: -149.5333 },
    Faaa: { lat: -17.55, lng: -149.6 },
    Mahina: { lat: -17.5065, lng: -149.4886 },
    Punaauia: { lat: -17.6333, lng: -149.6 },
    Moorea: { lat: -17.5333, lng: -149.8333 },
    Taravao: { lat: -17.7333, lng: -149.3167 },
  },
  WS: {
    Apia: { lat: -13.8333, lng: -171.7667 },
    Tuanaimato: { lat: -13.8508, lng: -171.795 },
    Vaitele: { lat: -13.8196, lng: -171.8254 },
    Faleasiu: { lat: -13.8037, lng: -171.9127 },
  },
  TO: {
    "Nuku'alofa": { lat: -21.1394, lng: -175.2049 },
    Veitongo: { lat: -21.191, lng: -175.202 },
    Haveluloto: { lat: -21.152, lng: -175.224 },
    Pangai: { lat: -19.8147, lng: -174.3542 },
  },
  CK: {
    Avarua: { lat: -21.207, lng: -159.771 },
    Tupapa: { lat: -21.203, lng: -159.755 },
    Matavera: { lat: -21.221, lng: -159.743 },
    Titikaveka: { lat: -21.264, lng: -159.754 },
  },
  AS: {
    'Pago Pago': { lat: -14.2756, lng: -170.702 },
    Tafuna: { lat: -14.3358, lng: -170.72 },
    Utulei: { lat: -14.286, lng: -170.682 },
    Leone: { lat: -14.3439, lng: -170.785 },
  },
}

export const OCEANIA_CURATED: Record<string, OceaniaCountryClubs> = {
  AU: {
    country: 'Australia',
    tiers: {
      1: t('A-League Men', [
        ['Adelaide United', 'Adelaide'], ['Auckland FC', 'Auckland'], ['Brisbane Roar', 'Brisbane'],
        ['Central Coast Mariners', 'Gosford'], ['Macarthur FC', 'Campbelltown'], ['Melbourne City FC', 'Melbourne'],
        ['Melbourne Victory', 'Melbourne'], ['Newcastle Jets', 'Newcastle'], ['Perth Glory', 'Perth'],
        ['Sydney FC', 'Sydney'], ['Wellington Phoenix', 'Wellington'], ['Western Sydney Wanderers', 'Sydney'],
        ['Western United FC', 'Tarneit'],
      ]),
      2: t('National Premier Leagues', [
        ['APIA Leichhardt', 'Sydney'], ['Sydney United 58', 'Sydney'], ['Rockdale Ilinden', 'Rockdale'],
        ['Wollongong Wolves', 'Wollongong'], ['Marconi Stallions', 'Marconi'], ['Blacktown City', 'Blacktown'],
        ['South Melbourne', 'Melbourne'], ['Avondale FC', 'Melbourne'], ['Heidelberg United', 'Heidelberg'],
        ['Oakleigh Cannons', 'Oakleigh'], ['Brisbane City', 'Brisbane'], ['Gold Coast Knights', 'GoldCoast'],
        ['Perth SC', 'Perth'], ['Adelaide City', 'Adelaide'], ['Devonport City', 'Devonport'],
        ['Canberra Croatia', 'Canberra'], ['Broadmeadow Magic', 'Broadmeadow'],
      ]),
      3: t('State League One / NPL 2', [
        ['Hills United', 'Sydney'], ['Mt Druitt Town Rangers', 'Sydney'], ['Bonnyrigg White Eagles', 'Bonnyrigg'],
        ['Preston Lions', 'Preston'], ['Northcote City', 'Melbourne'], ['Melbourne Knights', 'Melbourne'],
        ['Eastern Suburbs', 'Brisbane'], ['Olympic FC', 'Brisbane'], ['Western Knights', 'Perth'],
        ['Stirling Macedonia', 'Stirling'], ['Campbelltown City', 'Adelaide'], ['MetroStars', 'Adelaide'],
        ['Glenorchy Knights', 'Hobart'], ['Belconnen United', 'Belconnen'], ['Edgeworth Eagles', 'Newcastle'],
      ]),
      4: t('State League Two', [
        ['Bankstown City Lions', 'Bankstown'], ['Dulwich Hill', 'Sydney'], ['St George City', 'Sydney'],
        ['St Albans Saints', 'St Albans'], ['Dandenong City', 'Dandenong'], ['Kingston City', 'Kingston'],
        ['Redcliffe Dolphins SC', 'Redcliffe'], ['Fremantle City', 'Fremantle'], ['Adelaide Blue Eagles', 'Adelaide'],
        ['South Hobart', 'Hobart'], ['Canberra Olympic', 'Canberra'], ['Maitland FC', 'Maitland'],
      ]),
      5: t('State League Three', [
        ['Hakoah Sydney City East', 'Sydney'], ['Rydalmere Lions', 'Sydney'], ['Sunshine George Cross', 'Sunshine'],
        ['Box Hill United', 'Box Hill'], ['Hawthorn FC', 'Hawthorn'], ['Wagga City Wanderers', 'WaggaWagga'],
        ['Griffith City FC', 'Griffith'], ['Ballarat City', 'Ballarat'], ['Geelong SC', 'Geelong'],
        ['Bendigo City', 'Bendigo'], ['Launceston City', 'Launceston'], ['Queanbeyan City', 'Queanbeyan'],
      ]),
      6: t('State League Four', [
        ['Altona City', 'Altona'], ['Ringwood City', 'Ringwood'], ['Knox City', 'Knox'],
        ['Bundoora United', 'Bundoora'], ['Frankston Pines', 'Frankston'], ['Bayswater City', 'Bayswater'],
        ['Morwell Pegasus', 'Morwell'], ['Burnie United', 'Burnie'], ['Gungahlin United', 'Gungahlin'],
        ['Balmain Tigers', 'Sydney'], ['Camden Tigers', 'Campbelltown'], ['Northern Tigers', 'Sydney'],
      ]),
      7: t('Local Premier Leagues', [
        ['Sydney University', 'Sydney'], ['Parramatta FC', 'Sydney'], ['Canterbury Bankstown', 'Bankstown'],
        ['Moreland City', 'Melbourne'], ['Essendon Royals', 'Melbourne'], ['Brunswick City', 'Melbourne'],
        ['Brisbane Strikers', 'Brisbane'], ['Southside Eagles', 'Brisbane'], ['Subiaco AFC', 'Perth'],
        ['Sorrento FC', 'Perth'], ['Launceston United', 'Launceston'], ['Tuggeranong United', 'Canberra'],
      ]),
    },
  },
  NZ: {
    country: 'New Zealand',
    tiers: {
      1: t('National League Championship', [
        ['Auckland City FC', 'Auckland'], ['Wellington Olympic', 'Wellington'], ['Christchurch United', 'Christchurch'],
        ['Cashmere Technical', 'Cashmere'], ['Eastern Suburbs', 'East Auckland'], ['Birkenhead United', 'Birkenhead'],
        ['Western Springs', 'Auckland'], ['Auckland FC B', 'Auckland'], ['Miramar Rangers', 'Miramar'],
        ['Napier City Rovers', 'Napier'], ['Coastal Spirit', 'Christchurch'],
      ]),
      2: t('Regional Premier Leagues', [
        ['West Coast Rangers', 'West Auckland'], ['Bay Olympic', 'Auckland'], ['Manurewa AFC', 'Manukau'],
        ['Hamilton Wanderers', 'Hamilton'], ['Petone FC', 'Petone'], ['Stop Out', 'Lower Hutt'],
        ['Waterside Karori', 'Wellington'], ['Nelson Suburbs', 'Nelson'], ['Dunedin City Royals', 'Dunedin'],
        ['Ferrymead Bays', 'Christchurch'], ['Tauranga City', 'Tauranga'], ['North Shore United', 'North Shore'],
      ]),
      3: t('Federation League', [
        ['Metro FC', 'Auckland'], ['Onehunga Mangere United', 'Auckland'], ['Melville United', 'Hamilton'],
        ['Western Suburbs', 'Porirua'], ['Island Bay United', 'Wellington'], ['Nomads United', 'Christchurch'],
        ['Roslyn Wakari', 'Dunedin'], ['Richmond Athletic', 'Nelson'],
      ]),
      4: t('Regional Division One', [
        ['Ellerslie AFC', 'Auckland'], ['Glenfield Rovers', 'North Shore'], ['Cambridge FC', 'Hamilton'],
        ['Upper Hutt City', 'Lower Hutt'], ['Seatoun AFC', 'Wellington'], ['Halswell United', 'Christchurch'],
        ['Caversham AFC', 'Dunedin'], ['FC Nelson', 'Nelson'],
      ]),
      5: t('Regional Division Two', [
        ['Papakura City', 'Auckland'], ['Waitemata FC', 'Auckland'], ['Claudelands Rovers', 'Hamilton'],
        ['Naenae SC', 'Lower Hutt'], ['Brooklyn Northern United', 'Wellington'], ['Waimak United', 'Christchurch'],
        ['Green Island AFC', 'Dunedin'], ['Tahuna FC', 'Nelson'],
      ]),
      6: t('Regional Division Three', [
        ['Beachlands Maraetai', 'East Auckland'], ['Te Atatu FC', 'West Auckland'], ['Te Awamutu AFC', 'Hamilton'],
        ['Tawa AFC', 'Wellington'], ['University of Canterbury', 'Christchurch'], ['Mosgiel AFC', 'Dunedin'],
      ]),
      7: t('Local Community Leagues', [
        ['Central United', 'Auckland'], ['Fencibles United', 'East Auckland'], ['Miramar Rangers B', 'Miramar'],
        ['Western Springs B', 'Auckland'], ['Cashmere Technical B', 'Cashmere'], ['Dunedin Technical', 'Dunedin'],
      ]),
    },
  },
  FJ: {
    country: 'Fiji',
    tiers: {
      1: t('Fiji Premier League', [
        ['Ba FC', 'Ba'], ['Lautoka FC', 'Lautoka'], ['Suva FC', 'Suva'], ['Labasa FC', 'Labasa'],
        ['Nadi FC', 'Nadi'], ['Rewa FC', 'Nausori'], ['Navua FC', 'Navua'], ['Nadroga FC', 'Sigatoka'],
        ['Tavua FC', 'Tavua'], ['Tailevu Naitasiri', 'Nausori'],
      ]),
      2: t('Fiji Senior League', [
        ['Rakiraki FC', 'Tavua'], ['Seaqaqa FC', 'Labasa'], ['Nasinu FC', 'Suva'], ['Lami FC', 'Suva'],
      ]),
    },
  },
  PG: {
    country: 'Papua New Guinea',
    tiers: {
      1: t('National Soccer League', [
        ['Hekari United', 'Port Moresby'], ['Lae City FC', 'Lae'], ['PRK Gulf Komara', 'Port Moresby'],
        ['United Highlands FC', 'Mount Hagen'], ['Madang FC', 'Madang'], ['Morobe Wawens', 'Lae'],
        ['Tusbab Stallions', 'Madang'], ['Bougainville FC', 'Arawa'], ['Sepik FC', 'Wewak'], ['Kimbe Eagles', 'Kimbe'],
      ]),
    },
  },
  SB: {
    country: 'Solomon Islands',
    tiers: {
      1: t('Telekom S-League', [
        ['Solomon Warriors', 'Honiara'], ['Kossa FC', 'Honiara'], ['Henderson Eels', 'Henderson'],
        ['Laugu United', 'Honiara'], ['Central Coast FC', 'Honiara'], ['Marist FC', 'Honiara'],
        ['Real Kakamora', 'Honiara'], ['Waneagu United', 'Honiara'], ['Southern United', 'Honiara'], ['Western United', 'Gizo'],
      ]),
    },
  },
  VU: {
    country: 'Vanuatu',
    tiers: {
      1: t('Port Vila Premier League', [
        ['Ifira Black Bird', 'Port Vila'], ['Tafea FC', 'Port Vila'], ['Galaxy FC', 'Port Vila'],
        ['Erakor Golden Star', 'Port Vila'], ['Amicale FC', 'Port Vila'], ['Shepherds United', 'Port Vila'],
        ['Mauwia FC', 'Port Vila'], ['Sia-Raga FC', 'Luganville'], ['Malampa Revivors', 'Lakatoro'], ['Tafea Provincial FC', 'Isangel'],
      ]),
    },
  },
  NC: {
    country: 'New Caledonia',
    tiers: {
      1: t('Super Ligue', [
        ['AS Magenta', 'Noumea'], ['Hienghene Sport', 'Kone'], ['AS Lossi', 'Noumea'],
        ['Tiga Sport', 'Noumea'], ['AS Mont-Dore', 'Mont-Dore'], ['SC Ne Drehu', 'Lifou'],
        ['AS Wetr', 'Lifou'], ['Horizon Patho', 'Mare'], ['Dumbea FC', 'Dumbea'], ['AS Kunie', 'Noumea'],
      ]),
    },
  },
  PF: {
    country: 'Tahiti',
    tiers: {
      1: t('Tahiti Ligue 1', [
        ['AS Pirae', 'Pirae'], ['AS Venus', 'Mahina'], ['AS Dragon', 'Papeete'], ['AS Tefana', 'Faaa'],
        ['AS Central Sport', 'Papeete'], ['AS Manu-Ura', 'Punaauia'], ['AS Tamarii Punaruu', 'Punaauia'],
        ['AS Jeunes Tahitiens', 'Papeete'], ['AS Moorea', 'Moorea'], ['Taiarapu FC', 'Taravao'],
      ]),
    },
  },
  WS: {
    country: 'Samoa',
    tiers: {
      1: t('Samoa National League', [
        ['Kiwi FC', 'Apia'], ['Lupe ole Soaga', 'Tuanaimato'], ['Vaivase-tai FC', 'Apia'], ['Vaitele Uta', 'Vaitele'],
        ['Moataa FC', 'Apia'], ['Lepea FC', 'Apia'], ['Sogi FC', 'Apia'], ['Faleasiu FC', 'Faleasiu'],
      ]),
    },
  },
  TO: {
    country: 'Tonga',
    tiers: {
      1: t('Tonga Major League', [
        ['Veitongo FC', 'Veitongo'], ['Lotohaapai United', 'Pangai'], ['Navutoka FC', "Nuku'alofa"],
        ['Tupapa FC Tonga', "Nuku'alofa"], ['Haamoko United', 'Haveluloto'], ['Marist Prems', "Nuku'alofa"],
      ]),
    },
  },
  CK: {
    country: 'Cook Islands',
    tiers: {
      1: t('Cook Islands Round Cup', [
        ['Tupapa Maraerenga', 'Tupapa'], ['Puaikura FC', 'Avarua'], ['Nikao Sokattak', 'Avarua'],
        ['Matavera FC', 'Matavera'], ['Titikaveka FC', 'Titikaveka'], ['Avatiu FC', 'Avarua'],
      ]),
    },
  },
  AS: {
    country: 'American Samoa',
    tiers: {
      1: t('FFAS Senior League', [
        ['Pago Youth', 'Pago Pago'], ['Tafuna Jets', 'Tafuna'], ['Utulei Youth', 'Utulei'],
        ['Lion Heart FC', 'Leone'], ['PanSa FC', 'Pago Pago'], ['Ilaoa and Toomata', 'Pago Pago'],
      ]),
    },
  },
}

export const OCEANIA_CODES = new Set(Object.keys(OCEANIA_CURATED))

export const OCEANIA_PLACE_OVERRIDES: Record<string, Record<string, string>> = {}

for (const [countryCode, config] of Object.entries(OCEANIA_CURATED)) {
  OCEANIA_PLACE_OVERRIDES[countryCode] = {}
  for (const tier of Object.values(config.tiers)) {
    for (const club of tier.clubs) {
      OCEANIA_PLACE_OVERRIDES[countryCode][club.name] = club.city
    }
  }
}

export function getOceaniaClubLocation(
  countryCode: string,
  clubName: string,
): { city: string; lat: number; lng: number } | null {
  const city = OCEANIA_PLACE_OVERRIDES[countryCode]?.[clubName]
  if (!city) return null
  const coords = OCEANIA_CITY_COORDS[countryCode]?.[city]
  if (!coords) return null
  return { city, lat: coords.lat, lng: coords.lng }
}
