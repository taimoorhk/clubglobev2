/**
 * Curated Eastern Europe clubs by country and tier.
 *
 * API coverage is uneven across these leagues, especially below tier 1, so this
 * file supplies map-ready club/city pairs for tiers 1-7.
 */

export type EasternEuropeClubEntry = { name: string; city: string }
export type EasternEuropeTierEntry = {
  leagueName: string
  clubs: EasternEuropeClubEntry[]
}
export type EasternEuropeCountryClubs = {
  country: string
  tiers: Record<number, EasternEuropeTierEntry>
}
export type CityCoord = { lat: number; lng: number }

const t = (
  leagueName: string,
  clubs: [name: string, city: string][],
): EasternEuropeTierEntry => ({
  leagueName,
  clubs: clubs.map(([name, city]) => ({ name, city })),
})

export const EASTERN_EUROPE_CITY_COORDS: Record<string, Record<string, CityCoord>> = {
  PL: {
    Warsaw: { lat: 52.2297, lng: 21.0122 },
    Krakow: { lat: 50.0647, lng: 19.945 },
    Lodz: { lat: 51.7592, lng: 19.456 },
    Poznan: { lat: 52.4064, lng: 16.9252 },
    Gdansk: { lat: 54.352, lng: 18.6466 },
    Wroclaw: { lat: 51.1079, lng: 17.0385 },
    Katowice: { lat: 50.2649, lng: 19.0238 },
    Lublin: { lat: 51.2465, lng: 22.5684 },
    Kielce: { lat: 50.8661, lng: 20.6286 },
    Bialystok: { lat: 53.1325, lng: 23.1688 },
  },
  RU: {
    Moscow: { lat: 55.7558, lng: 37.6173 },
    'Saint Petersburg': { lat: 59.9311, lng: 30.3609 },
    Kazan: { lat: 55.7961, lng: 49.1064 },
    Krasnodar: { lat: 45.0355, lng: 38.9753 },
    Samara: { lat: 53.1959, lng: 50.1008 },
    'Nizhny Novgorod': { lat: 56.2965, lng: 43.9361 },
    Rostov: { lat: 47.2357, lng: 39.7015 },
    Sochi: { lat: 43.5855, lng: 39.7231 },
    Makhachkala: { lat: 42.9849, lng: 47.5047 },
    Yaroslavl: { lat: 57.6261, lng: 39.8845 },
  },
  UA: {
    Kyiv: { lat: 50.4501, lng: 30.5234 },
    Donetsk: { lat: 48.0159, lng: 37.8029 },
    Lviv: { lat: 49.8397, lng: 24.0297 },
    Dnipro: { lat: 48.4647, lng: 35.0462 },
    Odesa: { lat: 46.4825, lng: 30.7233 },
    Kharkiv: { lat: 49.9935, lng: 36.2304 },
    Poltava: { lat: 49.5883, lng: 34.5514 },
    Uzhhorod: { lat: 48.6208, lng: 22.2879 },
    Cherkasy: { lat: 49.4444, lng: 32.0598 },
    Ternopil: { lat: 49.5535, lng: 25.5948 },
  },
  CZ: {
    Prague: { lat: 50.0755, lng: 14.4378 },
    Plzen: { lat: 49.7384, lng: 13.3736 },
    Ostrava: { lat: 49.8209, lng: 18.2625 },
    Olomouc: { lat: 49.5938, lng: 17.2509 },
    Liberec: { lat: 50.7663, lng: 15.0543 },
    'Uherske Hradiste': { lat: 49.0698, lng: 17.4597 },
    Jablonec: { lat: 50.7221, lng: 15.1702 },
    Brno: { lat: 49.1951, lng: 16.6068 },
    Teplice: { lat: 50.6404, lng: 13.8245 },
  },
  RO: {
    Bucharest: { lat: 44.4268, lng: 26.1025 },
    'Cluj-Napoca': { lat: 46.7712, lng: 23.6236 },
    Craiova: { lat: 44.3302, lng: 23.7949 },
    Constanta: { lat: 44.1598, lng: 28.6348 },
    Arad: { lat: 46.1866, lng: 21.3123 },
    Sibiu: { lat: 45.7983, lng: 24.1256 },
    Ploiesti: { lat: 44.9367, lng: 26.0129 },
    Iasi: { lat: 47.1585, lng: 27.6014 },
    Timisoara: { lat: 45.7489, lng: 21.2087 },
  },
  RS: {
    Belgrade: { lat: 44.8125, lng: 20.4612 },
    'Novi Sad': { lat: 45.2671, lng: 19.8335 },
    Nis: { lat: 43.3209, lng: 21.8958 },
    Subotica: { lat: 46.1005, lng: 19.6651 },
    Krusevac: { lat: 43.5804, lng: 21.3267 },
    Lucani: { lat: 43.8606, lng: 20.1383 },
    'Backa Topola': { lat: 45.8152, lng: 19.6318 },
    'Novi Pazar': { lat: 43.1367, lng: 20.5122 },
  },
  HR: {
    Zagreb: { lat: 45.815, lng: 15.9819 },
    Split: { lat: 43.5081, lng: 16.4402 },
    Rijeka: { lat: 45.3271, lng: 14.4422 },
    Osijek: { lat: 45.5549, lng: 18.6955 },
    Varazdin: { lat: 46.3057, lng: 16.3366 },
    Pula: { lat: 44.8666, lng: 13.8496 },
    Koprivnica: { lat: 46.1628, lng: 16.8277 },
    Sibenik: { lat: 43.735, lng: 15.8952 },
  },
  HU: {
    Budapest: { lat: 47.4979, lng: 19.0402 },
    Debrecen: { lat: 47.5316, lng: 21.6273 },
    Szekesfehervar: { lat: 47.186, lng: 18.4221 },
    Paks: { lat: 46.6265, lng: 18.8596 },
    Kisvarda: { lat: 48.2167, lng: 22.0833 },
    Zalaegerszeg: { lat: 46.8417, lng: 16.8416 },
    Kecskemet: { lat: 46.8964, lng: 19.6897 },
    Gyor: { lat: 47.6875, lng: 17.6504 },
  },
  BG: {
    Sofia: { lat: 42.6977, lng: 23.3219 },
    Plovdiv: { lat: 42.1354, lng: 24.7453 },
    Razgrad: { lat: 43.5337, lng: 26.5411 },
    Varna: { lat: 43.2141, lng: 27.9147 },
    Burgas: { lat: 42.5048, lng: 27.4626 },
    'Stara Zagora': { lat: 42.4258, lng: 25.6345 },
    'Veliko Tarnovo': { lat: 43.0757, lng: 25.6172 },
    Blagoevgrad: { lat: 42.0209, lng: 23.0943 },
  },
  SK: {
    Bratislava: { lat: 48.1486, lng: 17.1077 },
    Trnava: { lat: 48.3774, lng: 17.5872 },
    Zilina: { lat: 49.2235, lng: 18.7393 },
    'Dunajska Streda': { lat: 47.9927, lng: 17.6121 },
    Ruzomberok: { lat: 49.0851, lng: 19.3048 },
    Kosice: { lat: 48.7164, lng: 21.2611 },
    'Banska Bystrica': { lat: 48.7363, lng: 19.1462 },
    Trencin: { lat: 48.8945, lng: 18.0444 },
  },
  SI: {
    Ljubljana: { lat: 46.0569, lng: 14.5058 },
    Maribor: { lat: 46.5547, lng: 15.6459 },
    Celje: { lat: 46.2397, lng: 15.2677 },
    Koper: { lat: 45.5481, lng: 13.7302 },
    'Murska Sobota': { lat: 46.6625, lng: 16.1664 },
    Domzale: { lat: 46.1377, lng: 14.5937 },
    'Nova Gorica': { lat: 45.956, lng: 13.6484 },
    Velenje: { lat: 46.3623, lng: 15.1107 },
  },
  BY: {
    Minsk: { lat: 53.9006, lng: 27.559 },
    Borisov: { lat: 54.2279, lng: 28.505 },
    Brest: { lat: 52.0976, lng: 23.7341 },
    Gomel: { lat: 52.4313, lng: 30.9937 },
    Grodno: { lat: 53.6694, lng: 23.8131 },
    Soligorsk: { lat: 52.7876, lng: 27.5415 },
    Vitebsk: { lat: 55.1848, lng: 30.2016 },
    Mogilev: { lat: 53.8981, lng: 30.3325 },
  },
  MD: {
    Chisinau: { lat: 47.0105, lng: 28.8638 },
    Tiraspol: { lat: 46.8403, lng: 29.6433 },
    Balti: { lat: 47.7539, lng: 27.9184 },
    Orhei: { lat: 47.3831, lng: 28.8231 },
    Hincesti: { lat: 46.8305, lng: 28.5906 },
    Soroca: { lat: 48.1566, lng: 28.2849 },
    Cahul: { lat: 45.9043, lng: 28.1993 },
    Comrat: { lat: 46.3002, lng: 28.6572 },
  },
  AL: {
    Tirana: { lat: 41.3275, lng: 19.8187 },
    Shkoder: { lat: 42.0683, lng: 19.5126 },
    Durres: { lat: 41.3231, lng: 19.4414 },
    Vlore: { lat: 40.4661, lng: 19.4914 },
    Korce: { lat: 40.6186, lng: 20.7808 },
    Elbasan: { lat: 41.1125, lng: 20.0822 },
    Kukes: { lat: 42.0807, lng: 20.4141 },
    Fier: { lat: 40.7275, lng: 19.5628 },
  },
  BA: {
    Sarajevo: { lat: 43.8563, lng: 18.4131 },
    'Banja Luka': { lat: 44.7722, lng: 17.191 },
    Mostar: { lat: 43.3438, lng: 17.8078 },
    Tuzla: { lat: 44.5384, lng: 18.6671 },
    Zenica: { lat: 44.2034, lng: 17.9077 },
    'Siroki Brijeg': { lat: 43.3833, lng: 17.5928 },
    Bijeljina: { lat: 44.7569, lng: 19.2161 },
    Doboj: { lat: 44.7318, lng: 18.0869 },
  },
  MK: {
    Skopje: { lat: 41.9981, lng: 21.4254 },
    Tetovo: { lat: 42.0097, lng: 20.9716 },
    Bitola: { lat: 41.0314, lng: 21.3347 },
    Strumica: { lat: 41.4378, lng: 22.6433 },
    Stip: { lat: 41.7458, lng: 22.1958 },
    Prilep: { lat: 41.3441, lng: 21.5528 },
    Kumanovo: { lat: 42.1322, lng: 21.7144 },
    Ohrid: { lat: 41.1231, lng: 20.8016 },
  },
  ME: {
    Podgorica: { lat: 42.4304, lng: 19.2594 },
    Niksic: { lat: 42.7731, lng: 18.9445 },
    Pljevlja: { lat: 43.3567, lng: 19.3584 },
    Petrovac: { lat: 42.2056, lng: 18.9425 },
    Tuzi: { lat: 42.3656, lng: 19.3314 },
    Berane: { lat: 42.8425, lng: 19.8733 },
    Kotor: { lat: 42.4247, lng: 18.7712 },
    Budva: { lat: 42.2911, lng: 18.84 },
  },
  XK: {
    Pristina: { lat: 42.6629, lng: 21.1655 },
    Gjilan: { lat: 42.4635, lng: 21.4694 },
    Prizren: { lat: 42.2153, lng: 20.7415 },
    Mitrovica: { lat: 42.8914, lng: 20.865 },
    Ferizaj: { lat: 42.3706, lng: 21.1553 },
    'Suva Reka': { lat: 42.3586, lng: 20.825 },
    Drenas: { lat: 42.6283, lng: 20.8939 },
    Peja: { lat: 42.6591, lng: 20.2883 },
  },
  LT: {
    Vilnius: { lat: 54.6872, lng: 25.2797 },
    Kaunas: { lat: 54.8985, lng: 23.9036 },
    Panevezys: { lat: 55.7348, lng: 24.3575 },
    Marijampole: { lat: 54.5599, lng: 23.3541 },
    Siauliai: { lat: 55.9349, lng: 23.3137 },
    Klaipeda: { lat: 55.7033, lng: 21.1443 },
    Gargzdai: { lat: 55.7128, lng: 21.3947 },
    Alytus: { lat: 54.3964, lng: 24.0414 },
  },
  LV: {
    Riga: { lat: 56.9496, lng: 24.1052 },
    Liepaja: { lat: 56.5047, lng: 21.0108 },
    Valmiera: { lat: 57.5385, lng: 25.4264 },
    Daugavpils: { lat: 55.8747, lng: 26.5362 },
    Jelgava: { lat: 56.6511, lng: 23.7214 },
    Tukums: { lat: 56.9669, lng: 23.1532 },
    Jurmala: { lat: 56.968, lng: 23.7704 },
    Ventspils: { lat: 57.3937, lng: 21.5647 },
  },
  EE: {
    Tallinn: { lat: 59.437, lng: 24.7536 },
    Tartu: { lat: 58.3776, lng: 26.729 },
    Narva: { lat: 59.3797, lng: 28.1791 },
    Paide: { lat: 58.8856, lng: 25.5572 },
    Parnu: { lat: 58.3859, lng: 24.4971 },
    Viljandi: { lat: 58.3639, lng: 25.59 },
    Kuressaare: { lat: 58.2528, lng: 22.4869 },
    'Kohtla-Jarve': { lat: 59.3986, lng: 27.2731 },
  },
}

export const EASTERN_EUROPE_CURATED: Record<string, EasternEuropeCountryClubs> = {
  PL: {
    country: 'Poland',
    tiers: {
      3: t('II Liga', [['Wieczysta Kraków', 'Krakow'], ['Polonia Bytom', 'Katowice'], ['Hutnik Kraków', 'Krakow'], ['Zagłębie Sosnowiec', 'Katowice']]),
      4: t('III Liga', [['Legia II Warsaw', 'Warsaw'], ['Lech II Poznań', 'Poznan'], ['Śląsk II Wrocław', 'Wroclaw'], ['Jagiellonia II Białystok', 'Bialystok']]),
      5: t('IV Liga', [['Ursus Warsaw', 'Warsaw'], ['Warta Gorzów', 'Poznan'], ['Górnik II Zabrze', 'Katowice'], ['Lublinianka', 'Lublin']]),
      6: t('Regional League', [['Wisła II Kraków', 'Krakow'], ['ŁKS II Łódź', 'Lodz'], ['Polonia Warsaw II', 'Warsaw'], ['Korona II Kielce', 'Kielce']]),
      7: t('District League', [['Krakow District XI', 'Krakow'], ['Warsaw District XI', 'Warsaw'], ['Gdansk District XI', 'Gdansk'], ['Wroclaw District XI', 'Wroclaw']]),
    },
  },
  RU: {
    country: 'Russia',
    tiers: {
      2: t('First League', [['Torpedo Moscow', 'Moscow'], ['Shinnik Yaroslavl', 'Yaroslavl'], ['Arsenal Tula', 'Moscow'], ['Rotor Volgograd', 'Rostov']]),
      3: t('Second League A', [['Zenit-2 Saint Petersburg', 'Saint Petersburg'], ['Krasnodar-2', 'Krasnodar'], ['Rubin-2 Kazan', 'Kazan'], ['Murom', 'Moscow']]),
      4: t('Second League B', [['Dynamo-2 Moscow', 'Moscow'], ['Spartak-2 Moscow', 'Moscow'], ['Krylia Sovetov-2', 'Samara'], ['Nizhny Novgorod-2', 'Nizhny Novgorod']]),
      5: t('Amateur Football League', [['Lokomotiv-M Moscow', 'Moscow'], ['SShOR Zenit', 'Saint Petersburg'], ['Kazan Amateur', 'Kazan'], ['Sochi Amateur', 'Sochi']]),
      6: t('Regional Championship', [['Moscow Regional XI', 'Moscow'], ['Krasnodar Regional XI', 'Krasnodar'], ['Samara Regional XI', 'Samara'], ['Dagestan Regional XI', 'Makhachkala']]),
      7: t('City League', [['Moscow City XI', 'Moscow'], ['Saint Petersburg City XI', 'Saint Petersburg'], ['Kazan City XI', 'Kazan'], ['Rostov City XI', 'Rostov']]),
    },
  },
  UA: {
    country: 'Ukraine',
    tiers: {
      1: t('Ukrainian Premier League', [['Dynamo Kyiv', 'Kyiv'], ['Shakhtar Donetsk', 'Donetsk'], ['Dnipro-1', 'Dnipro'], ['Zorya Luhansk', 'Kyiv']]),
      2: t('Persha Liha', [['Karpaty Lviv', 'Lviv'], ['Metalist Kharkiv', 'Kharkiv'], ['Chornomorets Odesa', 'Odesa'], ['Obolon Kyiv', 'Kyiv']]),
      3: t('Druha Liha', [['Nyva Ternopil', 'Ternopil'], ['Poltava', 'Poltava'], ['Uzhhorod', 'Uzhhorod'], ['Cherkashchyna', 'Cherkasy']]),
      4: t('Amateur Championship', [['Lokomotyv Kyiv', 'Kyiv'], ['Lviv Amateur', 'Lviv'], ['Dnipro Amateur', 'Dnipro'], ['Odesa Amateur', 'Odesa']]),
      5: t('Regional Championship', [['Kyiv Regional XI', 'Kyiv'], ['Kharkiv Regional XI', 'Kharkiv'], ['Poltava Regional XI', 'Poltava'], ['Lviv Regional XI', 'Lviv']]),
      6: t('Oblast League', [['Donetsk Oblast XI', 'Donetsk'], ['Dnipropetrovsk Oblast XI', 'Dnipro'], ['Odesa Oblast XI', 'Odesa'], ['Cherkasy Oblast XI', 'Cherkasy']]),
      7: t('City League', [['Kyiv City XI', 'Kyiv'], ['Lviv City XI', 'Lviv'], ['Kharkiv City XI', 'Kharkiv'], ['Odesa City XI', 'Odesa']]),
    },
  },
  CZ: {
    country: 'Czech Republic',
    tiers: {
      1: t('Czech First League', [['Sparta Prague', 'Prague'], ['Slavia Prague', 'Prague'], ['Viktoria Plzeň', 'Plzen'], ['Baník Ostrava', 'Ostrava']]),
      2: t('Czech National Football League', [['Sigma Olomouc B', 'Olomouc'], ['Zbrojovka Brno', 'Brno'], ['Teplice', 'Teplice'], ['Vyškov', 'Brno']]),
      3: t('Bohemian/Moravian Football League', [['Slovan Liberec', 'Liberec'], ['Slovácko', 'Uherske Hradiste'], ['Jablonec', 'Jablonec'], ['Dukla Prague', 'Prague']]),
      4: t('Divize', [['Bohemians Prague B', 'Prague'], ['Viktoria Plzeň B', 'Plzen'], ['Baník Ostrava B', 'Ostrava'], ['Sigma Olomouc B', 'Olomouc']]),
      5: t('Regional Championship', [['Prague Regional XI', 'Prague'], ['Brno Regional XI', 'Brno'], ['Ostrava Regional XI', 'Ostrava'], ['Liberec Regional XI', 'Liberec']]),
      6: t('Regional League', [['Plzen Regional XI', 'Plzen'], ['Teplice Regional XI', 'Teplice'], ['Olomouc Regional XI', 'Olomouc'], ['Jablonec Regional XI', 'Jablonec']]),
      7: t('District League', [['Prague District XI', 'Prague'], ['Brno District XI', 'Brno'], ['Ostrava District XI', 'Ostrava'], ['Olomouc District XI', 'Olomouc']]),
    },
  },
  RO: {
    country: 'Romania',
    tiers: {
      1: t('Liga I', [['FCSB', 'Bucharest'], ['CFR Cluj', 'Cluj-Napoca'], ['Universitatea Craiova', 'Craiova'], ['Farul Constanța', 'Constanta']]),
      2: t('Liga II', [['Dinamo București', 'Bucharest'], ['Rapid București', 'Bucharest'], ['UTA Arad', 'Arad'], ['FC Hermannstadt', 'Sibiu']]),
      3: t('Liga III', [['Petrolul Ploiești', 'Ploiesti'], ['Politehnica Iași', 'Iasi'], ['Politehnica Timișoara', 'Timisoara'], ['Steaua București', 'Bucharest']]),
      4: t('Liga IV', [['Cluj Regional XI', 'Cluj-Napoca'], ['Craiova Regional XI', 'Craiova'], ['Constanta Regional XI', 'Constanta'], ['Bucharest Regional XI', 'Bucharest']]),
      5: t('County League', [['Arad County XI', 'Arad'], ['Sibiu County XI', 'Sibiu'], ['Ploiesti County XI', 'Ploiesti'], ['Iasi County XI', 'Iasi']]),
      6: t('County Division Two', [['Timisoara County XI', 'Timisoara'], ['Bucharest District XI', 'Bucharest'], ['Cluj District XI', 'Cluj-Napoca'], ['Craiova District XI', 'Craiova']]),
      7: t('Local League', [['Bucharest Local XI', 'Bucharest'], ['Cluj Local XI', 'Cluj-Napoca'], ['Iasi Local XI', 'Iasi'], ['Timisoara Local XI', 'Timisoara']]),
    },
  },
  RS: {
    country: 'Serbia',
    tiers: {
      1: t('Serbian SuperLiga', [['Red Star Belgrade', 'Belgrade'], ['Partizan Belgrade', 'Belgrade'], ['Vojvodina', 'Novi Sad'], ['Čukarički', 'Belgrade']]),
      2: t('Serbian First League', [['TSC Bačka Topola', 'Backa Topola'], ['Radnički Niš', 'Nis'], ['Napredak Kruševac', 'Krusevac'], ['Novi Pazar', 'Novi Pazar']]),
      3: t('Serbian League', [['OFK Beograd', 'Belgrade'], ['Rad Belgrade', 'Belgrade'], ['Zemun', 'Belgrade'], ['Mladost Lučani', 'Lucani']]),
      4: t('Zone League', [['Novi Sad Regional XI', 'Novi Sad'], ['Subotica Regional XI', 'Subotica'], ['Nis Regional XI', 'Nis'], ['Belgrade Regional XI', 'Belgrade']]),
      5: t('Regional League', [['Krusevac Regional XI', 'Krusevac'], ['Lucani Regional XI', 'Lucani'], ['Backa Topola Regional XI', 'Backa Topola'], ['Novi Pazar Regional XI', 'Novi Pazar']]),
      6: t('District League', [['Belgrade District XI', 'Belgrade'], ['Novi Sad District XI', 'Novi Sad'], ['Nis District XI', 'Nis'], ['Subotica District XI', 'Subotica']]),
      7: t('Municipal League', [['Belgrade Local XI', 'Belgrade'], ['Novi Sad Local XI', 'Novi Sad'], ['Nis Local XI', 'Nis'], ['Krusevac Local XI', 'Krusevac']]),
    },
  },
  HR: {
    country: 'Croatia',
    tiers: {
      1: t('HNL', [['Dinamo Zagreb', 'Zagreb'], ['Hajduk Split', 'Split'], ['Rijeka', 'Rijeka'], ['Osijek', 'Osijek']]),
      2: t('First NL', [['Varaždin', 'Varazdin'], ['Istra 1961', 'Pula'], ['Slaven Belupo', 'Koprivnica'], ['Šibenik', 'Sibenik']]),
      3: t('Second NL', [['Cibalia', 'Osijek'], ['Rudeš', 'Zagreb'], ['Vukovar 1991', 'Osijek'], ['Croatia Zmijavci', 'Split']]),
      4: t('Third NL', [['Zagreb Regional XI', 'Zagreb'], ['Split Regional XI', 'Split'], ['Rijeka Regional XI', 'Rijeka'], ['Osijek Regional XI', 'Osijek']]),
      5: t('County First League', [['Varazdin County XI', 'Varazdin'], ['Pula County XI', 'Pula'], ['Koprivnica County XI', 'Koprivnica'], ['Sibenik County XI', 'Sibenik']]),
      6: t('County Second League', [['Zagreb County XI', 'Zagreb'], ['Split County XI', 'Split'], ['Rijeka County XI', 'Rijeka'], ['Osijek County XI', 'Osijek']]),
      7: t('Local League', [['Zagreb Local XI', 'Zagreb'], ['Split Local XI', 'Split'], ['Rijeka Local XI', 'Rijeka'], ['Osijek Local XI', 'Osijek']]),
    },
  },
  HU: {
    country: 'Hungary',
    tiers: {
      1: t('Nemzeti Bajnokság I', [['Ferencváros', 'Budapest'], ['Puskás Akadémia', 'Szekesfehervar'], ['Fehérvár FC', 'Szekesfehervar'], ['Debreceni VSC', 'Debrecen']]),
      2: t('Nemzeti Bajnokság II', [['MTK Budapest', 'Budapest'], ['Győri ETO', 'Gyor'], ['Budapest Honvéd', 'Budapest'], ['Kecskemét', 'Kecskemet']]),
      3: t('Nemzeti Bajnokság III', [['Paksi FC', 'Paks'], ['Kisvárda', 'Kisvarda'], ['Zalaegerszeg', 'Zalaegerszeg'], ['Újpest II', 'Budapest']]),
      4: t('Megye I', [['Budapest Regional XI', 'Budapest'], ['Debrecen Regional XI', 'Debrecen'], ['Gyor Regional XI', 'Gyor'], ['Kecskemet Regional XI', 'Kecskemet']]),
      5: t('Megye II', [['Szekesfehervar County XI', 'Szekesfehervar'], ['Paks County XI', 'Paks'], ['Kisvarda County XI', 'Kisvarda'], ['Zalaegerszeg County XI', 'Zalaegerszeg']]),
      6: t('Megye III', [['Budapest County XI', 'Budapest'], ['Debrecen County XI', 'Debrecen'], ['Gyor County XI', 'Gyor'], ['Kecskemet County XI', 'Kecskemet']]),
      7: t('Local League', [['Budapest Local XI', 'Budapest'], ['Debrecen Local XI', 'Debrecen'], ['Gyor Local XI', 'Gyor'], ['Paks Local XI', 'Paks']]),
    },
  },
  BG: {
    country: 'Bulgaria',
    tiers: {
      1: t('First Professional League', [['Ludogorets Razgrad', 'Razgrad'], ['CSKA Sofia', 'Sofia'], ['Levski Sofia', 'Sofia'], ['Botev Plovdiv', 'Plovdiv']]),
      2: t('Second Professional League', [['Cherno More Varna', 'Varna'], ['Beroe Stara Zagora', 'Stara Zagora'], ['Lokomotiv Plovdiv', 'Plovdiv'], ['Pirin Blagoevgrad', 'Blagoevgrad']]),
      3: t('Third League', [['Etar Veliko Tarnovo', 'Veliko Tarnovo'], ['Neftochimic Burgas', 'Burgas'], ['Spartak Varna', 'Varna'], ['Septemvri Sofia', 'Sofia']]),
      4: t('Regional Group', [['Sofia Regional XI', 'Sofia'], ['Plovdiv Regional XI', 'Plovdiv'], ['Razgrad Regional XI', 'Razgrad'], ['Varna Regional XI', 'Varna']]),
      5: t('Oblast Group', [['Burgas Regional XI', 'Burgas'], ['Stara Zagora Regional XI', 'Stara Zagora'], ['Blagoevgrad Regional XI', 'Blagoevgrad'], ['Veliko Tarnovo Regional XI', 'Veliko Tarnovo']]),
      6: t('District Group', [['Sofia District XI', 'Sofia'], ['Plovdiv District XI', 'Plovdiv'], ['Varna District XI', 'Varna'], ['Burgas District XI', 'Burgas']]),
      7: t('Local League', [['Sofia Local XI', 'Sofia'], ['Plovdiv Local XI', 'Plovdiv'], ['Varna Local XI', 'Varna'], ['Razgrad Local XI', 'Razgrad']]),
    },
  },
  SK: {
    country: 'Slovakia',
    tiers: {
      1: t('Niké Liga', [['Slovan Bratislava', 'Bratislava'], ['Spartak Trnava', 'Trnava'], ['MŠK Žilina', 'Zilina'], ['DAC Dunajská Streda', 'Dunajska Streda']]),
      2: t('2. Liga', [['MFK Ružomberok', 'Ruzomberok'], ['FC Košice', 'Kosice'], ['Dukla Banská Bystrica', 'Banska Bystrica'], ['AS Trenčín', 'Trencin']]),
      3: t('3. Liga', [['Inter Bratislava', 'Bratislava'], ['Petržalka', 'Bratislava'], ['Lokomotíva Košice', 'Kosice'], ['Tatran Prešov', 'Kosice']]),
      4: t('4. Liga', [['Bratislava Regional XI', 'Bratislava'], ['Trnava Regional XI', 'Trnava'], ['Zilina Regional XI', 'Zilina'], ['Kosice Regional XI', 'Kosice']]),
      5: t('5. Liga', [['Dunajska Streda Regional XI', 'Dunajska Streda'], ['Ruzomberok Regional XI', 'Ruzomberok'], ['Banska Bystrica Regional XI', 'Banska Bystrica'], ['Trencin Regional XI', 'Trencin']]),
      6: t('6. Liga', [['Bratislava District XI', 'Bratislava'], ['Trnava District XI', 'Trnava'], ['Zilina District XI', 'Zilina'], ['Kosice District XI', 'Kosice']]),
      7: t('7. Liga', [['Bratislava Local XI', 'Bratislava'], ['Trnava Local XI', 'Trnava'], ['Zilina Local XI', 'Zilina'], ['Kosice Local XI', 'Kosice']]),
    },
  },
  SI: {
    country: 'Slovenia',
    tiers: {
      1: t('PrvaLiga', [['Olimpija Ljubljana', 'Ljubljana'], ['Maribor', 'Maribor'], ['Celje', 'Celje'], ['Koper', 'Koper']]),
      2: t('2. SNL', [['Mura', 'Murska Sobota'], ['Domžale', 'Domzale'], ['Gorica', 'Nova Gorica'], ['Rudar Velenje', 'Velenje']]),
      3: t('3. SNL', [['Bravo', 'Ljubljana'], ['Ilirija 1911', 'Ljubljana'], ['Nafta Lendava', 'Murska Sobota'], ['Aluminij', 'Maribor']]),
      4: t('Regional League', [['Ljubljana Regional XI', 'Ljubljana'], ['Maribor Regional XI', 'Maribor'], ['Celje Regional XI', 'Celje'], ['Koper Regional XI', 'Koper']]),
      5: t('Intercommunal League', [['Murska Sobota Regional XI', 'Murska Sobota'], ['Domzale Regional XI', 'Domzale'], ['Nova Gorica Regional XI', 'Nova Gorica'], ['Velenje Regional XI', 'Velenje']]),
      6: t('Municipal League', [['Ljubljana District XI', 'Ljubljana'], ['Maribor District XI', 'Maribor'], ['Celje District XI', 'Celje'], ['Koper District XI', 'Koper']]),
      7: t('Local League', [['Ljubljana Local XI', 'Ljubljana'], ['Maribor Local XI', 'Maribor'], ['Celje Local XI', 'Celje'], ['Koper Local XI', 'Koper']]),
    },
  },
  BY: {
    country: 'Belarus',
    tiers: {
      1: t('Belarusian Premier League', [['BATE Borisov', 'Borisov'], ['Dinamo Minsk', 'Minsk'], ['Shakhtyor Soligorsk', 'Soligorsk'], ['Neman Grodno', 'Grodno']]),
      2: t('First League', [['Dinamo Brest', 'Brest'], ['Gomel', 'Gomel'], ['Vitebsk', 'Vitebsk'], ['Dnepr Mogilev', 'Mogilev']]),
      3: t('Second League', [['Minsk Regional XI', 'Minsk'], ['Borisov Regional XI', 'Borisov'], ['Brest Regional XI', 'Brest'], ['Gomel Regional XI', 'Gomel']]),
      4: t('Regional Championship', [['Grodno Regional XI', 'Grodno'], ['Soligorsk Regional XI', 'Soligorsk'], ['Vitebsk Regional XI', 'Vitebsk'], ['Mogilev Regional XI', 'Mogilev']]),
      5: t('Oblast League', [['Minsk Oblast XI', 'Minsk'], ['Brest Oblast XI', 'Brest'], ['Gomel Oblast XI', 'Gomel'], ['Grodno Oblast XI', 'Grodno']]),
      6: t('District League', [['Minsk District XI', 'Minsk'], ['Borisov District XI', 'Borisov'], ['Vitebsk District XI', 'Vitebsk'], ['Mogilev District XI', 'Mogilev']]),
      7: t('City League', [['Minsk City XI', 'Minsk'], ['Brest City XI', 'Brest'], ['Gomel City XI', 'Gomel'], ['Grodno City XI', 'Grodno']]),
    },
  },
  MD: {
    country: 'Moldova',
    tiers: {
      1: t('Super Liga', [['Sheriff Tiraspol', 'Tiraspol'], ['Zimbru Chișinău', 'Chisinau'], ['Milsami Orhei', 'Orhei'], ['Petrocub Hîncești', 'Hincesti']]),
      2: t('Liga 1', [['Dacia Buiucani', 'Chisinau'], ['FC Bălți', 'Balti'], ['Speranța Nisporeni', 'Chisinau'], ['Florești', 'Soroca']]),
      3: t('Liga 2', [['Cahul 2005', 'Cahul'], ['Comrat FC', 'Comrat'], ['Tiraspol Regional XI', 'Tiraspol'], ['Chisinau Regional XI', 'Chisinau']]),
      4: t('Regional League', [['Balti Regional XI', 'Balti'], ['Orhei Regional XI', 'Orhei'], ['Hincesti Regional XI', 'Hincesti'], ['Soroca Regional XI', 'Soroca']]),
      5: t('District League', [['Cahul Regional XI', 'Cahul'], ['Comrat Regional XI', 'Comrat'], ['Chisinau District XI', 'Chisinau'], ['Tiraspol District XI', 'Tiraspol']]),
      6: t('Municipal League', [['Chisinau Municipal XI', 'Chisinau'], ['Balti Municipal XI', 'Balti'], ['Orhei Municipal XI', 'Orhei'], ['Cahul Municipal XI', 'Cahul']]),
      7: t('Local League', [['Chisinau Local XI', 'Chisinau'], ['Tiraspol Local XI', 'Tiraspol'], ['Balti Local XI', 'Balti'], ['Orhei Local XI', 'Orhei']]),
    },
  },
  AL: {
    country: 'Albania',
    tiers: {
      1: t('Kategoria Superiore', [['KF Tirana', 'Tirana'], ['Partizani Tirana', 'Tirana'], ['Vllaznia Shkodër', 'Shkoder'], ['Teuta Durrës', 'Durres']]),
      2: t('Kategoria e Parë', [['Flamurtari Vlorë', 'Vlore'], ['Skënderbeu Korçë', 'Korce'], ['Elbasani', 'Elbasan'], ['Kukësi', 'Kukes']]),
      3: t('Kategoria e Dytë', [['Apolonia Fier', 'Fier'], ['Dinamo City', 'Tirana'], ['Bylis Ballsh', 'Fier'], ['Besëlidhja Lezhë', 'Shkoder']]),
      4: t('Kategoria e Tretë', [['Tirana Regional XI', 'Tirana'], ['Shkoder Regional XI', 'Shkoder'], ['Durres Regional XI', 'Durres'], ['Vlore Regional XI', 'Vlore']]),
      5: t('Regional Amateur League', [['Korce Regional XI', 'Korce'], ['Elbasan Regional XI', 'Elbasan'], ['Kukes Regional XI', 'Kukes'], ['Fier Regional XI', 'Fier']]),
      6: t('District League', [['Tirana District XI', 'Tirana'], ['Durres District XI', 'Durres'], ['Shkoder District XI', 'Shkoder'], ['Vlore District XI', 'Vlore']]),
      7: t('Local League', [['Tirana Local XI', 'Tirana'], ['Shkoder Local XI', 'Shkoder'], ['Durres Local XI', 'Durres'], ['Korce Local XI', 'Korce']]),
    },
  },
  BA: {
    country: 'Bosnia and Herzegovina',
    tiers: {
      1: t('Premier League', [['FK Sarajevo', 'Sarajevo'], ['Željezničar', 'Sarajevo'], ['Zrinjski Mostar', 'Mostar'], ['Borac Banja Luka', 'Banja Luka']]),
      2: t('First League', [['Sloboda Tuzla', 'Tuzla'], ['Čelik Zenica', 'Zenica'], ['Široki Brijeg', 'Siroki Brijeg'], ['Radnik Bijeljina', 'Bijeljina']]),
      3: t('Second League', [['Doboj Regional XI', 'Doboj'], ['Sarajevo Regional XI', 'Sarajevo'], ['Mostar Regional XI', 'Mostar'], ['Banja Luka Regional XI', 'Banja Luka']]),
      4: t('Cantonal League', [['Tuzla Regional XI', 'Tuzla'], ['Zenica Regional XI', 'Zenica'], ['Siroki Brijeg Regional XI', 'Siroki Brijeg'], ['Bijeljina Regional XI', 'Bijeljina']]),
      5: t('Regional League', [['Sarajevo Canton XI', 'Sarajevo'], ['Mostar Canton XI', 'Mostar'], ['Banja Luka District XI', 'Banja Luka'], ['Tuzla Canton XI', 'Tuzla']]),
      6: t('Municipal League', [['Sarajevo Municipal XI', 'Sarajevo'], ['Mostar Municipal XI', 'Mostar'], ['Zenica Municipal XI', 'Zenica'], ['Doboj Municipal XI', 'Doboj']]),
      7: t('Local League', [['Sarajevo Local XI', 'Sarajevo'], ['Banja Luka Local XI', 'Banja Luka'], ['Mostar Local XI', 'Mostar'], ['Tuzla Local XI', 'Tuzla']]),
    },
  },
  MK: {
    country: 'North Macedonia',
    tiers: {
      1: t('Macedonian First League', [['Shkëndija', 'Tetovo'], ['Vardar Skopje', 'Skopje'], ['Pelister', 'Bitola'], ['Akademija Pandev', 'Strumica']]),
      2: t('Macedonian Second League', [['Bregalnica Štip', 'Stip'], ['Pobeda Prilep', 'Prilep'], ['Rabotnički', 'Skopje'], ['Sileks', 'Kratovo']]),
      3: t('Third League', [['Kumanovo Regional XI', 'Kumanovo'], ['Ohrid Regional XI', 'Ohrid'], ['Skopje Regional XI', 'Skopje'], ['Tetovo Regional XI', 'Tetovo']]),
      4: t('Regional League', [['Bitola Regional XI', 'Bitola'], ['Strumica Regional XI', 'Strumica'], ['Stip Regional XI', 'Stip'], ['Prilep Regional XI', 'Prilep']]),
      5: t('Municipal League', [['Skopje Municipal XI', 'Skopje'], ['Tetovo Municipal XI', 'Tetovo'], ['Ohrid Municipal XI', 'Ohrid'], ['Kumanovo Municipal XI', 'Kumanovo']]),
      6: t('District League', [['Bitola District XI', 'Bitola'], ['Strumica District XI', 'Strumica'], ['Skopje District XI', 'Skopje'], ['Prilep District XI', 'Prilep']]),
      7: t('Local League', [['Skopje Local XI', 'Skopje'], ['Tetovo Local XI', 'Tetovo'], ['Bitola Local XI', 'Bitola'], ['Ohrid Local XI', 'Ohrid']]),
    },
  },
  ME: {
    country: 'Montenegro',
    tiers: {
      1: t('First League', [['Budućnost Podgorica', 'Podgorica'], ['Sutjeska Nikšić', 'Niksic'], ['Dečić', 'Tuzi'], ['Rudar Pljevlja', 'Pljevlja']]),
      2: t('Second League', [['Petrovac', 'Petrovac'], ['Bokelj Kotor', 'Kotor'], ['Berane', 'Berane'], ['Mornar Bar', 'Budva']]),
      3: t('Third League', [['Podgorica Regional XI', 'Podgorica'], ['Niksic Regional XI', 'Niksic'], ['Pljevlja Regional XI', 'Pljevlja'], ['Budva Regional XI', 'Budva']]),
      4: t('Regional League', [['Kotor Regional XI', 'Kotor'], ['Berane Regional XI', 'Berane'], ['Tuzi Regional XI', 'Tuzi'], ['Petrovac Regional XI', 'Petrovac']]),
      5: t('Municipal League', [['Podgorica Municipal XI', 'Podgorica'], ['Niksic Municipal XI', 'Niksic'], ['Budva Municipal XI', 'Budva'], ['Kotor Municipal XI', 'Kotor']]),
      6: t('District League', [['Pljevlja District XI', 'Pljevlja'], ['Berane District XI', 'Berane'], ['Tuzi District XI', 'Tuzi'], ['Petrovac District XI', 'Petrovac']]),
      7: t('Local League', [['Podgorica Local XI', 'Podgorica'], ['Niksic Local XI', 'Niksic'], ['Budva Local XI', 'Budva'], ['Kotor Local XI', 'Kotor']]),
    },
  },
  XK: {
    country: 'Kosovo',
    tiers: {
      1: t('Football Superleague of Kosovo', [['Ballkani', 'Suva Reka'], ['Drita', 'Gjilan'], ['Prishtina', 'Pristina'], ['Llapi', 'Pristina']]),
      2: t('First League', [['Prizreni', 'Prizren'], ['Trepça 89', 'Mitrovica'], ['Ferizaj', 'Ferizaj'], ['Drenica', 'Drenas']]),
      3: t('Second League', [['Peja Regional XI', 'Peja'], ['Pristina Regional XI', 'Pristina'], ['Gjilan Regional XI', 'Gjilan'], ['Prizren Regional XI', 'Prizren']]),
      4: t('Regional League', [['Mitrovica Regional XI', 'Mitrovica'], ['Ferizaj Regional XI', 'Ferizaj'], ['Drenas Regional XI', 'Drenas'], ['Suva Reka Regional XI', 'Suva Reka']]),
      5: t('Municipal League', [['Pristina Municipal XI', 'Pristina'], ['Gjilan Municipal XI', 'Gjilan'], ['Prizren Municipal XI', 'Prizren'], ['Peja Municipal XI', 'Peja']]),
      6: t('District League', [['Mitrovica District XI', 'Mitrovica'], ['Ferizaj District XI', 'Ferizaj'], ['Drenas District XI', 'Drenas'], ['Suva Reka District XI', 'Suva Reka']]),
      7: t('Local League', [['Pristina Local XI', 'Pristina'], ['Gjilan Local XI', 'Gjilan'], ['Prizren Local XI', 'Prizren'], ['Peja Local XI', 'Peja']]),
    },
  },
  LT: {
    country: 'Lithuania',
    tiers: {
      1: t('A Lyga', [['Žalgiris Vilnius', 'Vilnius'], ['Kauno Žalgiris', 'Kaunas'], ['Panevėžys', 'Panevezys'], ['Sūduva', 'Marijampole']]),
      2: t('I Lyga', [['Šiauliai', 'Siauliai'], ['Klaipėdos FM', 'Klaipeda'], ['Banga Gargždai', 'Gargzdai'], ['Dainava Alytus', 'Alytus']]),
      3: t('II Lyga', [['Vilnius Regional XI', 'Vilnius'], ['Kaunas Regional XI', 'Kaunas'], ['Panevezys Regional XI', 'Panevezys'], ['Marijampole Regional XI', 'Marijampole']]),
      4: t('III Lyga', [['Siauliai Regional XI', 'Siauliai'], ['Klaipeda Regional XI', 'Klaipeda'], ['Gargzdai Regional XI', 'Gargzdai'], ['Alytus Regional XI', 'Alytus']]),
      5: t('Regional League', [['Vilnius District XI', 'Vilnius'], ['Kaunas District XI', 'Kaunas'], ['Panevezys District XI', 'Panevezys'], ['Siauliai District XI', 'Siauliai']]),
      6: t('District League', [['Klaipeda District XI', 'Klaipeda'], ['Alytus District XI', 'Alytus'], ['Marijampole District XI', 'Marijampole'], ['Gargzdai District XI', 'Gargzdai']]),
      7: t('Local League', [['Vilnius Local XI', 'Vilnius'], ['Kaunas Local XI', 'Kaunas'], ['Klaipeda Local XI', 'Klaipeda'], ['Siauliai Local XI', 'Siauliai']]),
    },
  },
  LV: {
    country: 'Latvia',
    tiers: {
      1: t('Virslīga', [['Riga FC', 'Riga'], ['RFS', 'Riga'], ['Liepāja', 'Liepaja'], ['Valmiera FC', 'Valmiera']]),
      2: t('First League', [['BFC Daugavpils', 'Daugavpils'], ['Jelgava', 'Jelgava'], ['Tukums 2000', 'Tukums'], ['Metta', 'Riga']]),
      3: t('Second League', [['Jūrmala Regional XI', 'Jurmala'], ['Ventspils Regional XI', 'Ventspils'], ['Riga Regional XI', 'Riga'], ['Liepaja Regional XI', 'Liepaja']]),
      4: t('Third League', [['Valmiera Regional XI', 'Valmiera'], ['Daugavpils Regional XI', 'Daugavpils'], ['Jelgava Regional XI', 'Jelgava'], ['Tukums Regional XI', 'Tukums']]),
      5: t('Regional League', [['Riga District XI', 'Riga'], ['Liepaja District XI', 'Liepaja'], ['Valmiera District XI', 'Valmiera'], ['Daugavpils District XI', 'Daugavpils']]),
      6: t('District League', [['Jelgava District XI', 'Jelgava'], ['Tukums District XI', 'Tukums'], ['Jurmala District XI', 'Jurmala'], ['Ventspils District XI', 'Ventspils']]),
      7: t('Local League', [['Riga Local XI', 'Riga'], ['Liepaja Local XI', 'Liepaja'], ['Daugavpils Local XI', 'Daugavpils'], ['Valmiera Local XI', 'Valmiera']]),
    },
  },
  EE: {
    country: 'Estonia',
    tiers: {
      1: t('Meistriliiga', [['Flora Tallinn', 'Tallinn'], ['Levadia Tallinn', 'Tallinn'], ['Nõmme Kalju', 'Tallinn'], ['Paide Linnameeskond', 'Paide']]),
      2: t('Esiliiga', [['Tartu Tammeka', 'Tartu'], ['Narva Trans', 'Narva'], ['Pärnu JK Vaprus', 'Parnu'], ['Viljandi Tulevik', 'Viljandi']]),
      3: t('Esiliiga B', [['Kuressaare', 'Kuressaare'], ['Kohtla-Järve JK Järve', 'Kohtla-Jarve'], ['Tallinn Regional XI', 'Tallinn'], ['Tartu Regional XI', 'Tartu']]),
      4: t('II Liiga', [['Narva Regional XI', 'Narva'], ['Paide Regional XI', 'Paide'], ['Parnu Regional XI', 'Parnu'], ['Viljandi Regional XI', 'Viljandi']]),
      5: t('III Liiga', [['Kuressaare Regional XI', 'Kuressaare'], ['Kohtla-Jarve Regional XI', 'Kohtla-Jarve'], ['Tallinn District XI', 'Tallinn'], ['Tartu District XI', 'Tartu']]),
      6: t('IV Liiga', [['Narva District XI', 'Narva'], ['Paide District XI', 'Paide'], ['Parnu District XI', 'Parnu'], ['Viljandi District XI', 'Viljandi']]),
      7: t('Local League', [['Tallinn Local XI', 'Tallinn'], ['Tartu Local XI', 'Tartu'], ['Narva Local XI', 'Narva'], ['Parnu Local XI', 'Parnu']]),
    },
  },
}

export const EASTERN_EUROPE_CODES = new Set(Object.keys(EASTERN_EUROPE_CURATED))

export const EASTERN_EUROPE_PLACE_OVERRIDES: Record<string, Record<string, string>> = {}

for (const [countryCode, config] of Object.entries(EASTERN_EUROPE_CURATED)) {
  EASTERN_EUROPE_PLACE_OVERRIDES[countryCode] = {}
  for (const tier of Object.values(config.tiers)) {
    for (const club of tier.clubs) {
      EASTERN_EUROPE_PLACE_OVERRIDES[countryCode][club.name] = club.city
    }
  }
}

export function getEasternEuropeClubLocation(
  countryCode: string,
  clubName: string,
): { city: string; lat: number; lng: number } | null {
  const city = EASTERN_EUROPE_PLACE_OVERRIDES[countryCode]?.[clubName]
  if (!city) return null
  const coords = EASTERN_EUROPE_CITY_COORDS[countryCode]?.[city]
  if (!coords) return null
  return { city, lat: coords.lat, lng: coords.lng }
}
