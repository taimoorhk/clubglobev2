/**
 * Curated African clubs by country and tier (names only; coords from geocoder).
 * Tier 2–7 filled where national pyramids exist in public records.
 */

export type AfricaTierEntry = {
  leagueName: string
  clubs: string[]
}

export type AfricaCountryClubs = {
  country: string
  tiers: Record<number, AfricaTierEntry>
}

export const AFRICA_CURATED: Record<string, AfricaCountryClubs> = {
  KE: {
    country: 'Kenya',
    tiers: {
      1: {
        leagueName: 'FKF Premier League',
        clubs: [
          'Gor Mahia', 'AFC Leopards', 'Tusker', 'Bandari', 'KCB', 'Ulinzi Stars',
          'Kakamega Homeboyz', 'Posta Rangers', 'Nairobi United', 'Police FC',
          'Shabana', 'Mathare United', 'Kenya Commercial Bank', 'Bidco United',
        ],
      },
      2: {
        leagueName: 'National Super League',
        clubs: [
          'Nairobi City Stars', 'Darajani Gogo', 'Fortune Sacco', 'Migori Youth',
          'Modern Coast Rangers', 'Mulembe United', 'Naivas', 'SamWest Blackboots',
        ],
      },
    },
  },
  SN: {
    country: 'Senegal',
    tiers: {
      1: {
        leagueName: 'Ligue 1',
        clubs: [
          'Diambars', 'Casa Sport', 'Génération Foot', 'Teungueth', 'Jaraaf',
          'Pikine', 'Stade de Mbour', 'Sonacos', 'AS Camberene', 'Goree',
          'AJEL', 'Ouakam', 'HLM', 'ASC HLM',
        ],
      },
      2: {
        leagueName: 'Ligue 2',
        clubs: [
          'Dakar Sacré Coeur', 'Niary Tally', 'US Gorée B', 'Mbour Panache',
        ],
      },
    },
  },
  CI: {
    country: 'Ivory Coast',
    tiers: {
      1: {
        leagueName: 'Ligue 1',
        clubs: [
          'ASEC Mimosas', 'Africa Sports', 'Stella Abidjan', 'SOA', 'Racing d\'Abidjan',
          'AFAD', 'Bouaké FC', 'Stade d\'Abidjan', 'San Pedro', 'Tanda',
          'WAC', 'SOL', 'Korhogo', 'Zoman',
        ],
      },
    },
  },
  CM: {
    country: 'Cameroon',
    tiers: {
      1: {
        leagueName: 'Elite One',
        clubs: [
          'Coton Sport', 'Canon Yaoundé', 'Tonnerre Kalara', 'Union Douala',
          'Bamboutos', 'PWD Bamenda', 'Aigle Royal', 'Fovu Baham', 'Eding Sport',
          'Yafoot', 'Renaissance Ngoumou', 'UMS de Loum', 'Avion Nkam', 'Stade de Bertoua',
        ],
      },
      2: {
        leagueName: 'Elite Two',
        clubs: [
          'APEJES Academy', 'Dynamo Douala', 'Feutche', 'Pantheres',
        ],
      },
    },
  },
  UG: {
    country: 'Uganda',
    tiers: {
      1: {
        leagueName: 'Premier League',
        clubs: [
          'KCCA', 'Vipers SC', 'Express FC', 'URA', 'Bul FC', 'Onduparaka',
          'Maroons', 'Police FC', 'Bright Stars', 'UPDF', 'Buhimba', 'Lugazi',
        ],
      },
    },
  },
  ZM: {
    country: 'Zambia',
    tiers: {
      1: {
        leagueName: 'Super League',
        clubs: [
          'ZESCO United', 'Power Dynamos', 'Nkwazi', 'Zanaco', 'Green Buffaloes',
          'NAPSA Stars', 'Red Arrows', 'Green Eagles', 'Nkana', 'Konkola Blades',
          'Mutondo Stars', 'Man Utd Zambia', 'Prison Leopards', 'Forest Rangers',
        ],
      },
    },
  },
  ZW: {
    country: 'Zimbabwe',
    tiers: {
      1: {
        leagueName: 'Premier Soccer League',
        clubs: [
          'Dynamos', 'Highlanders', 'CAPS United', 'Chicken Inn', 'FC Platinum',
          'Triangle United', 'Manica Diamonds', 'Herentals', 'Ngezi Platinum',
          'Bulawayo Chiefs', 'Yadah', 'TelOne', 'Scotland', 'Platinum Warriors',
        ],
      },
    },
  },
  TZ: {
    country: 'Tanzania',
    tiers: {
      1: {
        leagueName: 'Premier League',
        clubs: [
          'Young Africans', 'Simba SC', 'Azam FC', 'Coastal Union', 'Namungo',
          'Kagera Sugar', 'Geita Gold', 'Dodoma Jiji', 'Polisi Tanzania', 'Mtibwa Sugar',
          'Ihefu', 'Mashujaa', 'Ruvu Shooting', 'Tabora United',
        ],
      },
    },
  },
  ET: {
    country: 'Ethiopia',
    tiers: {
      1: {
        leagueName: 'Premier League',
        clubs: [
          'Saint George', 'Ethiopia Bunna', 'Fasil Kenema', 'Hawassa City',
          'Sidama Bunna', 'Dire Dawa City', 'Welwalo Adigrat', 'Bahir Dar Kenema',
          'Shire Endaselassie', 'Hadiya Hossana', 'Wolkite City', 'Arba Minch Kenema',
        ],
      },
    },
  },
  AO: {
    country: 'Angola',
    tiers: {
      1: {
        leagueName: 'Girabola',
        clubs: [
          'Petro de Luanda', 'Primeiro de Agosto', 'Sagrada Esperança', '1º de Maio',
          'Interclube', 'Recreativo do Libolo', 'Bravos do Maquis', 'Wiliete',
          'Académica do Lobito', 'Sporting de Cabinda', 'G.D. Soyo', 'Ferroviário Huila',
        ],
      },
    },
  },
  MZ: {
    country: 'Mozambique',
    tiers: {
      1: {
        leagueName: 'Moçambola',
        clubs: [
          'Costa do Sol', 'Liga Muçulmana', 'Ferroviário Maputo', 'Desportivo Maputo',
          'Nampula', 'Ferroviário Nampula', 'Textáfrica', 'Vilankulo', 'Palmeiras',
          'Chibuto', 'Ferroviário de Lichinga', 'Desportivo Nacala',
        ],
      },
    },
  },
  BW: {
    country: 'Botswana',
    tiers: {
      1: {
        leagueName: 'Premier League',
        clubs: [
          'Township Rollers', 'Gaborone United', 'Orapa United', 'Jwaneng Galaxy',
          'Security Systems', 'Police XI', 'Extension Gunners', 'BDF XI',
          'Morupule Wanderers', 'TAFIC', 'Nico United', 'Miscellaneous',
        ],
      },
    },
  },
  NA: {
    country: 'Namibia',
    tiers: {
      1: {
        leagueName: 'Premier League',
        clubs: [
          'African Stars', 'Black Africa', 'Blue Waters', 'Citizens', 'Life Fighters',
          'Mighty Gunners', 'Orlando Pirates', 'Tigers', 'Young Brazilians',
          'Chief Santos', 'Civics', 'Eleven Arrows', 'Okahandja United',
        ],
      },
    },
  },
  ML: {
    country: 'Mali',
    tiers: {
      1: {
        leagueName: 'Première Division',
        clubs: [
          'Djoliba', 'Stade Malien', 'Real Bamako', 'Onze Créateurs', 'AS Bamako',
          'USFAS', 'AS Police', 'AS Korofina', 'COB', 'Yeelen', 'AS Bakaridjan',
          'AS Salima', 'Stade Olympique', 'ASCE',
        ],
      },
    },
  },
  BF: {
    country: 'Burkina Faso',
    tiers: {
      1: {
        leagueName: 'Premier League',
        clubs: [
          'ASFA Yennenga', 'Rahimo', 'Salitas', 'SONABEL', 'Racing Ouagadougou',
          'AJEB', 'RC Bobo', 'RC Kadiogo', 'USFA', 'Majestic', 'CFFEB', 'ASFB',
        ],
      },
    },
  },
  GA: {
    country: 'Gabon',
    tiers: {
      1: {
        leagueName: 'Championnat National D1',
        clubs: [
          'FC 105 Libreville', 'AS Mangasport', 'CF Mounana', 'US Bitam',
          'Stade Mandji', 'Vantour Mangoro', 'Akanda FC', 'Panthères',
        ],
      },
    },
  },
  CG: {
    country: 'Congo',
    tiers: {
      1: {
        leagueName: 'Ligue 1',
        clubs: [
          'Vita Club', 'Diables Noirs', 'CARA Brazzaville', 'Inter Club',
          'Étoile du Congo', 'Oyo Sports', 'JS Talangaï', 'Patronage Sainte-Anne',
        ],
      },
    },
  },
  CD: {
    country: 'DR Congo',
    tiers: {
      1: {
        leagueName: 'Ligue 1',
        clubs: [
          'TP Mazembe', 'AS Vita Club', 'DC Motema Pembe', 'Saint-Luc', 'Sanga Balende',
          'Manika', 'MK Etancheité', 'Rangers', 'Bukavu Dawa', 'Don Bosco',
        ],
      },
      2: {
        leagueName: 'Ligue 2',
        clubs: [
          'JSK', 'Saint-Georges', 'Tanganyika', 'Maniema Union',
        ],
      },
    },
  },
  RW: {
    country: 'Rwanda',
    tiers: {
      1: {
        leagueName: 'Premier League',
        clubs: [
          'APR', 'Rayon Sports', 'Police', 'Kiyovu', 'Amagaju', 'Marines',
          'Mukura', 'Gasogi United', 'Rutsiro', 'Bugesera', 'Gorilla', 'Sunrise',
        ],
      },
    },
  },
  BI: {
    country: 'Burundi',
    tiers: {
      1: {
        leagueName: 'Primus League',
        clubs: [
          'Vital\'O', 'Prince Louis', 'Inter Star', 'Athletico Olympic', 'Muzinga',
          'Ngozi City', 'Flambeau du Centre', 'Rukinzo', 'Bujumbura City',
        ],
      },
    },
  },
  LY: {
    country: 'Libya',
    tiers: {
      1: {
        leagueName: 'Premier League',
        clubs: [
          'Al Ahli Tripoli', 'Al-Ittihad', 'Al Nasr', 'Al Ahly Benghazi',
          'Al Hilal', 'Al Akhdar', 'Al Madina', 'Asswehly', 'Al Tahaddi',
        ],
      },
    },
  },
  SD: {
    country: 'Sudan',
    tiers: {
      1: {
        leagueName: 'Premier League',
        clubs: [
          'Al Hilal', 'Al Merrikh', 'Al Mourada', 'Al Ahly Shendi', 'Hay Al Arab',
          'Alamal Atbara', 'Al-Hilal Omdurman', 'Al Merreikh Omdurman',
        ],
      },
    },
  },
  GN: {
    country: 'Guinea',
    tiers: {
      1: {
        leagueName: 'Ligue 1 Pro',
        clubs: [
          'Horoya', 'Hafia', 'AS Kaloum', 'Renaissance', 'Wakirya', 'Ashanti GB',
          'Satellite', 'Renaissance de Conakry', 'Fello Star', 'CI Kamsar',
        ],
      },
    },
  },
  BJ: {
    country: 'Benin',
    tiers: {
      1: {
        leagueName: 'Ligue 1',
        clubs: [
          'Coton Sport Ouidah', 'ASPAC', 'Buffles', 'Dragons', 'Dynamo Abomey',
          'Energie', 'JSP', 'Mogas 90', 'Requins', 'Tonnerre',
        ],
      },
    },
  },
  TG: {
    country: 'Togo',
    tiers: {
      1: {
        leagueName: 'Championnat National',
        clubs: [
          'ASKO Kara', 'Maranatha', 'Semassi', 'Dynamic Togolais', 'Anges',
          'Gomido', 'Togo-Port', 'Unisport', 'Agaza', 'Binah',
        ],
      },
    },
  },
  NE: {
    country: 'Niger',
    tiers: {
      1: {
        leagueName: 'Super Ligue',
        clubs: [
          'Sahel', 'AS FAN', 'AS GNN', 'AS Police', 'AS SONIDEP', 'Jangorzo',
          'Nigelec', 'Urana', 'USGN', 'Zumunta AC',
        ],
      },
    },
  },
  MW: {
    country: 'Malawi',
    tiers: {
      1: {
        leagueName: 'Super League',
        clubs: [
          'Big Bullets', 'Silver Strikers', 'Moyale Barracks', 'Be Forward Wanderers',
          'Blue Eagles', 'Mighty Tigers', 'Civo United', 'MAFCO', 'Ekwendeni Hammers',
        ],
      },
    },
  },
  LS: {
    country: 'Lesotho',
    tiers: {
      1: {
        leagueName: 'Premier League',
        clubs: [
          'Matlama', 'Lioli', 'LCS', 'Bantu', 'LMPS', 'Manonyane', 'Lijabatho',
          'Likhopo', 'Machokha', 'Mazenod Swallows',
        ],
      },
    },
  },
  SZ: {
    country: 'Eswatini',
    tiers: {
      1: {
        leagueName: 'Premier League',
        clubs: [
          'Royal Leopards', 'Mbabane Swallows', 'Young Buffaloes', 'Green Mamba',
          'Manzini Wanderers', 'Highlanders', 'Rangers FC', 'Tabankulu',
        ],
      },
    },
  },
  MG: {
    country: 'Madagascar',
    tiers: {
      1: {
        leagueName: 'THB Champions League',
        clubs: [
          'CNaPS Sport', 'Fosa Juniors', 'Ajesaia', 'AS Adema', 'AS Fortior',
          'COSFAP', 'Elgeco Plus', 'Fomela', 'Tana Formation',
        ],
      },
    },
  },
  MU: {
    country: 'Mauritius',
    tiers: {
      1: {
        leagueName: 'Premier League',
        clubs: [
          'Curepipe Starlight', 'Pamplemousses', 'AS Port-Louis 2000', 'Entente Boulet Rouge',
          'Petite Rivière Noire', 'Savanne SC', 'Beau Bassin-Rose Hill',
        ],
      },
    },
  },
  SC: {
    country: 'Seychelles',
    tiers: {
      1: {
        leagueName: 'Premier League',
        clubs: [
          'Anse Réunion', 'Côte d\'Or', 'Foresters', 'La Passe', 'Lightstars',
          'Northern Dynamo', 'St Michel United', 'St Louis Suns United',
        ],
      },
    },
  },
  GM: {
    country: 'Gambia',
    tiers: {
      1: {
        leagueName: 'GFF League First Division',
        clubs: [
          'Fortune', 'GPA', 'Hawks', 'Real de Banjul', 'Marimoo', 'Brikama United',
          'Gamtel', 'Interior', 'Samger', 'Wallidan',
        ],
      },
    },
  },
  GW: {
    country: 'Guinea-Bissau',
    tiers: {
      1: {
        leagueName: 'Campeonato Nacional',
        clubs: [
          'Sport Bissau e Benfica', 'Académica', 'Porto de Bissau', 'Benfica Bissau',
          'Canhabaque', 'Estrela Negra', 'FC Cuntum', 'SC Bissau',
        ],
      },
    },
  },
  CV: {
    country: 'Cape Verde',
    tiers: {
      1: {
        leagueName: 'Campeonato Nacional',
        clubs: [
          'Mindelense', 'Sporting Praia', 'Académica Praia', 'Boavista Praia',
          'Derby', 'Onze Unidos', 'Paulense', 'Sal-Rei',
        ],
      },
    },
  },
  ST: {
    country: 'São Tomé and Príncipe',
    tiers: {
      1: {
        leagueName: 'Campeonato Nacional',
        clubs: [
          '6 de Setembro', 'Agro-Sport', 'Folha Verde', 'Guadalupe', 'Neves',
          'Santana', 'Sporting Praia Cruz', 'UDRA',
        ],
      },
    },
  },
  GQ: {
    country: 'Equatorial Guinea',
    tiers: {
      1: {
        leagueName: 'Primera División',
        clubs: [
          'Deportivo Mongomo', 'Sony Elá Nguema', 'Atlético Semu', 'Renacimiento',
          'C.D. Elá Nguema', 'Futuro Kings', 'Akonangui', 'Pan African',
        ],
      },
    },
  },
  TD: {
    country: 'Chad',
    tiers: {
      1: {
        leagueName: 'Premier League',
        clubs: [
          'Foullah Edifice', 'Gazelle', 'Renaissance', 'Tourbillon', 'CotonTchad',
          'Elect Sport', 'AS PSI', 'Renaissance du Tchad',
        ],
      },
    },
  },
  MR: {
    country: 'Mauritania',
    tiers: {
      1: {
        leagueName: 'Premier League',
        clubs: [
          'ASC Kédia', 'Chemal', 'Concorde', 'Garde Nationale', 'Gendrim',
          'Nouakchott Kings', 'SNIM', 'Tevragh-Zeina',
        ],
      },
    },
  },
  LR: {
    country: 'Liberia',
    tiers: {
      1: {
        leagueName: 'First Division',
        clubs: [
          'LPRA Oilers', 'Watanga', 'BEA Mountain', 'Fassell', 'Invincible Eleven',
          'Jubilee', 'LISCR', 'Mighty Barrolle', 'Nimba United',
        ],
      },
    },
  },
  SL: {
    country: 'Sierra Leone',
    tiers: {
      1: {
        leagueName: 'Premier League',
        clubs: [
          'East End Lions', 'Mighty Blackpool', 'Kallon', 'Diamond Stars',
          'Anti Drugs Strikers', 'Bo Rangers', 'Ports Authority', 'Wusum Stars',
        ],
      },
    },
  },
  SS: {
    country: 'South Sudan',
    tiers: {
      1: {
        leagueName: 'Premier League',
        clubs: [
          'Al-Hilal Juba', 'Atlabara', 'Juba FC', 'Kator', 'Munuki', 'Salam',
        ],
      },
    },
  },
  CF: {
    country: 'Central African Republic',
    tiers: {
      1: {
        leagueName: 'Championnat National',
        clubs: [
          'Olympic Real', 'Tempête Mocaf', 'Diplomates', 'Fatima', 'ZDR',
        ],
      },
    },
  },
  SO: {
    country: 'Somalia',
    tiers: {
      1: {
        leagueName: 'Somali First Division',
        clubs: [
          'Elman', 'Hamar Young', 'Heegan', 'Horseed', 'Mogadishu City',
        ],
      },
    },
  },
  DJ: {
    country: 'Djibouti',
    tiers: {
      1: {
        leagueName: 'Division One',
        clubs: [
          'AS Port', 'Arta Solar', 'Gendarmerie', 'GR', 'Port de Djibouti',
        ],
      },
    },
  },
  ER: {
    country: 'Eritrea',
    tiers: {
      1: {
        leagueName: 'Premier League',
        clubs: [
          'Red Sea', 'Denden', 'Ettehad', 'Hintsa', 'Mekelake', 'Semhar',
        ],
      },
    },
  },
  KM: {
    country: 'Comoros',
    tiers: {
      1: {
        leagueName: 'Premier League',
        clubs: [
          'Coin Nord', 'Elan d\'Azito', 'Fomboni', 'Komorozine', 'Ngaya',
        ],
      },
    },
  },
  // Egypt pyramid (tiers 2–4 curated; tier 1 from RapidAPI)
  EG: {
    country: 'Egypt',
    tiers: {
      2: {
        leagueName: 'Egyptian Second Division',
        clubs: [
          'Al Masry', 'Suez SC', 'El Entag El Harby', 'Tanta', 'El Daklyeh',
          'Al-Sekka', 'El Mansoura', 'El Dakhleya', 'El Gouna', 'Aswan',
        ],
      },
      3: {
        leagueName: 'Egyptian Third Division',
        clubs: [
          'El Qanah', 'El Sawahel', 'El Shams', 'El Tersana', 'El Tora',
          'Beni Suef', 'Damietta', 'Sohag', 'Minya', 'Qena',
        ],
      },
      4: {
        leagueName: 'Egyptian Fourth Division',
        clubs: [
          'Al Qanater', 'El Obour', 'El Shorta', 'El Teram', 'El Walideya',
          'Giza SC', 'Helwan', 'Ismailia Railway', 'Luxor', 'Mallawi',
        ],
      },
      5: {
        leagueName: 'Egyptian Fifth Division',
        clubs: [
          'Abu Qir', 'Al Hamoul', 'Al Maragha', 'Al Nasr Cairo', 'Al Olympi',
          'Al Salam', 'Al Zawia', 'Asmant Asyut', 'Banha', 'Bani Ebid',
        ],
      },
      6: {
        leagueName: 'Egyptian Regional League A',
        clubs: [
          'Al Borolos', 'Al Farafra', 'Al Husseiniya', 'Al Malek', 'Al Nasr Sohag',
          'Al Qusiya', 'Al Riyadh', 'Al Sekka Al Hadid', 'Al Tadamon', 'Al Wahda',
        ],
      },
      7: {
        leagueName: 'Egyptian Regional League B',
        clubs: [
          'Al Adwa', 'Al Badari', 'Al Fashn', 'Al Gharbia', 'Al Ibrahimiya',
          'Al Kharga', 'Al Manzala', 'Al Matareya', 'Al Minufiya', 'Al Qusair',
        ],
      },
    },
  },
  // South Africa pyramid extension (tier 1 from RapidAPI)
  ZA: {
    country: 'South Africa',
    tiers: {
      2: {
        leagueName: 'National First Division',
        clubs: [
          'Cape Town Spurs', 'University of Pretoria', 'Casric Stars', 'Hungry Lions',
          'Gomora United', 'Pretoria Callies', 'Venda FA', 'Richards Bay',
        ],
      },
      3: {
        leagueName: 'SAFA Second Division',
        clubs: [
          'Black Leopards', 'JDR Stars', 'Milford FC', 'Upington City',
          'Baroka FC', 'Highlands Park', 'Jomo Cosmos', 'Lamontville Golden Arrows',
        ],
      },
      4: {
        leagueName: 'SAFA Regional League',
        clubs: [
          'Ajax Cape Town', 'Bidvest Wits', 'Bloemfontein Celtic', 'Free State Stars',
          'Maritzburg United', 'Moroka Swallows', 'Platinum Stars', 'Polokwane City',
        ],
      },
      5: {
        leagueName: 'SAFA LFA Premier',
        clubs: [
          'AmaZulu Development', 'Cape Umoya United', 'Durban Stars', 'Ezemvelo',
          'Garankuwa United', 'Hellenic FC', 'Ikapa Sporting', 'Leopards United',
        ],
      },
      6: {
        leagueName: 'SAFA LFA Division 1',
        clubs: [
          'African Wanderers', 'Batau FC', 'Blackburn Rovers', 'Dynamos Giyani',
          'Ladysmith Celtic', 'Magesi FC', 'Mthatha Bucks', 'Orlando Pirates B',
        ],
      },
      7: {
        leagueName: 'SAFA LFA Division 2',
        clubs: [
          'Academy FC', 'Bush Bucks', 'Cape Town All Stars', 'Dikwena',
          'Eastern Gables', 'Giyani United', 'Hazyview Comrades', 'Ikwezi United',
        ],
      },
    },
  },
  NG: {
    country: 'Nigeria',
    tiers: {
      2: {
        leagueName: 'Nigeria National League',
        clubs: [
          'Rivers United', 'Wikki Tourists', 'Plateau United', 'Katsina United',
          'Nasarawa United', 'Shooting Stars', 'Bendel Insurance', 'Rangers International',
        ],
      },
    },
  },
  MA: {
    country: 'Morocco',
    tiers: {
      2: {
        leagueName: 'Botola 2',
        clubs: [
          'UTS Rabat', 'KAC Kenitra', 'Racing de Casablanca', 'Wydad Fès',
          'Chabab Atlas', 'Ittihad Khemisset', 'Mouloudia Oujda', 'Stade Marocain',
        ],
      },
    },
  },
  GH: {
    country: 'Ghana',
    tiers: {
      2: {
        leagueName: 'Division One League',
        clubs: [
          'Accra Lions', 'Bibiani Gold Stars', 'Berekum Arsenal', 'Ebusua Dwarfs',
          'Heart of Lions', 'Legon Cities', 'Medeama', 'Nations FC',
        ],
      },
    },
  },
  DZ: {
    country: 'Algeria',
    tiers: {
      2: {
        leagueName: 'Ligue 2',
        clubs: [
          'USM Annaba', 'CA Batna', 'CR Belouizdad', 'JS Kabylie', 'MC Oran',
          'MO Béjaïa', 'Paradou AC', 'USM Alger',
        ],
      },
    },
  },
  TN: {
    country: 'Tunisia',
    tiers: {
      2: {
        leagueName: 'Ligue 2',
        clubs: [
          'AS Gabès', 'CA Bizertin', 'ES Métlaoui', 'JS Kairouan', 'Stade Tunisien',
          'US Monastir', 'Olympique Béja', 'Avenir Sportif',
        ],
      },
    },
  },
}
