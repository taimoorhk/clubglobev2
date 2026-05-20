/**
 * Curated Americas clubs by country and tier.
 *
 * RapidAPI/Fotmob coverage is thin below top divisions in the Americas, so this
 * file supplies tier 1-7 coverage with city-level coordinates.
 */

export type AmericasClubEntry = { name: string; city: string }
export type AmericasTierEntry = { leagueName: string; clubs: AmericasClubEntry[] }
export type AmericasCountryClubs = {
  country: string
  tiers: Record<number, AmericasTierEntry>
}
export type CityCoord = { lat: number; lng: number }

const t = (
  leagueName: string,
  clubs: [name: string, city: string][],
): AmericasTierEntry => ({
  leagueName,
  clubs: clubs.map(([name, city]) => ({ name, city })),
})

export const AMERICAS_CITY_COORDS: Record<string, Record<string, CityCoord>> = {
  US: {
    Miami: { lat: 25.7617, lng: -80.1918 },
    'Los Angeles': { lat: 34.0522, lng: -118.2437 },
    'New York': { lat: 40.7128, lng: -74.006 },
    Seattle: { lat: 47.6062, lng: -122.3321 },
    Atlanta: { lat: 33.749, lng: -84.388 },
    Boston: { lat: 42.3601, lng: -71.0589 },
    'Boca Raton': { lat: 26.3683, lng: -80.1289 },
    Louisville: { lat: 38.2527, lng: -85.7585 },
    Charleston: { lat: 32.7765, lng: -79.9311 },
    Sacramento: { lat: 38.5816, lng: -121.4944 },
    Phoenix: { lat: 33.4484, lng: -112.074 },
    Richmond: { lat: 37.5407, lng: -77.436 },
    Greenville: { lat: 34.8526, lng: -82.394 },
    Omaha: { lat: 41.2565, lng: -95.9345 },
    Madison: { lat: 43.0731, lng: -89.4012 },
    'Des Moines': { lat: 41.5868, lng: -93.625 },
    Flint: { lat: 43.0125, lng: -83.6875 },
    Ventura: { lat: 34.2805, lng: -119.2945 },
    Baltimore: { lat: 39.2904, lng: -76.6122 },
    Morristown: { lat: 40.7968, lng: -74.4815 },
    Tulsa: { lat: 36.154, lng: -95.9928 },
    Milwaukee: { lat: 43.0389, lng: -87.9065 },
    Minneapolis: { lat: 44.9778, lng: -93.265 },
    Cleveland: { lat: 41.4993, lng: -81.6944 },
    Boone: { lat: 36.2168, lng: -81.6746 },
    'San Francisco': { lat: 37.7749, lng: -122.4194 },
  },
  CA: {
    Hamilton: { lat: 43.2557, lng: -79.8711 },
    Calgary: { lat: 51.0447, lng: -114.0719 },
    Langford: { lat: 48.4496, lng: -123.5043 },
    Ottawa: { lat: 45.4215, lng: -75.6972 },
    Toronto: { lat: 43.6532, lng: -79.3832 },
    Halifax: { lat: 44.6488, lng: -63.5752 },
    Vaughan: { lat: 43.8563, lng: -79.5085 },
    Oakville: { lat: 43.4675, lng: -79.6877 },
    Mississauga: { lat: 43.589, lng: -79.6441 },
    Montreal: { lat: 45.5019, lng: -73.5674 },
    Blainville: { lat: 45.67, lng: -73.88 },
    Laval: { lat: 45.6066, lng: -73.7124 },
    Burnaby: { lat: 49.2488, lng: -122.9805 },
    Vancouver: { lat: 49.2827, lng: -123.1207 },
    Victoria: { lat: 48.4284, lng: -123.3656 },
    Winnipeg: { lat: 49.8951, lng: -97.1384 },
    Saskatoon: { lat: 52.1579, lng: -106.6702 },
    Regina: { lat: 50.4452, lng: -104.6189 },
  },
  MX: {
    'Mexico City': { lat: 19.4326, lng: -99.1332 },
    Guadalajara: { lat: 20.6597, lng: -103.3496 },
    Monterrey: { lat: 25.6866, lng: -100.3161 },
    Pachuca: { lat: 20.1011, lng: -98.7591 },
    Morelia: { lat: 19.7008, lng: -101.1844 },
    Celaya: { lat: 20.5222, lng: -100.812 },
    Oaxaca: { lat: 17.0732, lng: -96.7266 },
    Hermosillo: { lat: 29.0729, lng: -110.9559 },
    Cancun: { lat: 21.1619, lng: -86.8515 },
    'Playa del Carmen': { lat: 20.6296, lng: -87.0739 },
    Tampico: { lat: 22.2553, lng: -97.8686 },
    Zacatecas: { lat: 22.7709, lng: -102.5832 },
    Tepatitlan: { lat: 20.817, lng: -102.763 },
    Veracruz: { lat: 19.1738, lng: -96.1342 },
    Puebla: { lat: 19.0414, lng: -98.2063 },
  },
  BR: {
    Recife: { lat: -8.0476, lng: -34.877 },
    Belem: { lat: -1.4558, lng: -48.4902 },
    'Joao Pessoa': { lat: -7.1195, lng: -34.845 },
    Florianopolis: { lat: -27.5949, lng: -48.5482 },
    'Rio de Janeiro': { lat: -22.9068, lng: -43.1729 },
    Brasilia: { lat: -15.7939, lng: -47.8828 },
    Manaus: { lat: -3.119, lng: -60.0217 },
    Aracaju: { lat: -10.9472, lng: -37.0731 },
    'Sao Paulo': { lat: -23.5505, lng: -46.6333 },
    Fortaleza: { lat: -3.7319, lng: -38.5267 },
    Goiania: { lat: -16.6869, lng: -49.2648 },
    Curitiba: { lat: -25.4296, lng: -49.2713 },
  },
  AR: {
    'Buenos Aires': { lat: -34.6037, lng: -58.3816 },
    Avellaneda: { lat: -34.6625, lng: -58.3678 },
    'La Plata': { lat: -34.9214, lng: -57.9545 },
    Quilmes: { lat: -34.7203, lng: -58.2545 },
    Rosario: { lat: -32.9442, lng: -60.6505 },
    Cordoba: { lat: -31.4201, lng: -64.1888 },
    Salta: { lat: -24.7821, lng: -65.4232 },
    Tucuman: { lat: -26.8083, lng: -65.2176 },
    Rafaela: { lat: -31.2503, lng: -61.4867 },
    Mendoza: { lat: -32.8895, lng: -68.8458 },
    Tandil: { lat: -37.3217, lng: -59.1332 },
  },
  CL: {
    Santiago: { lat: -33.4489, lng: -70.6693 },
    Valparaiso: { lat: -33.0472, lng: -71.6127 },
    Talca: { lat: -35.4264, lng: -71.6554 },
    Temuco: { lat: -38.7359, lng: -72.5904 },
    Concepcion: { lat: -36.8201, lng: -73.0444 },
    Rancagua: { lat: -34.1708, lng: -70.7444 },
    'La Serena': { lat: -29.9027, lng: -71.2519 },
  },
  CO: {
    Bogota: { lat: 4.711, lng: -74.0721 },
    Medellin: { lat: 6.2442, lng: -75.5812 },
    Cali: { lat: 3.4516, lng: -76.532 },
    Barranquilla: { lat: 10.9685, lng: -74.7813 },
    Cartagena: { lat: 10.391, lng: -75.4794 },
    Cucuta: { lat: 7.8939, lng: -72.5078 },
    Neiva: { lat: 2.9345, lng: -75.2809 },
    Pereira: { lat: 4.8143, lng: -75.6946 },
    Bucaramanga: { lat: 7.1193, lng: -73.1227 },
    Manizales: { lat: 5.0703, lng: -75.5138 },
    Ibague: { lat: 4.4389, lng: -75.2322 },
  },
  PE: {
    Lima: { lat: -12.0464, lng: -77.0428 },
    Arequipa: { lat: -16.409, lng: -71.5375 },
    Cusco: { lat: -13.5319, lng: -71.9675 },
    Trujillo: { lat: -8.1116, lng: -79.0288 },
    Huanuco: { lat: -9.9306, lng: -76.2422 },
    Nazca: { lat: -14.8359, lng: -74.9328 },
    Huaral: { lat: -11.495, lng: -77.2078 },
    Chiclayo: { lat: -6.7714, lng: -79.8409 },
    Huancayo: { lat: -12.0651, lng: -75.2049 },
    Piura: { lat: -5.1945, lng: -80.6328 },
    Callao: { lat: -12.0566, lng: -77.1181 },
    Tarapoto: { lat: -6.4869, lng: -76.3597 },
  },
  UY: {
    Montevideo: { lat: -34.9011, lng: -56.1645 },
    'Las Piedras': { lat: -34.7264, lng: -56.2208 },
    Colonia: { lat: -34.4714, lng: -57.8442 },
    Paysandu: { lat: -32.3214, lng: -58.0756 },
    Maldonado: { lat: -34.9087, lng: -54.9583 },
    Melo: { lat: -32.3669, lng: -54.1839 },
  },
  EC: {
    Guayaquil: { lat: -2.1894, lng: -79.8891 },
    Quito: { lat: -0.1807, lng: -78.4678 },
    Sangolqui: { lat: -0.3341, lng: -78.4522 },
    Manta: { lat: -0.9677, lng: -80.7089 },
    Ambato: { lat: -1.2543, lng: -78.6229 },
    Cuenca: { lat: -2.9001, lng: -79.0059 },
    Machala: { lat: -3.2581, lng: -79.9554 },
  },
  VE: {
    Caracas: { lat: 10.4806, lng: -66.9036 },
    SanFelipe: { lat: 10.3399, lng: -68.7425 },
    SanCristobal: { lat: 7.7669, lng: -72.225 },
    Barinas: { lat: 8.6226, lng: -70.2075 },
    Merida: { lat: 8.5897, lng: -71.1561 },
    Valencia: { lat: 10.1579, lng: -67.9972 },
    Maracaibo: { lat: 10.6545, lng: -71.6372 },
    Maturin: { lat: 9.7457, lng: -63.1832 },
    'Puerto Ordaz': { lat: 8.2928, lng: -62.7344 },
    'Puerto La Cruz': { lat: 10.2138, lng: -64.6328 },
    Valera: { lat: 9.3178, lng: -70.6036 },
    Barquisimeto: { lat: 10.0678, lng: -69.3474 },
    Acarigua: { lat: 9.5597, lng: -69.2019 },
    'Puerto Cabello': { lat: 10.4731, lng: -68.0125 },
  },
  PY: {
    Asuncion: { lat: -25.2637, lng: -57.5759 },
    Luque: { lat: -25.2677, lng: -57.4872 },
    Capiata: { lat: -25.3552, lng: -57.4455 },
    Villarrica: { lat: -25.7500, lng: -56.4333 },
    'Ciudad del Este': { lat: -25.5167, lng: -54.6167 },
    Encarnacion: { lat: -27.3364, lng: -55.8667 },
    'San Lorenzo': { lat: -25.3397, lng: -57.5088 },
  },
  BO: {
    'La Paz': { lat: -16.4897, lng: -68.1193 },
    'Santa Cruz': { lat: -17.7833, lng: -63.1821 },
    Cochabamba: { lat: -17.3895, lng: -66.1568 },
    Sucre: { lat: -19.0196, lng: -65.2619 },
    Potosi: { lat: -19.5836, lng: -65.7531 },
    Oruro: { lat: -17.9647, lng: -67.106 },
    Tarija: { lat: -21.5355, lng: -64.7296 },
    Montero: { lat: -17.3423, lng: -63.2559 },
  },
  CR: {
    'San Jose': { lat: 9.9281, lng: -84.0907 },
    Alajuela: { lat: 10.0162, lng: -84.2116 },
    Heredia: { lat: 9.9981, lng: -84.117 },
    Cartago: { lat: 9.8644, lng: -83.9194 },
    Coronado: { lat: 9.9763, lng: -84.0066 },
    Belen: { lat: 9.9783, lng: -84.1881 },
    Sarchi: { lat: 10.088, lng: -84.3466 },
  },
  PA: {
    'Panama City': { lat: 8.9824, lng: -79.5199 },
    Colon: { lat: 9.3592, lng: -79.9014 },
    'La Chorrera': { lat: 8.8793, lng: -79.7829 },
    Penonome: { lat: 8.5189, lng: -80.3573 },
    David: { lat: 8.4273, lng: -82.4308 },
    Chitre: { lat: 7.9608, lng: -80.4294 },
  },
  GT: {
    'Guatemala City': { lat: 14.6349, lng: -90.5069 },
    Antigua: { lat: 14.5586, lng: -90.7295 },
    Quetzaltenango: { lat: 14.8347, lng: -91.5181 },
    Coban: { lat: 15.4708, lng: -90.3708 },
    Guastatoya: { lat: 14.855, lng: -90.0647 },
    Malacatan: { lat: 14.9113, lng: -92.0574 },
  },
  HN: {
    Tegucigalpa: { lat: 14.0723, lng: -87.1921 },
    'San Pedro Sula': { lat: 15.5042, lng: -88.025 },
    'La Ceiba': { lat: 15.7792, lng: -86.793 },
    'Puerto Cortes': { lat: 15.851, lng: -87.944 },
    Choloma: { lat: 15.6144, lng: -87.953 },
    Comayagua: { lat: 14.4514, lng: -87.6372 },
  },
  SV: {
    'San Salvador': { lat: 13.6929, lng: -89.2182 },
    'Santa Ana': { lat: 13.9942, lng: -89.5597 },
    'San Miguel': { lat: 13.4833, lng: -88.1833 },
    Usulutan: { lat: 13.3500, lng: -88.45 },
    Metapan: { lat: 14.3333, lng: -89.45 },
    Ahuachapan: { lat: 13.9214, lng: -89.845 },
  },
}

export const AMERICAS_CURATED: Record<string, AmericasCountryClubs> = {
  US: {
    country: 'United States',
    tiers: {
      1: t('Major League Soccer', [['Inter Miami CF', 'Miami'], ['LA Galaxy', 'Los Angeles'], ['Los Angeles FC', 'Los Angeles'], ['New York City FC', 'New York']]),
      2: t('USL Championship', [['Louisville City FC', 'Louisville'], ['Charleston Battery', 'Charleston'], ['Sacramento Republic FC', 'Sacramento'], ['Phoenix Rising FC', 'Phoenix']]),
      3: t('USL League One', [['Richmond Kickers', 'Richmond'], ['Greenville Triumph SC', 'Greenville'], ['Union Omaha', 'Omaha'], ['Forward Madison FC', 'Madison']]),
      4: t('USL League Two / NPSL', [['Des Moines Menace', 'Des Moines'], ['Flint City Bucks', 'Flint'], ['Ventura County Fusion', 'Ventura'], ['Ballard FC', 'Seattle']]),
      5: t('UPSL Premier Division', [['Maryland Bobcats FC', 'Baltimore'], ['Miami United FC', 'Miami'], ['FC Motown', 'Morristown'], ['Tulsa Athletic', 'Tulsa']]),
      6: t('Regional Elite Amateur Leagues', [['Milwaukee Bavarians', 'Milwaukee'], ['Minneapolis City SC', 'Minneapolis'], ['Cleveland SC', 'Cleveland'], ['Appalachian FC', 'Boone']]),
      7: t('Local Amateur Leagues', [['San Francisco City FC', 'San Francisco'], ['Boca Raton FC', 'Boca Raton'], ['Boston City FC', 'Boston'], ['FC Arizona', 'Phoenix']]),
    },
  },
  CA: {
    country: 'Canada',
    tiers: {
      1: t('Canadian Premier League', [['Forge FC', 'Hamilton'], ['Cavalry FC', 'Calgary'], ['Pacific FC', 'Langford'], ['Atlético Ottawa', 'Ottawa']]),
      2: t('League1 Ontario', [['Vaughan Azzurri', 'Vaughan'], ['Blue Devils FC', 'Oakville'], ['Sigma FC', 'Mississauga'], ['Alliance United FC', 'Toronto']]),
      3: t('Ligue1 Québec', [['CS Mont-Royal Outremont', 'Montreal'], ['AS Blainville', 'Blainville'], ['FC Laval', 'Laval'], ['Ottawa South United', 'Ottawa']]),
      4: t('League1 British Columbia', [['TSS Rovers', 'Burnaby'], ['Altitude FC', 'Vancouver'], ['Victoria Highlanders FC', 'Victoria'], ['Unity FC', 'Langford']]),
      5: t('Prairie and Provincial Premier Leagues', [['FC Manitoba', 'Winnipeg'], ['Calgary Foothills FC', 'Calgary'], ['Saskatoon Alliance', 'Saskatoon'], ['Queen City United', 'Regina']]),
      6: t('Provincial Division One', [['North Toronto Nitros', 'Toronto'], ['Surrey United SC', 'Vancouver'], ['Coquitlam Metro-Ford SC', 'Vancouver'], ['Halifax Dunbrack SC', 'Halifax']]),
      7: t('Local Senior Leagues', [['Scarborough GS United', 'Toronto'], ['Toronto Skillz FC', 'Toronto'], ['Ottawa Gloucester Hornets', 'Ottawa'], ['Burnaby Selects', 'Burnaby']]),
    },
  },
  MX: {
    country: 'Mexico',
    tiers: {
      1: t('Liga MX', [['Club América', 'Mexico City'], ['CD Guadalajara', 'Guadalajara'], ['Tigres UANL', 'Monterrey'], ['CF Monterrey', 'Monterrey']]),
      2: t('Liga de Expansión MX', [['Atlante FC', 'Cancun'], ['Atlético Morelia', 'Morelia'], ['Celaya FC', 'Celaya'], ['Alebrijes de Oaxaca', 'Oaxaca']]),
      3: t('Liga Premier Serie A', [['Tampico Madero FC', 'Tampico'], ['Mineros de Fresnillo', 'Zacatecas'], ['Leones Negros Premier', 'Guadalajara'], ['Cimarrones de Sonora', 'Hermosillo']]),
      4: t('Liga Premier Serie B', [['Aguacateros CDU', 'Morelia'], ['Huracanes Izcalli', 'Mexico City'], ['Ciervos FC', 'Mexico City'], ['CD Poza Rica', 'Veracruz']]),
      5: t('Liga TDP', [['Deportivo Dongu', 'Mexico City'], ['Faraones de Texcoco', 'Mexico City'], ['Club Hidalguense', 'Pachuca'], ['Guerreros de Puebla', 'Puebla']]),
      6: t('Tercera División Regional', [['Atlético ECCA', 'Guadalajara'], ['Inter Playa del Carmen', 'Playa del Carmen'], ['Tecos UAG', 'Guadalajara'], ['Real Zamora', 'Morelia']]),
      7: t('State Amateur Leagues', [['Veracruz Amateur', 'Veracruz'], ['Tepatitlán B', 'Tepatitlan'], ['Cancún FC Amateur', 'Cancun'], ['Puebla Amateur', 'Puebla']]),
    },
  },
  BR: {
    country: 'Brazil',
    tiers: {
      3: t('Campeonato Brasileiro Série C', [['Náutico', 'Recife'], ['Paysandu', 'Belem'], ['Botafogo PB', 'Joao Pessoa'], ['Figueirense', 'Florianopolis']]),
      4: t('Campeonato Brasileiro Série D', [['Portuguesa RJ', 'Rio de Janeiro'], ['Brasiliense', 'Brasilia'], ['Manaus FC', 'Manaus'], ['Sergipe', 'Aracaju']]),
      5: t('State First Divisions', [['Portuguesa', 'Sao Paulo'], ['Santa Cruz', 'Recife'], ['Ferroviário', 'Fortaleza'], ['Aparecidense', 'Goiania']]),
      6: t('State Second Divisions', [['Juventus SP', 'Sao Paulo'], ['Olaria', 'Rio de Janeiro'], ['Central SC', 'Recife'], ['Paraná Clube', 'Curitiba']]),
      7: t('Regional State Leagues', [['Nacional AM', 'Manaus'], ['São Caetano', 'Sao Paulo'], ['America RJ', 'Rio de Janeiro'], ['Itabaiana', 'Aracaju']]),
    },
  },
  AR: {
    country: 'Argentina',
    tiers: {
      1: t('Liga Profesional', [['Boca Juniors', 'Buenos Aires'], ['River Plate', 'Buenos Aires'], ['Racing Club', 'Avellaneda'], ['Independiente', 'Avellaneda']]),
      2: t('Primera Nacional', [['Quilmes', 'Quilmes'], ['Chacarita Juniors', 'Buenos Aires'], ['Ferro Carril Oeste', 'Buenos Aires'], ['Atlético Rafaela', 'Rafaela']]),
      3: t('Primera B Metropolitana / Federal A', [['Atlanta', 'Buenos Aires'], ['Talleres RE', 'Buenos Aires'], ['Central Norte', 'Salta'], ['Santamarina', 'Tandil']]),
      4: t('Primera C', [['Dock Sud', 'Avellaneda'], ['Excursionistas', 'Buenos Aires'], ['General Lamadrid', 'Buenos Aires'], ['Sportivo Italiano', 'Buenos Aires']]),
      5: t('Primera D / Regional Federal', [['Deportivo Paraguayo', 'Buenos Aires'], ['Centro Español', 'Buenos Aires'], ['Argentino de Rosario', 'Rosario'], ['Sportivo Barracas', 'Buenos Aires']]),
      6: t('Liga Regional Amateur', [['General Paz Juniors', 'Cordoba'], ['Ben Hur', 'Rafaela'], ['Gutiérrez SC', 'Mendoza'], ['Everton La Plata', 'La Plata']]),
      7: t('Local Departmental Leagues', [['Club Mercedes', 'Buenos Aires'], ['Argentino de Quilmes', 'Quilmes'], ['San Martín de Burzaco', 'Buenos Aires'], ['Atlético Tucumán II', 'Tucuman']]),
    },
  },
  CL: {
    country: 'Chile',
    tiers: {
      1: t('Primera División', [['Colo-Colo', 'Santiago'], ['Universidad de Chile', 'Santiago'], ['Universidad Católica', 'Santiago'], ['Unión Española', 'Santiago']]),
      2: t('Primera B', [['Santiago Wanderers', 'Valparaiso'], ['Deportes La Serena', 'La Serena'], ['Rangers de Talca', 'Talca'], ['Deportes Temuco', 'Temuco']]),
      3: t('Segunda División Profesional', [['Deportes Melipilla', 'Santiago'], ['San Antonio Unido', 'Valparaiso'], ['Deportes Rengo', 'Rancagua'], ['Arturo Fernández Vial', 'Concepcion']]),
      4: t('Tercera División A', [['Municipal Santiago', 'Santiago'], ['Deportes Colina', 'Santiago'], ['Lota Schwager', 'Concepcion'], ['Trasandino', 'Valparaiso']]),
      5: t('Tercera División B', [['Deportes Concepción', 'Concepcion'], ['Naval de Talcahuano', 'Concepcion'], ['Unión Compañías', 'La Serena'], ['Deportes Ovalle', 'La Serena']]),
      6: t('Regional Amateur Leagues', [['Iberia Los Ángeles', 'Concepcion'], ['Malleco Unido', 'Temuco'], ['Santiago City', 'Santiago'], ['Rancagua Sur', 'Rancagua']]),
      7: t('Local Amateur Leagues', [['Quilicura Unido', 'Santiago'], ['Chimbarongo FC', 'Rancagua'], ['Brujas de Salamanca', 'La Serena'], ['Concepción Amateur', 'Concepcion']]),
    },
  },
  CO: {
    country: 'Colombia',
    tiers: {
      1: t('Categoría Primera A', [['Atlético Nacional', 'Medellin'], ['Millonarios', 'Bogota'], ['América de Cali', 'Cali'], ['Junior FC', 'Barranquilla']]),
      2: t('Categoría Primera B', [['Deportes Quindío', 'Pereira'], ['Real Cartagena', 'Cartagena'], ['Cúcuta Deportivo', 'Cucuta'], ['Atlético Huila', 'Neiva']]),
      3: t('Primera C / Regional', [['Expreso Rojo', 'Bogota'], ['Deportivo Pereira B', 'Pereira'], ['Atlético Bucaramanga B', 'Bucaramanga'], ['Once Caldas B', 'Manizales']]),
      4: t('Liga Departamental', [['Bogotá FC', 'Bogota'], ['Leones FC', 'Medellin'], ['Tigres FC', 'Bogota'], ['Orsomarso SC', 'Cali']]),
      5: t('Primera C Departamental', [['Fortaleza CEIF B', 'Bogota'], ['Real Santander B', 'Bucaramanga'], ['Cortuluá B', 'Cali'], ['Tolima B', 'Ibague']]),
      6: t('Regional Amateur Leagues', [['La Equidad B', 'Bogota'], ['Academia FC', 'Bogota'], ['Estudiantes de Medellín', 'Medellin'], ['Atlético Cali', 'Cali']]),
      7: t('Municipal Amateur Leagues', [['Deportivo Manizales', 'Manizales'], ['Bogotá Amateur', 'Bogota'], ['Medellín Amateur', 'Medellin'], ['Cali Amateur', 'Cali']]),
    },
  },
  PE: {
    country: 'Peru',
    tiers: {
      1: t('Liga 1', [['Alianza Lima', 'Lima'], ['Universitario', 'Lima'], ['Sporting Cristal', 'Lima'], ['Melgar', 'Arequipa']]),
      2: t('Liga 2', [['Alianza Universidad', 'Huanuco'], ['Juan Aurich', 'Chiclayo'], ['Santos FC de Nazca', 'Nazca'], ['Comerciantes Unidos', 'Lima']]),
      3: t('Copa Perú - Departamental', [['Deportivo Coopsol', 'Lima'], ['Unión Huaral', 'Huaral'], ['Deportivo Llacuabamba', 'Trujillo'], ['Carlos Stein', 'Chiclayo']]),
      4: t('Copa Perú - Provincial', [['Sport Boys', 'Callao'], ['Cienciano', 'Cusco'], ['Sport Huancayo', 'Huancayo'], ['Atlético Grau', 'Piura']]),
      5: t('Copa Perú - District', [['Deportivo Municipal', 'Lima'], ['Unión Comercio', 'Tarapoto'], ['Ayacucho FC', 'Lima'], ['Alianza Atlético', 'Piura']]),
      6: t('Regional Amateur Leagues', [['Los Chankas', 'Cusco'], ['Pirata FC', 'Trujillo'], ['Carlos A. Mannucci', 'Trujillo'], ['UTC Cajamarca', 'Trujillo']]),
      7: t('Local Amateur Leagues', [['Deportivo Garcilaso', 'Cusco'], ['Sport Áncash', 'Lima'], ['Coronel Bolognesi', 'Lima'], ['José Gálvez FBC', 'Trujillo']]),
    },
  },
  UY: {
    country: 'Uruguay',
    tiers: {
      1: t('Primera División', [['Peñarol', 'Montevideo'], ['Nacional', 'Montevideo'], ['Defensor Sporting', 'Montevideo'], ['Danubio', 'Montevideo']]),
      2: t('Segunda División', [['Rampla Juniors', 'Montevideo'], ['Central Español', 'Montevideo'], ['Juventud de Las Piedras', 'Las Piedras'], ['Rentistas', 'Montevideo']]),
      3: t('Primera División Amateur', [['Bella Vista', 'Montevideo'], ['Basáñez', 'Montevideo'], ['Huracán Buceo', 'Montevideo'], ['Colón FC', 'Montevideo']]),
      4: t('Divisional D', [['Deportivo Colonia', 'Colonia'], ['Paysandú FC', 'Paysandu'], ['Maldonado FC', 'Maldonado'], ['Rivera Wanderers', 'Montevideo']]),
      5: t('Interior Regional Leagues', [['Atenas de San Carlos', 'Maldonado'], ['Cerro Largo Amateur', 'Melo'], ['Plaza Colonia B', 'Colonia'], ['Villa Teresa', 'Montevideo']]),
      6: t('Liga Departamental', [['Progreso B', 'Montevideo'], ['Miramar Misiones B', 'Montevideo'], ['Cerrito B', 'Montevideo'], ['Albion B', 'Montevideo']]),
      7: t('Local Amateur Leagues', [['Uruguay Montevideo B', 'Montevideo'], ['Montevideo Amateur', 'Montevideo'], ['Colonia Amateur', 'Colonia'], ['Paysandú Amateur', 'Paysandu']]),
    },
  },
  EC: {
    country: 'Ecuador',
    tiers: {
      1: t('Serie A', [['Barcelona SC', 'Guayaquil'], ['Emelec', 'Guayaquil'], ['LDU Quito', 'Quito'], ['Independiente del Valle', 'Sangolqui']]),
      2: t('Serie B', [['Manta FC', 'Manta'], ['Macará', 'Ambato'], ['Gualaceo SC', 'Cuenca'], ['9 de Octubre', 'Guayaquil']]),
      3: t('Segunda Categoría', [['Deportivo Quito', 'Quito'], ['LDU Portoviejo', 'Manta'], ['Olmedo', 'Quito'], ['Audaz Octubrino', 'Machala']]),
      4: t('Provincial Segunda Categoría', [['Espoli', 'Quito'], ['Juventud Italiana', 'Manta'], ['Patria', 'Guayaquil'], ['Panamá SC', 'Guayaquil']]),
      5: t('Regional Amateur Leagues', [['Delfín B', 'Manta'], ['Mushuc Runa B', 'Ambato'], ['Aucas B', 'Quito'], ['El Nacional B', 'Quito']]),
      6: t('Provincial Amateur', [['Guayaquil City B', 'Guayaquil'], ['América de Quito', 'Quito'], ['Cumbayá B', 'Quito'], ['Técnico Universitario B', 'Ambato']]),
      7: t('Local Amateur Leagues', [['Quito FC', 'Quito'], ['Guayaquil FC', 'Guayaquil'], ['Cuenca FC', 'Cuenca'], ['Machala FC', 'Machala']]),
    },
  },
  VE: {
    country: 'Venezuela',
    tiers: {
      1: t('Primera División', [['Caracas FC', 'Caracas'], ['Deportivo Táchira', 'SanCristobal'], ['Zamora FC', 'Barinas'], ['Estudiantes de Mérida', 'Merida']]),
      2: t('Segunda División', [['Atlético El Vigía', 'Merida'], ['Ureña SC', 'SanCristobal'], ['Marítimo de La Guaira', 'Caracas'], ['Yaracuyanos FC', 'SanFelipe']]),
      3: t('Tercera División', [['Mineros de Guayana', 'Puerto Ordaz'], ['Deportivo Anzoátegui', 'Puerto La Cruz'], ['Atlético Venezuela', 'Caracas'], ['Trujillanos FC', 'Valera']]),
      4: t('Regional Amateur Leagues', [['Deportivo Petare', 'Caracas'], ['Monagas SC B', 'Maturin'], ['Carabobo B', 'Valencia'], ['Zulia FC', 'Maracaibo']]),
      5: t('State Amateur Leagues', [['Hermanos Colmenárez B', 'Barinas'], ['Metropolitanos B', 'Caracas'], ['Deportivo Lara', 'Barquisimeto'], ['Portuguesa B', 'Acarigua']]),
      6: t('Municipal Amateur Leagues', [['Gran Valencia', 'Valencia'], ['Academia Puerto Cabello B', 'Puerto Cabello'], ['Caracas Amateur', 'Caracas'], ['Mérida Amateur', 'Merida']]),
      7: t('Local Amateur Leagues', [['Valencia Amateur', 'Valencia'], ['Maracaibo Amateur', 'Maracaibo'], ['Barinas Amateur', 'Barinas'], ['San Cristóbal Amateur', 'SanCristobal']]),
    },
  },
  PY: {
    country: 'Paraguay',
    tiers: {
      1: t('Primera División', [['Olimpia', 'Asuncion'], ['Cerro Porteño', 'Asuncion'], ['Libertad', 'Asuncion'], ['Guaraní', 'Asuncion']]),
      2: t('División Intermedia', [['Sportivo Luqueño', 'Luque'], ['Rubio Ñu', 'Asuncion'], ['Fernando de la Mora', 'Asuncion'], ['Resistencia SC', 'Asuncion']]),
      3: t('Primera B', [['Tacuary', 'Asuncion'], ['General Caballero ZC', 'Asuncion'], ['Martín Ledesma', 'Capiata'], ['Deportivo Recoleta', 'Asuncion']]),
      4: t('Primera C', [['Cristóbal Colón', 'Asuncion'], ['Atlántida SC', 'Asuncion'], ['Oriental', 'Asuncion'], ['Valois Rivarola', 'Asuncion']]),
      5: t('Unión del Fútbol del Interior', [['Guaireña FC', 'Villarrica'], ['3 de Febrero', 'Ciudad del Este'], ['Deportivo Itapuense', 'Encarnacion'], ['12 de Octubre', 'Asuncion']]),
      6: t('Regional Interior Leagues', [['Sport Colombia', 'Asuncion'], ['River Plate Asunción', 'Asuncion'], ['Capiatá FC', 'Capiata'], ['San Lorenzo Amateur', 'San Lorenzo']]),
      7: t('Local Amateur Leagues', [['Luque Amateur', 'Luque'], ['Encarnación Amateur', 'Encarnacion'], ['Asunción Amateur', 'Asuncion'], ['Capiatá Amateur', 'Capiata']]),
    },
  },
  BO: {
    country: 'Bolivia',
    tiers: {
      1: t('División Profesional', [['Bolívar', 'La Paz'], ['The Strongest', 'La Paz'], ['Oriente Petrolero', 'Santa Cruz'], ['Blooming', 'Santa Cruz']]),
      2: t('Copa Simón Bolívar', [['Universitario de Sucre', 'Sucre'], ['Real Potosí', 'Potosi'], ['San José', 'Oruro'], ['Wilstermann Cooperativas', 'Potosi']]),
      3: t('Primera A Departamental', [['Always Ready B', 'La Paz'], ['Real Santa Cruz B', 'Santa Cruz'], ['Aurora B', 'Cochabamba'], ['Nacional Potosí B', 'Potosi']]),
      4: t('Primera B Departamental', [['Destroyers', 'Santa Cruz'], ['Guabirá B', 'Montero'], ['Ciclón', 'Tarija'], ['Mariscal Braun', 'La Paz']]),
      5: t('Asociación Regional', [['Municipal Vinto B', 'Cochabamba'], ['Independiente Petrolero B', 'Sucre'], ['Universitario de Vinto B', 'Cochabamba'], ['Real Tomayapo B', 'Tarija']]),
      6: t('Provincial Amateur Leagues', [['La Paz FC', 'La Paz'], ['24 de Septiembre', 'Santa Cruz'], ['Deportivo FATIC', 'La Paz'], ['Oruro Royal', 'Oruro']]),
      7: t('Local Amateur Leagues', [['La Paz Amateur', 'La Paz'], ['Santa Cruz Amateur', 'Santa Cruz'], ['Cochabamba Amateur', 'Cochabamba'], ['Sucre Amateur', 'Sucre']]),
    },
  },
  CR: {
    country: 'Costa Rica',
    tiers: {
      1: t('Liga FPD', [['Deportivo Saprissa', 'San Jose'], ['LD Alajuelense', 'Alajuela'], ['CS Herediano', 'Heredia'], ['CS Cartaginés', 'Cartago']]),
      2: t('Liga de Ascenso', [['Uruguay de Coronado', 'Coronado'], ['Escorpiones de Belén', 'Belen'], ['AD Sarchí', 'Sarchi'], ['Consultants Moravia', 'San Jose']]),
      3: t('LINAFA Primera División', [['Aserrí FC', 'San Jose'], ['Municipal Turrialba', 'Cartago'], ['Puerto Golfito FC', 'San Jose'], ['AD Carmelita', 'Alajuela']]),
      4: t('LINAFA Segunda División', [['Municipal Santa Ana', 'San Jose'], ['Cariari Pococí', 'San Jose'], ['San José FC', 'San Jose'], ['Limón Black Star', 'San Jose']]),
      5: t('Regional Amateur Leagues', [['Alajuela Junior', 'Alajuela'], ['Heredia Amateur', 'Heredia'], ['Cartago Amateur', 'Cartago'], ['Sarchí Amateur', 'Sarchi']]),
      6: t('Provincial Amateur Leagues', [['San Jose Provincial', 'San Jose'], ['Alajuela Provincial', 'Alajuela'], ['Heredia Provincial', 'Heredia'], ['Cartago Provincial', 'Cartago']]),
      7: t('Local Amateur Leagues', [['San Jose Local', 'San Jose'], ['Belen Local', 'Belen'], ['Coronado Local', 'Coronado'], ['Sarchi Local', 'Sarchi']]),
    },
  },
  PA: {
    country: 'Panama',
    tiers: {
      1: t('Liga Panameña de Fútbol', [['Tauro FC', 'Panama City'], ['CD Plaza Amador', 'Panama City'], ['Árabe Unido', 'Colon'], ['San Francisco FC', 'La Chorrera']]),
      2: t('Liga Prom', [['CA Independiente B', 'La Chorrera'], ['Sporting San Miguelito B', 'Panama City'], ['Alianza FC B', 'Panama City'], ['Universitario B', 'Penonome']]),
      3: t('Tercera División', [['Panamá City FC', 'Panama City'], ['Colón C-3', 'Colon'], ['Atlético Chiriquí', 'David'], ['Herrera FC B', 'Chitre']]),
      4: t('Regional Amateur Leagues', [['Costa del Este B', 'Panama City'], ['Potros del Este B', 'Panama City'], ['San Francisco B', 'La Chorrera'], ['Tauro B', 'Panama City']]),
      5: t('Provincial Amateur Leagues', [['Panama Oeste FC', 'La Chorrera'], ['Chiriquí Amateur', 'David'], ['Colón Amateur', 'Colon'], ['Herrera Amateur', 'Chitre']]),
      6: t('Municipal Amateur Leagues', [['La Chorrera Local', 'La Chorrera'], ['Penonomé Local', 'Penonome'], ['David Local', 'David'], ['Colón Local', 'Colon']]),
      7: t('Local Amateur Leagues', [['Panama City Local', 'Panama City'], ['Chitré Local', 'Chitre'], ['San Miguelito Local', 'Panama City'], ['Arraiján Local', 'Panama City']]),
    },
  },
  GT: {
    country: 'Guatemala',
    tiers: {
      1: t('Liga Nacional', [['CSD Municipal', 'Guatemala City'], ['Comunicaciones FC', 'Guatemala City'], ['Antigua GFC', 'Antigua'], ['Xelajú MC', 'Quetzaltenango']]),
      2: t('Primera División', [['Cobán Imperial', 'Coban'], ['Guastatoya', 'Guastatoya'], ['Deportivo Malacateco', 'Malacatan'], ['Sacachispas', 'Guatemala City']]),
      3: t('Segunda División', [['Universidad SC', 'Guatemala City'], ['Deportivo Petapa', 'Guatemala City'], ['Aurora FC', 'Guatemala City'], ['Mictlán', 'Guatemala City']]),
      4: t('Tercera División', [['Jalapa FC', 'Guatemala City'], ['Suchitepéquez', 'Guatemala City'], ['Marquense', 'Quetzaltenango'], ['Coatepeque FC', 'Quetzaltenango']]),
      5: t('Regional Amateur Leagues', [['Antigua B', 'Antigua'], ['Xelajú B', 'Quetzaltenango'], ['Coban B', 'Coban'], ['Guastatoya B', 'Guastatoya']]),
      6: t('Departmental Amateur Leagues', [['Guatemala City Amateur', 'Guatemala City'], ['Quetzaltenango Amateur', 'Quetzaltenango'], ['Coban Amateur', 'Coban'], ['Antigua Amateur', 'Antigua']]),
      7: t('Local Amateur Leagues', [['Municipal B', 'Guatemala City'], ['Comunicaciones B', 'Guatemala City'], ['Malacateco B', 'Malacatan'], ['Guatemala Local', 'Guatemala City']]),
    },
  },
  HN: {
    country: 'Honduras',
    tiers: {
      1: t('Liga Nacional', [['CD Olimpia', 'Tegucigalpa'], ['FC Motagua', 'Tegucigalpa'], ['Real España', 'San Pedro Sula'], ['CD Marathón', 'San Pedro Sula']]),
      2: t('Liga de Ascenso', [['CD Victoria', 'La Ceiba'], ['CD Vida', 'La Ceiba'], ['Platense FC', 'Puerto Cortes'], ['Parrillas One', 'San Pedro Sula']]),
      3: t('Liga Mayor', [['Honduras Progreso', 'San Pedro Sula'], ['Lone FC', 'San Pedro Sula'], ['Juticalpa FC', 'Tegucigalpa'], ['Deportes Savio', 'Tegucigalpa']]),
      4: t('Regional Amateur Leagues', [['Real Juventud', 'San Pedro Sula'], ['Social Sol', 'La Ceiba'], ['Atlético Choloma', 'Choloma'], ['Comayagua FC', 'Comayagua']]),
      5: t('Departmental Amateur Leagues', [['Tegucigalpa Amateur', 'Tegucigalpa'], ['San Pedro Amateur', 'San Pedro Sula'], ['La Ceiba Amateur', 'La Ceiba'], ['Choloma Amateur', 'Choloma']]),
      6: t('Municipal Amateur Leagues', [['Olimpia B', 'Tegucigalpa'], ['Motagua B', 'Tegucigalpa'], ['Real España B', 'San Pedro Sula'], ['Marathón B', 'San Pedro Sula']]),
      7: t('Local Amateur Leagues', [['Comayagua Local', 'Comayagua'], ['Puerto Cortes Local', 'Puerto Cortes'], ['La Ceiba Local', 'La Ceiba'], ['Tegucigalpa Local', 'Tegucigalpa']]),
    },
  },
  SV: {
    country: 'El Salvador',
    tiers: {
      1: t('Primera División', [['Alianza FC', 'San Salvador'], ['CD FAS', 'Santa Ana'], ['CD Águila', 'San Miguel'], ['Luis Ángel Firpo', 'Usulutan']]),
      2: t('Segunda División', [['Isidro Metapán', 'Metapan'], ['Once Deportivo', 'Ahuachapan'], ['Municipal Limeño', 'San Miguel'], ['Chalatenango', 'San Salvador']]),
      3: t('Tercera División', [['Atlético Marte', 'San Salvador'], ['Santa Tecla FC', 'San Salvador'], ['Sonsonate FC', 'Santa Ana'], ['Juventud Independiente', 'San Salvador']]),
      4: t('Regional Amateur Leagues', [['Alianza B', 'San Salvador'], ['FAS B', 'Santa Ana'], ['Águila B', 'San Miguel'], ['Firpo B', 'Usulutan']]),
      5: t('Departmental Amateur Leagues', [['San Salvador Amateur', 'San Salvador'], ['Santa Ana Amateur', 'Santa Ana'], ['San Miguel Amateur', 'San Miguel'], ['Usulután Amateur', 'Usulutan']]),
      6: t('Municipal Amateur Leagues', [['Metapán Amateur', 'Metapan'], ['Ahuachapán Amateur', 'Ahuachapan'], ['Santa Tecla Amateur', 'San Salvador'], ['Chalatenango Amateur', 'San Salvador']]),
      7: t('Local Amateur Leagues', [['San Salvador Local', 'San Salvador'], ['Santa Ana Local', 'Santa Ana'], ['San Miguel Local', 'San Miguel'], ['Usulután Local', 'Usulutan']]),
    },
  },
}

export const AMERICAS_CODES = new Set(Object.keys(AMERICAS_CURATED))

export const AMERICAS_PLACE_OVERRIDES: Record<string, Record<string, string>> = {}

for (const [countryCode, config] of Object.entries(AMERICAS_CURATED)) {
  AMERICAS_PLACE_OVERRIDES[countryCode] = {}
  for (const tier of Object.values(config.tiers)) {
    for (const club of tier.clubs) {
      AMERICAS_PLACE_OVERRIDES[countryCode][club.name] = club.city
    }
  }
}

export function getAmericasClubLocation(
  countryCode: string,
  clubName: string,
): { city: string; lat: number; lng: number } | null {
  const city = AMERICAS_PLACE_OVERRIDES[countryCode]?.[clubName]
  if (!city) return null
  const coords = AMERICAS_CITY_COORDS[countryCode]?.[city]
  if (!coords) return null
  return { city, lat: coords.lat, lng: coords.lng }
}
