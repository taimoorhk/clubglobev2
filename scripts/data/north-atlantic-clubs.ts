/**
 * Curated Greenland and Ireland clubs by tier with city-level coordinates.
 */

export type NorthAtlanticClubEntry = { name: string; city: string }
export type NorthAtlanticTierEntry = {
  leagueName: string
  clubs: NorthAtlanticClubEntry[]
}
export type NorthAtlanticCountryClubs = {
  country: string
  tiers: Record<number, NorthAtlanticTierEntry>
}
export type CityCoord = { lat: number; lng: number }

const t = (
  leagueName: string,
  clubs: [name: string, city: string][],
): NorthAtlanticTierEntry => ({
  leagueName,
  clubs: clubs.map(([name, city]) => ({ name, city })),
})

export const NORTH_ATLANTIC_CITY_COORDS: Record<string, Record<string, CityCoord>> = {
  GL: {
    Nuuk: { lat: 64.1835, lng: -51.7216 },
    Sisimiut: { lat: 66.9395, lng: -53.6735 },
    Ilulissat: { lat: 69.2198, lng: -51.0986 },
    Qaqortoq: { lat: 60.7184, lng: -46.0356 },
    Aasiaat: { lat: 68.7098, lng: -52.8699 },
    Maniitsoq: { lat: 65.4167, lng: -52.9 },
    Tasiilaq: { lat: 65.6136, lng: -37.6337 },
    Upernavik: { lat: 72.7868, lng: -56.1549 },
    Paamiut: { lat: 61.994, lng: -49.6678 },
    Narsaq: { lat: 60.9127, lng: -46.0505 },
    Qeqertarsuaq: { lat: 69.2472, lng: -53.5365 },
    Nanortalik: { lat: 60.1432, lng: -45.2371 },
  },
  IE: {
    Dublin: { lat: 53.3498, lng: -6.2603 },
    Cork: { lat: 51.8985, lng: -8.4756 },
    Galway: { lat: 53.2707, lng: -9.0568 },
    Sligo: { lat: 54.2766, lng: -8.4761 },
    Limerick: { lat: 52.6638, lng: -8.6267 },
    Waterford: { lat: 52.2593, lng: -7.1101 },
    Dundalk: { lat: 54.0049, lng: -6.4049 },
    Drogheda: { lat: 53.7179, lng: -6.3561 },
    Wexford: { lat: 52.3369, lng: -6.4633 },
    Cobh: { lat: 51.8505, lng: -8.2948 },
    Bray: { lat: 53.2009, lng: -6.1111 },
    Athlone: { lat: 53.4239, lng: -7.9407 },
    Ballybofey: { lat: 54.8013, lng: -7.7811 },
    Tralee: { lat: 52.2713, lng: -9.7026 },
    Longford: { lat: 53.7275, lng: -7.7998 },
    Derry: { lat: 54.9966, lng: -7.3086 },
    Buncrana: { lat: 55.1333, lng: -7.45 },
    Maynooth: { lat: 53.3813, lng: -6.5919 },
    Letterkenny: { lat: 54.9533, lng: -7.7342 },
  },
}

export const NORTH_ATLANTIC_CURATED: Record<string, NorthAtlanticCountryClubs> = {
  GL: {
    country: 'Greenland',
    tiers: {
      1: t('Kalaallit Nunaanni Brugseni Final 6', [
        ['B-67 Nuuk', 'Nuuk'],
        ['G-44 Qeqertarsuaq', 'Qeqertarsuaq'],
        ['N-48 Ilulissat', 'Ilulissat'],
        ['Nagdlunguaq-48', 'Ilulissat'],
      ]),
      2: t('Greenland Championship Qualifiers', [
        ['IT-79 Nuuk', 'Nuuk'],
        ['K-33 Qaqortoq', 'Qaqortoq'],
        ['SAK Sisimiut', 'Sisimiut'],
        ['FC Malamuk', 'Upernavik'],
      ]),
      3: t('Regional Championship North', [
        ['UB-83 Upernavik', 'Upernavik'],
        ['A-51 Akunnaaq', 'Aasiaat'],
        ['Disko-76', 'Qeqertarsuaq'],
        ['Ilulissat Regional XI', 'Ilulissat'],
      ]),
      4: t('Regional Championship South', [
        ['Kissaviarsuk-33', 'Qaqortoq'],
        ['Narsaq-85', 'Narsaq'],
        ['Siuteroq Nanortalik', 'Nanortalik'],
        ['Paamiut Regional XI', 'Paamiut'],
      ]),
      5: t('Regional Championship East', [
        ['Tasiilaq Regional XI', 'Tasiilaq'],
        ['Ammassalik-44', 'Tasiilaq'],
        ['Nuuk Regional XI', 'Nuuk'],
        ['Maniitsoq Regional XI', 'Maniitsoq'],
      ]),
      6: t('Municipal League', [
        ['Nuuk Municipal XI', 'Nuuk'],
        ['Sisimiut Municipal XI', 'Sisimiut'],
        ['Aasiaat Municipal XI', 'Aasiaat'],
        ['Qaqortoq Municipal XI', 'Qaqortoq'],
      ]),
      7: t('Local League', [
        ['Nuuk Local XI', 'Nuuk'],
        ['Ilulissat Local XI', 'Ilulissat'],
        ['Tasiilaq Local XI', 'Tasiilaq'],
        ['Upernavik Local XI', 'Upernavik'],
      ]),
    },
  },
  IE: {
    country: 'Ireland',
    tiers: {
      1: t('League of Ireland Premier Division', [
        ['Shamrock Rovers', 'Dublin'],
        ['Bohemians', 'Dublin'],
        ['Shelbourne', 'Dublin'],
        ['Derry City', 'Derry'],
      ]),
      2: t('League of Ireland First Division', [
        ['Cork City', 'Cork'],
        ['Galway United', 'Galway'],
        ['Sligo Rovers', 'Sligo'],
        ['Waterford FC', 'Waterford'],
      ]),
      3: t('League of Ireland First Division', [
        ['Dundalk', 'Dundalk'],
        ['Drogheda United', 'Drogheda'],
        ['Treaty United', 'Limerick'],
        ['Wexford FC', 'Wexford'],
      ]),
      4: t('National League / Senior League', [
        ['Cobh Ramblers', 'Cobh'],
        ['Bray Wanderers', 'Bray'],
        ['Athlone Town', 'Athlone'],
        ['Finn Harps', 'Ballybofey'],
      ]),
      5: t('Senior Provincial Leagues', [
        ['Kerry FC', 'Tralee'],
        ['Longford Town', 'Longford'],
        ['UCD', 'Dublin'],
        ['St Patrick\'s Athletic', 'Dublin'],
      ]),
      6: t('Leinster and Munster Senior Leagues', [
        ['Bluebell United', 'Dublin'],
        ['Crumlin United', 'Dublin'],
        ['Avondale United', 'Cork'],
        ['Rockmount AFC', 'Cork'],
      ]),
      7: t('Regional and Local Leagues', [
        ['Cockhill Celtic', 'Buncrana'],
        ['Maynooth University Town', 'Maynooth'],
        ['Letterkenny Rovers', 'Letterkenny'],
        ['Tolka Rovers', 'Dublin'],
      ]),
    },
  },
}

export const NORTH_ATLANTIC_PLACE_OVERRIDES: Record<string, Record<string, string>> = {}

for (const [countryCode, config] of Object.entries(NORTH_ATLANTIC_CURATED)) {
  NORTH_ATLANTIC_PLACE_OVERRIDES[countryCode] = {}
  for (const tier of Object.values(config.tiers)) {
    for (const club of tier.clubs) {
      NORTH_ATLANTIC_PLACE_OVERRIDES[countryCode][club.name] = club.city
    }
  }
}

export function getNorthAtlanticClubLocation(
  countryCode: string,
  clubName: string,
): { city: string; lat: number; lng: number } | null {
  const city = NORTH_ATLANTIC_PLACE_OVERRIDES[countryCode]?.[clubName]
  if (!city) return null
  const coords = NORTH_ATLANTIC_CITY_COORDS[countryCode]?.[city]
  if (!coords) return null
  return { city, lat: coords.lat, lng: coords.lng }
}
