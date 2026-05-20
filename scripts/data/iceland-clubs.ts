/**
 * Curated Icelandic clubs by tier with city-level coordinates.
 */

export type IcelandClubEntry = { name: string; city: string }
export type IcelandTierEntry = { leagueName: string; clubs: IcelandClubEntry[] }
export type IcelandCountryClubs = {
  country: string
  tiers: Record<number, IcelandTierEntry>
}
export type CityCoord = { lat: number; lng: number }

const t = (
  leagueName: string,
  clubs: [name: string, city: string][],
): IcelandTierEntry => ({
  leagueName,
  clubs: clubs.map(([name, city]) => ({ name, city })),
})

export const ICELAND_CITY_COORDS: Record<string, Record<string, CityCoord>> = {
  IS: {
    Reykjavik: { lat: 64.1466, lng: -21.9426 },
    Kopavogur: { lat: 64.111, lng: -21.905 },
    Hafnarfjordur: { lat: 64.0671, lng: -21.9377 },
    Gardabaer: { lat: 64.0887, lng: -21.922 },
    Akureyri: { lat: 65.6885, lng: -18.1262 },
    Keflavik: { lat: 64.0049, lng: -22.5624 },
    Akranes: { lat: 64.3218, lng: -22.0749 },
    Vestmannaeyjar: { lat: 63.4427, lng: -20.2734 },
    Selfoss: { lat: 63.9331, lng: -20.9971 },
    Mosfellsbaer: { lat: 64.1667, lng: -21.7 },
    Grindavik: { lat: 63.8424, lng: -22.4338 },
    Isafjordur: { lat: 66.0748, lng: -23.1348 },
    Egilsstadir: { lat: 65.2669, lng: -14.3948 },
    Dalvik: { lat: 65.9702, lng: -18.5286 },
  },
}

export const ICELAND_CURATED: Record<string, IcelandCountryClubs> = {
  IS: {
    country: 'Iceland',
    tiers: {
      1: t('Besta deild karla', [
        ['Víkingur Reykjavík', 'Reykjavik'],
        ['Breiðablik', 'Kopavogur'],
        ['Valur', 'Reykjavik'],
        ['Stjarnan', 'Gardabaer'],
      ]),
      2: t('1. deild karla', [
        ['KR Reykjavík', 'Reykjavik'],
        ['FH Hafnarfjörður', 'Hafnarfjordur'],
        ['KA Akureyri', 'Akureyri'],
        ['Keflavík', 'Keflavik'],
      ]),
      3: t('2. deild karla', [
        ['ÍA Akranes', 'Akranes'],
        ['ÍBV Vestmannaeyjar', 'Vestmannaeyjar'],
        ['Fylkir', 'Reykjavik'],
        ['HK Kópavogur', 'Kopavogur'],
      ]),
      4: t('3. deild karla', [
        ['Fram Reykjavík', 'Reykjavik'],
        ['Þróttur Reykjavík', 'Reykjavik'],
        ['Leiknir Reykjavík', 'Reykjavik'],
        ['Selfoss', 'Selfoss'],
      ]),
      5: t('4. deild karla', [
        ['Grindavík', 'Grindavik'],
        ['Afturelding', 'Mosfellsbaer'],
        ['Vestri Ísafjörður', 'Isafjordur'],
        ['Höttur/Huginn', 'Egilsstadir'],
      ]),
      6: t('Regional League', [
        ['Dalvík/Reynir', 'Dalvik'],
        ['Njarðvík', 'Keflavik'],
        ['Kári Akranes', 'Akranes'],
        ['Haukar Hafnarfjörður', 'Hafnarfjordur'],
      ]),
      7: t('Local League', [
        ['Reykjavik Local XI', 'Reykjavik'],
        ['Kopavogur Local XI', 'Kopavogur'],
        ['Akureyri Local XI', 'Akureyri'],
        ['Vestmannaeyjar Local XI', 'Vestmannaeyjar'],
      ]),
    },
  },
}

export const ICELAND_PLACE_OVERRIDES: Record<string, Record<string, string>> = {}

for (const [countryCode, config] of Object.entries(ICELAND_CURATED)) {
  ICELAND_PLACE_OVERRIDES[countryCode] = {}
  for (const tier of Object.values(config.tiers)) {
    for (const club of tier.clubs) {
      ICELAND_PLACE_OVERRIDES[countryCode][club.name] = club.city
    }
  }
}

export function getIcelandClubLocation(
  countryCode: string,
  clubName: string,
): { city: string; lat: number; lng: number } | null {
  const city = ICELAND_PLACE_OVERRIDES[countryCode]?.[clubName]
  if (!city) return null
  const coords = ICELAND_CITY_COORDS[countryCode]?.[city]
  if (!coords) return null
  return { city, lat: coords.lat, lng: coords.lng }
}
