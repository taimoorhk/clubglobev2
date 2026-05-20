/**
 * Curated Asian clubs by country and tier (names only; coords from geocoder).
 * Tier 2–7 filled where national pyramids exist in public records.
 */

export type AsiaTierEntry = {
  leagueName: string
  clubs: string[]
}

export type AsiaCountryClubs = {
  country: string
  tiers: Record<number, AsiaTierEntry>
}

export const ASIA_CURATED: Record<string, AsiaCountryClubs> = {
  JP: {
    country: 'Japan',
    tiers: {
      1: {
        leagueName: 'J1 League',
        clubs: [
          'Vissel Kobe', 'Yokohama F. Marinos', 'Urawa Red Diamonds', 'Kashima Antlers',
          'Gamba Osaka', 'Cerezo Osaka', 'Kawasaki Frontale', 'FC Tokyo', 'Sanfrecce Hiroshima',
          'Nagoya Grampus', 'Kyoto Sanga', 'Albirex Niigata', 'Avispa Fukuoka', 'Shonan Bellmare',
          'Tokyo Verdy', 'Kashiwa Reysol', 'Machida Zelvia', 'Shimizu S-Pulse',
        ],
      },
      2: {
        leagueName: 'J2 League',
        clubs: [
          'Ventforet Kofu', 'Jubilo Iwata', 'Consadole Sapporo', 'Montedio Yamagata',
          'Vegalta Sendai', 'Roasso Kumamoto', 'Oita Trinita', 'Tokushima Vortis',
          'Renofa Yamaguchi', 'FC Imabari', 'Fagiano Okayama', 'Ehime FC', 'Fujieda MYFC',
          'Iwaki FC', 'Blaublitz Akita', 'V-Varen Nagasaki',
        ],
      },
      3: {
        leagueName: 'J3 League',
        clubs: [
          'Matsumoto Yamaga', 'FC Gifu', 'Nara Club', 'Gainare Tottori', 'Tegevajaro Miyazaki',
          'Azul Claro Numazu', 'FC Ryukyu', 'Vanraure Hachinohe', 'Fukushima United',
          'SC Sagamihara', 'Kataller Toyama', 'Thespa Gunma', 'Giravanz Kitakyushu',
          'Zweigen Kanazawa', 'Kochi United', 'AC Nagano Parceiro',
        ],
      },
      4: {
        leagueName: 'Japan Football League',
        clubs: [
          'Honda FC', 'FC Osaka', 'Suzuka Point Getters', 'Reinmeer Aomori',
          'Nippon Steel Yawata SC', 'FC Tiamo Hirakata', 'Veertien Mie', 'Okinawa SV',
          'FC Maruyasu Okazaki', 'Porvenir Asuka', 'Biwako Shiga', 'Kochi United SC',
          'Yokogawa Musashino', 'Honda Lock', 'Maruyasu Industries', 'Tonan Maebashi',
        ],
      },
      5: {
        leagueName: 'Regional Champions League (Kanto)',
        clubs: [
          'Honda Suzuka', 'YSCC Yokohama', 'Tochigi City', 'Tochigi Uva FC',
          'Nippon Sport Science University', 'Tokyo Musashino City', 'Tiamo Hirakata',
          'FC Tiamo Hirakata', 'Sagamihara', 'Machida Zelvia', 'Yokohama Flügels',
          'Kawasaki Frontale', 'Omiya Ardija', 'Urawa Reds', 'Kashiwa Reysol',
        ],
      },
      6: {
        leagueName: 'Hokkaido Soccer League',
        clubs: [
          'Northerlies Hokkaido', 'Sapporo FC', 'Hokkaido Consadole Sapporo', 'Hakodate FC',
          'Otaru FC', 'Asahikawa FC', 'Kushiro FC', 'Obihiro FC', 'Tomakomai FC',
          'Muroran FC', 'Iwamizawa FC', 'Kitami FC', 'Abashiri FC', 'Wakkanai FC',
        ],
      },
      7: {
        leagueName: 'Tohoku Soccer League',
        clubs: [
          'Vegalta Sendai', 'Montedio Yamagata', 'Fukushima United', 'Iwaki FC',
          'Blaublitz Akita', 'Vanraure Hachinohe', 'Grulla Morioka', 'Reinmeer Aomori',
          'Morioka Zebra', 'Sendai University', 'Yamagata Tendo', 'Akita FC',
          'Koriyama FC', 'Miyagi FC', 'Fukushima FC', 'Iwate FC',
        ],
      },
    },
  },
  KR: {
    country: 'South Korea',
    tiers: {
      1: {
        leagueName: 'K League 1',
        clubs: [
          'Ulsan HD', 'Jeonbuk Hyundai Motors', 'Pohang Steelers', 'FC Seoul',
          'Suwon Samsung Bluewings', 'Daegu FC', 'Incheon United', 'Jeju United',
          'Gangwon FC', 'Hwangseong FC', 'Daejeon Hana Citizen', 'Gwangju FC',
          'FC Anyang', 'Gimcheon Sangmu',
        ],
      },
      2: {
        leagueName: 'K League 2',
        clubs: [
          'Busan IPark', 'Seoul E-Land', 'Suwon FC', 'Chungnam Asan',
          'Gyeongnam FC', 'Bucheon FC 1995', 'Cheonan City', 'Seongnam FC',
          'Ansan Greeners', 'Gimpo FC', 'Cheongju FC', 'Jeonnam Dragons',
          'Hwaseong FC', 'Gimcheon Sangmu', 'Changwon City FC', 'Siheung Citizen',
        ],
      },
      3: {
        leagueName: 'K3 League',
        clubs: [
          'FC Mokpo', 'Chuncheon FC', 'Pocheon FC', 'Yangpyeong FC',
          'Gyeongju KHNP', 'Changwon City FC', 'Ulsan Citizen', 'Daejeon Korail',
          'Siheung Citizen', 'Gyeongju Citizen', 'Gimhae FC', 'Gyeongnam Changwon',
          'Paju Citizen', 'Goyang Zaicro', 'Gangneung Citizen', 'Jeonbuk Hyundai Motors II',
        ],
      },
      4: {
        leagueName: 'K4 League',
        clubs: [
          'Seoul Jungnang', 'Seoul Nowon', 'Incheon Korail', 'Gyeonggi Goyang',
          'Gyeongnam Geochang', 'Busan Transportation', 'Daegu Korail', 'Gwangju Gwangsan',
          'Jeonnam Mokpo', 'Chungbuk Cheongju', 'Chungnam Asan Citizen', 'Gangwon Chuncheon',
          'Gyeongbuk Gyeongju', 'Jeju United II', 'Seoul Woori', 'Suwon City FC',
        ],
      },
      5: {
        leagueName: 'K5 League (Seoul)',
        clubs: [
          'Seoul Jungnang FC', 'Seoul Nowon United', 'Seoul Gangbuk', 'Seoul Gangdong',
          'Seoul Gangseo', 'Seoul Gwanak', 'Seoul Gwangjin', 'Seoul Mapo',
          'Seoul Seodaemun', 'Seoul Seongdong', 'Seoul Songpa', 'Seoul Yangcheon',
          'Seoul Yeongdeungpo', 'Seoul Yongsan', 'Seoul Eunpyeong', 'Seoul Dobong',
        ],
      },
      6: {
        leagueName: 'K5 League (Gyeonggi)',
        clubs: [
          'Goyang FC', 'Suwon City', 'Ansan FC', 'Bucheon FC',
          'Seongnam FC', 'Yongin FC', 'Pyeongtaek FC', 'Hwaseong FC',
          'Siheung FC', 'Gimpo FC', 'Paju FC', 'Guri FC',
          'Namyangju FC', 'Uijeongbu FC', 'Gwangmyeong FC', 'Anyang FC',
        ],
      },
      7: {
        leagueName: 'K5 League (Busan)',
        clubs: [
          'Busan Transportation', 'Busan Jung-gu', 'Busan Dong-gu', 'Busan Seo-gu',
          'Busan Nam-gu', 'Busan Buk-gu', 'Busan Haeundae', 'Busan Saha',
          'Busan Sasang', 'Busan Yeonje', 'Busan Yeongdo', 'Busan Gijang',
          'Busan Geumjeong', 'Busan Gangseo', 'Busan Suyeong', 'Busan Dongnae',
        ],
      },
    },
  },
  CN: {
    country: 'China',
    tiers: {
      1: {
        leagueName: 'Chinese Super League',
        clubs: [
          'Shanghai Port', 'Shanghai Shenhua', 'Beijing Guoan', 'Shandong Taishan',
          'Chengdu Rongcheng', 'Wuhan Three Towns', 'Tianjin Jinmen Tiger', 'Zhejiang FC',
          'Henan Songshan Longmen', 'Changchun Yatai', 'Qingdao Hainiu', 'Shenzhen Peng City',
          'Meizhou Hakka', 'Nantong Zhiyun', 'Cangzhou Mighty Lions', 'Qingdao West Coast',
        ],
      },
      2: {
        leagueName: 'China League One',
        clubs: [
          'Dalian Yingbo', 'Guangzhou FC', 'Chongqing Tonglianglong', 'Suzhou Dongwu',
          'Nanjing City', 'Shaanxi Union', 'Qingdao Red Lions', 'Dandong Tengyue',
          'Guangxi Pingguo', 'Heilongjiang Ice City', 'Jiangxi Liansheng', 'Liaoning Tieren',
          'Shanghai Jiading Huilong', 'Shenzhen Juniors', 'Yunnan Yukun', 'Zhejiang Greentown',
        ],
      },
      3: {
        leagueName: 'China League Two',
        clubs: [
          'Beijing Institute of Technology', 'Guangxi Hengchen', 'Hainan Star',
          'Hubei Chutian', 'Jiangxi Dark Horse Junior', 'Kunming City', 'Lanzhou Longyuan',
          'Nantong Haimen Codion', 'Qingdao West Coast B', 'Shaanxi Union B',
          'Shandong Taishan B', 'Shanghai Port B', 'Shenzhen Juniors B', 'Tai\'an Tiankuang',
          'Wenzhou Professional', 'Wuxi Wuguo',
        ],
      },
      4: {
        leagueName: 'Chinese Champions League',
        clubs: [
          'Beijing Guoan', 'Tianjin Jinmen Tiger', 'Shanghai Shenhua', 'Shandong Taishan',
          'Guangzhou FC', 'Dalian Pro', 'Henan Songshan Longmen', 'Changchun Yatai',
          'Wuhan Three Towns', 'Chengdu Rongcheng', 'Zhejiang FC', 'Meizhou Hakka',
          'Qingdao Hainiu', 'Nantong Zhiyun', 'Cangzhou Mighty Lions', 'Shenzhen FC',
        ],
      },
      5: {
        leagueName: 'China Amateur League (North)',
        clubs: [
          'Beijing Guoan', 'Tianjin Jinmen Tiger', 'Hebei China Fortune', 'Shandong Luneng',
          'Liaoning Whowin', 'Changchun Yatai', 'Dalian Aerbin', 'Harbin Yiteng',
          'Inner Mongolia Zhongyou', 'Shanxi Xiangyu', 'Shaanxi Chang\'an Athletic',
          'Gansu Tianma', 'Ningxia Hui Autonomous', 'Xinjiang Tianshan Leopard',
        ],
      },
      6: {
        leagueName: 'China Amateur League (East)',
        clubs: [
          'Shanghai SIPG', 'Shanghai Shenhua', 'Jiangsu Suning', 'Zhejiang Greentown',
          'Hangzhou Greentown', 'Nanjing Yoyo', 'Suzhou Dongwu', 'Wuxi Wuguo',
          'Nantong Zhiyun', 'Yangzhou Huaian', 'Zhenjiang Huasa', 'Changzhou Xinbei',
        ],
      },
      7: {
        leagueName: 'China Amateur League (South)',
        clubs: [
          'Guangzhou Evergrande', 'Guangzhou R&F', 'Shenzhen FC', 'Meizhou Hakka',
          'Dongguan Guanlian', 'Foshan Nanshi', 'Zhuhai Aojia', 'Hainan Star',
          'Guangxi Pingguo', 'Kunming City', 'Chengdu Rongcheng', 'Chongqing Dangdai',
        ],
      },
    },
  },
  IN: {
    country: 'India',
    tiers: {
      1: {
        leagueName: 'Indian Super League',
        clubs: [
          'Mumbai City', 'Mohun Bagan Super Giant', 'Bengaluru FC', 'Kerala Blasters',
          'FC Goa', 'Hyderabad FC', 'Chennaiyin FC', 'Jamshedpur FC',
          'Odisha FC', 'NorthEast United', 'East Bengal', 'Punjab FC',
          'Mumbai City FC', 'ATK Mohun Bagan',
        ],
      },
      2: {
        leagueName: 'I-League',
        clubs: [
          'Gokulam Kerala', 'Mohammedan SC', 'Churchill Brothers', 'Rajasthan United',
          'Real Kashmir', 'Sreenidi Deccan', 'Inter Kashi', 'Aizawl FC',
          'TRAU FC', 'Delhi FC', 'Namdhari FC', 'Dempo SC',
          'Mumbai Kenkre', 'Sporting Club Delhi', 'Calcutta Customs', 'United SC',
        ],
      },
      3: {
        leagueName: 'I-League 2',
        clubs: [
          'FC Bengaluru United', 'FC Goa B', 'Garhwal FC', 'Gokulam Kerala B',
          'Kenkre FC', 'Mumbai FC', 'NEROCA FC', 'Punjab FC B',
          'Rajasthan United B', 'Sudeva Delhi', 'United Sports Club', 'WIFA FC',
          'FC Kerala', 'FC Punjab', 'FC Rajasthan', 'FC Sikkim',
        ],
      },
      4: {
        leagueName: 'State Leagues (Goa)',
        clubs: [
          'Dempo SC', 'Churchill Brothers', 'Salgaocar FC', 'Sporting Clube de Goa',
          'FC Goa', 'Vasco SC', 'Calangute Association', 'Curtorim Gymkhana',
          'Duler Stadium', 'Fransa-Pax FC', 'Guardian Angel', 'Mumbai FC',
          'Salgaocar', 'Sporting Goa', 'Tata Football Academy', 'Vasco da Gama',
        ],
      },
    },
  },
  SA: {
    country: 'Saudi Arabia',
    tiers: {
      1: {
        leagueName: 'Saudi Pro League',
        clubs: [
          'Al Hilal', 'Al Nassr', 'Al Ahli', 'Al Ittihad', 'Al Shabab', 'Al Ettifaq',
          'Al Fateh', 'Al Taawoun', 'Al Raed', 'Al Feiha', 'Al Khaleej', 'Al Riyadh',
          'Al Okhdood', 'Al Hazem', 'Damac', 'Al Qadsiah',
        ],
      },
      2: {
        leagueName: 'Saudi First Division League',
        clubs: [
          'Al Batin', 'Al Jabalain', 'Al Jandal', 'Al Jubail', 'Al Najma',
          'Al Safa', 'Al Taee', 'Al Ula', 'Al Wehda', 'Al Zulfi',
          'Abha', 'Al Adalah', 'Al Arabi', 'Al Bukayriyah', 'Al Faisaly', 'Al Tai',
        ],
      },
      3: {
        leagueName: 'Saudi Second Division',
        clubs: [
          'Al Anwar', 'Al Arar', 'Al Baha', 'Al Draih', 'Al Entesar',
          'Al Faisaly Harmah', 'Al Jeel', 'Al Kholood', 'Al Lewaa', 'Al Majd',
          'Al Nojoom', 'Al Rawdhah', 'Al Shahania', 'Al Tadamun', 'Al Washm', 'Al Watan',
        ],
      },
    },
  },
  TH: {
    country: 'Thailand',
    tiers: {
      1: {
        leagueName: 'Thai League 1',
        clubs: [
          'Buriram United', 'Bangkok United', 'Port FC', 'Muangthong United',
          'BG Pathum United', 'Chonburi', 'Ratchaburi Mitr Phol', 'Prachuap',
          'Rayong FC', 'Lamphun Warriors', 'Nakhon Ratchasima', 'Sukhothai',
          'Uthai Thani', 'Khon Kaen United', 'Police Tero', 'Nongbua Pitchaya',
        ],
      },
      2: {
        leagueName: 'Thai League 2',
        clubs: [
          'Ayutthaya United', 'Bangkok FC', 'Chiangmai United', 'Customs United',
          'Kasetsart FC', 'Krabi FC', 'Lampang FC', 'Nakhon Pathom United',
          'Pattani FC', 'Phrae United', 'Ranong United', 'Sisaket United',
          'Songkhla FC', 'Trat FC', 'Udon Thani', 'Chainat Hornbill',
        ],
      },
    },
  },
  ID: {
    country: 'Indonesia',
    tiers: {
      1: {
        leagueName: 'Liga 1',
        clubs: [
          'Persija Jakarta', 'Persib Bandung', 'Arema FC', 'Bali United',
          'PSM Makassar', 'Persis Solo', 'Borneo FC', 'Madura United',
          'Persebaya Surabaya', 'PSIS Semarang', 'Persita Tangerang', 'Dewa United',
          'Persik Kediri', 'Bhayangkara FC', 'Barito Putera', 'Semen Padang',
        ],
      },
      2: {
        leagueName: 'Liga 2',
        clubs: [
          'Persikabo 1973', 'Persela Lamongan', 'Persijap Jepara', 'Persiku Kudus',
          'Persiraja Banda Aceh', 'Persita Tangerang', 'PSBS Biak', 'PSMS Medan',
          'PSS Sleman', 'RANS Nusantara', 'Sriwijaya FC', 'Sumsel United',
          'Deltras Sidoarjo', 'Garudayaksa', 'Gresik United', 'Persiba Balikpapan',
        ],
      },
    },
  },
  MY: {
    country: 'Malaysia',
    tiers: {
      1: {
        leagueName: 'Malaysia Super League',
        clubs: [
          'Johor Darul Ta\'zim', 'Selangor', 'Kuala Lumpur City', 'Terengganu',
          'Pahang', 'Sabah', 'Penang', 'Kelantan United', 'Negeri Sembilan',
          'Kuching City', 'PDRM', 'Kuala Lumpur Rovers', 'Sri Pahang', 'Melaka United',
        ],
      },
      2: {
        leagueName: 'Malaysia Premier League',
        clubs: [
          'Kelantan United', 'Kuala Lumpur Rovers', 'Kuching FA', 'Melaka United',
          'Negeri Sembilan', 'PDRM', 'Penang', 'Sabah', 'Selangor II', 'Terengganu II',
          'Johor Darul Ta\'zim II', 'Kedah', 'Perak', 'Sarawak United', 'Felda United',
        ],
      },
    },
  },
  AE: {
    country: 'United Arab Emirates',
    tiers: {
      1: {
        leagueName: 'UAE Pro League',
        clubs: [
          'Al Ain', 'Al Wahda', 'Al Wasl', 'Shabab Al Ahli', 'Al Nasr',
          'Al Jazira', 'Sharjah', 'Baniyas', 'Ajman', 'Al Bataeh',
          'Al Dhafra', 'Al Urooba', 'Khor Fakkan', 'Emirates Club', 'Hatta', 'Al Fujairah',
        ],
      },
      2: {
        leagueName: 'UAE First Division League',
        clubs: [
          'Al Arabi', 'Al Hamriyah', 'Al Ittihad Kalba', 'Al Orooba',
          'Al Rams', 'Al Sadaqua', 'Al Thaid', 'Dibba Al Fujairah',
          'Dibba Al Hisn', 'Emirates', 'Fujairah', 'Gulf United',
          'Masfout', 'Ras Al Khaimah', 'United FC', 'Al Dhaid',
        ],
      },
    },
  },
  IR: {
    country: 'Iran',
    tiers: {
      1: {
        leagueName: 'Persian Gulf Pro League',
        clubs: [
          'Persepolis', 'Esteghlal', 'Sepahan', 'Tractor', 'Foolad',
          'Gol Gohar', 'Aluminium Arak', 'Mes Rafsanjan', 'Paykan', 'Zob Ahan',
          'Shams Azar Qazvin', 'Malavan', 'Kheybar Khorramabad', 'Chadormalu', 'Fajr Sepasi',
        ],
      },
      2: {
        leagueName: 'Azadegan League',
        clubs: [
          'Mes Kerman', 'Naft Masjed Soleyman', 'Nassaji Mazandaran', 'Pars Jonoubi',
          'Sanat Naft', 'Shahin Bushehr', 'Shahrdari Tabriz', 'Siah Jamegan',
          'Esteghlal Khuzestan', 'Havadar', 'Mes Shahr-e Babak', 'Navad Urmia',
          'Niroo Zamini', 'Pars Bandar', 'Rah Ahan', 'Saipa',
        ],
      },
    },
  },
  QA: {
    country: 'Qatar',
    tiers: {
      1: {
        leagueName: 'Qatar Stars League',
        clubs: [
          'Al Sadd', 'Al Duhail', 'Al Rayyan', 'Al Arabi', 'Al Wakrah',
          'Al Gharafa', 'Al Ahli', 'Qatar SC', 'Al Shamal', 'Al Markhiya',
          'Al Shahaniya', 'Umm Salal', 'Al Mesaimeer', 'Al Bidda', 'Lusail', 'Al Khor',
        ],
      },
      2: {
        leagueName: 'Qatar Second Division',
        clubs: [
          'Al Bidda', 'Al Kharaitiyat', 'Al Khor', 'Al Mesaimeer',
          'Al Sailiya', 'Al Shahaniya', 'Al Waab', 'Lusail',
          'Muaither', 'Qatar SC II', 'Al Ahli Doha', 'Al Arabi II',
          'Al Duhail II', 'Al Gharafa II', 'Al Rayyan II', 'Al Sadd II',
        ],
      },
    },
  },
  VN: {
    country: 'Vietnam',
    tiers: {
      1: {
        leagueName: 'V.League 1',
        clubs: [
          'Hanoi FC', 'Viettel', 'Ho Chi Minh City', 'Haiphong',
          'Thanh Hoa', 'Binh Dinh', 'Song Lam Nghe An', 'Hong Linh Ha Tinh',
          'Nam Dinh', 'Quang Nam', 'Hoang Anh Gia Lai', 'Sanna Khanh Hoa',
          'Becamex Binh Duong', 'SHB Da Nang', 'Cong An Ha Noi', 'The Cong',
        ],
      },
      2: {
        leagueName: 'V.League 2',
        clubs: [
          'Ba Ria Vung Tau', 'Binh Phuoc', 'Dong Nai', 'Dong Thap',
          'Hai Phong II', 'Khanh Hoa', 'Long An', 'Pho Hien',
          'PVF-CAND', 'Quang Ninh', 'Tay Ninh', 'Thanh Hoa II',
          'Viettel II', 'Xuan Thanh', 'An Giang', 'Can Tho',
        ],
      },
    },
  },
  PH: {
    country: 'Philippines',
    tiers: {
      1: {
        leagueName: 'Philippines Football League',
        clubs: [
          'Kaya FC', 'Ceres-Negros', 'Stallion Laguna', 'United City',
          'Maharlika Manila', 'Tuloy FC', 'Dynamic Herb Cebu', 'Manila Digger',
          'Agila', 'Davao Aguilas', 'Global Cebu', 'JP Voltes',
          'Loyola', 'Mendiola FC', 'Philippine Air Force', 'Philippine Army',
        ],
      },
      2: {
        leagueName: 'PFL Developmental League',
        clubs: [
          'Ceres-Negros U23', 'Kaya II', 'Stallion II', 'United City II',
          'Maharlika II', 'Tuloy II', 'Cebu II', 'Manila II',
          'Agila II', 'Davao II', 'Global II', 'JP Voltes II',
          'Loyola II', 'Mendiola II', 'Air Force II', 'Army II',
        ],
      },
    },
  },
  SG: {
    country: 'Singapore',
    tiers: {
      1: {
        leagueName: 'Singapore Premier League',
        clubs: [
          'Albirex Niigata Singapore', 'Balestier Khalsa', 'DPMM FC', 'Geylang International',
          'Hougang United', 'Lion City Sailors', 'Tampines Rovers', 'Tanjong Pagar United',
          'Young Lions', 'Warriors FC', 'Home United', 'Garena Young Lions',
          'Singapore Armed Forces', 'Woodlands Wellington', 'Sengkang Punggol', 'Sembawang Rangers',
        ],
      },
      2: {
        leagueName: 'Singapore National Football League',
        clubs: [
          'Admiralty FC', 'Balestier Khalsa II', 'Geylang II', 'Hougang II',
          'Katong FC', 'Kembangan United', 'Police SA', 'Singapore Cricket Club',
          'Tampines II', 'Tanjong Pagar II', 'Warriors II', 'Yishun Jets',
          'Bukit Gombak', 'Clementi United', 'Eunos Crescent', 'Geylang Serai',
        ],
      },
    },
  },
  KZ: {
    country: 'Kazakhstan',
    tiers: {
      1: {
        leagueName: 'Kazakhstan Premier League',
        clubs: [
          'Astana', 'Kairat', 'Tobol', 'Ordabasy', 'Aktobe',
          'Kyzylzhar', 'Shakhter Karagandy', 'Atyrau', 'Zhetysu', 'Kaisar',
          'Okzhetpes', 'Taraz', 'Turkestan', 'Altay', 'Ekibastuz', 'Jetisay',
        ],
      },
      2: {
        leagueName: 'Kazakhstan First League',
        clubs: [
          'Akademiya Ontustik', 'Akademiya Oskemen', 'Akademiya Pavlodar', 'Akzhayik',
          'Altay', 'Arys', 'Bayterek', 'Caspiy',
          'Ekibastuz', 'Irtysh', 'Kairat-Zhastar', 'Khan Tengri',
          'Maktaaral', 'Saryagash', 'Shakhter II', 'Taraz II',
        ],
      },
    },
  },
  UZ: {
    country: 'Uzbekistan',
    tiers: {
      1: {
        leagueName: 'Uzbekistan Super League',
        clubs: [
          'Pakhtakor', 'Nasaf', 'Lokomotiv Tashkent', 'Bunyodkor',
          'Navbahor', 'AGMK', 'Sogdiana', 'Qizilqum',
          'Dinamo Samarqand', 'Neftchi Farg\'ona', 'Surkhon', 'Xorazm',
          'Andijan', 'Buxoro', 'Kokand-1912', 'Mash\'al',
        ],
      },
      2: {
        leagueName: 'Uzbekistan Pro League',
        clubs: [
          'Andijon', 'Bekobod', 'Buxoro', 'Dinamo Samarqand II',
          'Farg\'ona', 'G\'ijduvon', 'Jizzax', 'Kokand',
          'Namangan', 'Navoiy', 'Nukus', 'Olmaliq',
          'Qarshi', 'Shurtan', 'Termiz', 'Urganch',
        ],
      },
    },
  },
  IL: {
    country: 'Israel',
    tiers: {
      1: {
        leagueName: 'Israeli Premier League',
        clubs: [
          'Maccabi Tel Aviv', 'Maccabi Haifa', 'Hapoel Be\'er Sheva', 'Beitar Jerusalem',
          'Hapoel Tel Aviv', 'Maccabi Petah Tikva', 'Ironi Kiryat Shmona', 'Hapoel Haifa',
          'Bnei Sakhnin', 'Ashdod', 'Hapoel Jerusalem', 'Maccabi Netanya',
          'Hapoel Hadera', 'Ironi Tiberias', 'Hapoel Petah Tikva', 'Maccabi Bnei Reineh',
        ],
      },
      2: {
        leagueName: 'Liga Leumit',
        clubs: [
          'Bnei Yehuda', 'Hapoel Acre', 'Hapoel Ashkelon', 'Hapoel Kfar Saba',
          'Hapoel Nof HaGalil', 'Hapoel Ra\'anana', 'Hapoel Ramat Gan', 'Hapoel Rishon LeZion',
          'Hapoel Umm al-Fahm', 'Ironi Modi\'in', 'Kiryat Gat', 'Maccabi Herzliya',
          'Maccabi Kabilio Jaffa', 'Maccabi Netanya', 'Sektzia Nes Tziona', 'Hapoel Ironi Baqa',
        ],
      },
    },
  },
  IQ: {
    country: 'Iraq',
    tiers: {
      1: {
        leagueName: 'Iraqi Premier League',
        clubs: [
          'Al Shorta', 'Al Zawraa', 'Al Quwa Al Jawiya', 'Al Najaf',
          'Al Talaba', 'Erbil SC', 'Al Minaa', 'Al Naft',
          'Al Karkh', 'Al Hudood', 'Naft Al Wasat', 'Al Kahrabaa',
          'Diyala', 'Al Sinaah', 'Al Qasim', 'Newroz',
        ],
      },
      2: {
        leagueName: 'Iraqi First Division League',
        clubs: [
          'Al Diwaniya', 'Al Hindiya', 'Al Kufa', 'Al Muthanna',
          'Al Samawa', 'Al Shabab', 'Al Sulaymaniyah', 'Al Taji',
          'Baghdad', 'Basra', 'Duhok', 'Karbala',
          'Kirkuk', 'Mosul', 'Najaf', 'Salahaddin',
        ],
      },
    },
  },
  TW: {
    country: 'Taiwan',
    tiers: {
      1: {
        leagueName: 'Taiwan Football Premier League',
        clubs: [
          'Taichung Futuro', 'Taiwan Steel', 'Taipower', 'Hang Yuan',
          'Tatung', 'Ming Chuan University', 'Taipei Red Lions', 'Taichung Rock',
          'Kaohsiung Attackers', 'Tainan City', 'Air Source Development', 'Inter Taoyuan',
          'NSTC', 'Red Lions', 'Taipei City Dragons', 'Yunlin County',
        ],
      },
    },
  },
  HK: {
    country: 'Hong Kong',
    tiers: {
      1: {
        leagueName: 'Hong Kong Premier League',
        clubs: [
          'Kitchee', 'Eastern', 'Rangers', 'Lee Man',
          'Southern', 'Tai Po', 'Eastern District', 'HKFC',
          'Resources Capital', 'North District', 'Citizen', 'Happy Valley',
          'Pegasus', 'Sham Shui Po', 'Yuen Long', 'Wofoo Tai Po',
        ],
      },
    },
  },
  PK: {
    country: 'Pakistan',
    tiers: {
      1: {
        leagueName: 'Pakistan Premier League',
        clubs: [
          'K-Electric', 'WAPDA', 'Pakistan Army', 'Pakistan Air Force',
          'Pakistan Navy', 'KRL', 'HBL', 'Muslim FC',
          'Balochistan United', 'Karachi United', 'Lahore Qalandars', 'Peshawar Zalmi',
          'Islamabad United', 'Quetta Gladiators', 'Multan Sultans', 'Sialkot Stallions',
        ],
      },
    },
  },
  BD: {
    country: 'Bangladesh',
    tiers: {
      1: {
        leagueName: 'Bangladesh Premier League',
        clubs: [
          'Bashundhara Kings', 'Abahani Limited Dhaka', 'Mohammedan SC', 'Brothers Union',
          'Sheikh Jamal Dhanmondi Club', 'Arambagh KS', 'Rahmatganj MFS', 'Police FC',
          'Saif Sporting Club', 'Fakirapool Young Men\'s Club', 'Muktijoddha Sangsad',
          'Sheikh Russel KC', 'Chittagong Abahani', 'Farashganj SC', 'Uttara FC', 'Swadhinata KS',
        ],
      },
    },
  },
  LK: {
    country: 'Sri Lanka',
    tiers: {
      1: {
        leagueName: 'Sri Lanka Super League',
        clubs: [
          'Colombo FC', 'Renown SC', 'Saunders SC', 'Blue Star SC',
          'Defenders SC', 'Java Lane SC', 'Ratnam SC', 'Renown Sports Club',
          'Solid SC', 'Sri Lanka Army SC', 'Sri Lanka Navy SC', 'Sri Lanka Police SC',
          'Up Country Lions', 'Valentine\'s SC', 'Young\'s SC', 'Zahira College',
        ],
      },
    },
  },
  NP: {
    country: 'Nepal',
    tiers: {
      1: {
        leagueName: 'Nepal Super League',
        clubs: [
          'Machhindra FC', 'Nepal Army Club', 'Nepal Police Club', 'Three Star Club',
          'Manang Marshyangdi Club', 'New Road Team', 'Tribhuvan Army Club', 'Sankata Club',
          'Himalayan Sherpa Club', 'Friends Club', 'Boys Union Club', 'Brigade Boys Club',
          'Jawalakhel Youth Club', 'RCT', 'Saraswati Youth Club', 'Satdobato Youth Club',
        ],
      },
    },
  },
  AF: {
    country: 'Afghanistan',
    tiers: {
      1: {
        leagueName: 'Afghan Premier League',
        clubs: [
          'Shaheen Asmayee', 'De Maiwand Atalan', 'De Abasin Sape', 'De Spin Ghar Bazan',
          'Simorgh Alborz', 'Oqaban Hindukush', 'Mawjhai Amu', 'De Abasin Sape II',
          'Kabul United', 'Herat United', 'Mazar United', 'Kandahar United',
          'Jalalabad United', 'Bamyan United', 'Ghazni United', 'Baghlan United',
        ],
      },
    },
  },
  MM: {
    country: 'Myanmar',
    tiers: {
      1: {
        leagueName: 'Myanmar National League',
        clubs: [
          'Yangon United', 'Shan United', 'Ayeyawady United', 'Hantharwady United',
          'Rakhine United', 'Magwe FC', 'Zwekapin United', 'Chin United',
          'Ispe FC', 'Mahar United', 'Myawady FC', 'Sagaing United',
          'Southern Myanmar', 'Yadanarbon', 'Yangon City', 'Yangon United II',
        ],
      },
    },
  },
  KH: {
    country: 'Cambodia',
    tiers: {
      1: {
        leagueName: 'Cambodian Premier League',
        clubs: [
          'Visakha', 'Boeung Ket', 'Phnom Penh Crown', 'Nagaworld',
          'Angkor Tiger', 'Kirivong Sok Sen Chey', 'National Defense', 'Preah Khan Reach',
          'Asia Euro United', 'Electricite du Cambodge', 'ISI Dangkor Senchey', 'Life FC',
          'Ministry of Interior', 'NagaWorld', 'Phnom Penh Galaxy', 'Svay Rieng',
        ],
      },
    },
  },
  LA: {
    country: 'Laos',
    tiers: {
      1: {
        leagueName: 'Lao League 1',
        clubs: [
          'Lao Army', 'Lao Police Club', 'Young Elephants', 'Ezra FC',
          'Master 7', 'Namtha United', 'Salavan United', 'Savannakhet',
          'Vientiane FC', 'Viengchanh', 'Champasak United', 'Luang Prabang United',
          'Pakse FC', 'Savannakhet United', 'Vientiane Capital', 'Young Elephants FC',
        ],
      },
    },
  },
  BN: {
    country: 'Brunei',
    tiers: {
      1: {
        leagueName: 'Brunei Super League',
        clubs: [
          'DPMM FC', 'MS ABDB', 'Indera SC', 'Kasuka FC',
          'Lun Bawang FC', 'Najip FC', 'Tabuan Muda', 'Wijaya FC',
          'BSE', 'Jerudong FC', 'Kota Ranger', 'LLRC FT',
          'Menglait FC', 'Rimba Star', 'Setia Perdana', 'Tutong FC',
        ],
      },
    },
  },
  TL: {
    country: 'Timor-Leste',
    tiers: {
      1: {
        leagueName: 'Liga Futebol Amadora',
        clubs: [
          'Karketu Dili', 'Assalam FC', 'Boavista', 'Dili United',
          'Dili Leste', 'Karketu Dili FC', 'Lalenok United', 'Ponta Leste',
          'Sport Laulara e Benfica', 'Zebra', 'Aitana', 'Ainaro United',
          'Baucau United', 'Dili FC', 'Lospalos United', 'Maliana United',
        ],
      },
    },
  },
  KW: {
    country: 'Kuwait',
    tiers: {
      1: {
        leagueName: 'Kuwait Premier League',
        clubs: [
          'Al Arabi', 'Al Qadsia', 'Al Kuwait', 'Al Salmiya',
          'Kazma', 'Al Jahra', 'Al Nasar', 'Al Tadhamon',
          'Al Sahel', 'Al Shabab', 'Al Fahaheel', 'Al Sulaibikhat',
          'Burgan', 'Khaitan', 'Yarmouk', 'Al Shamiya',
        ],
      },
    },
  },
  BH: {
    country: 'Bahrain',
    tiers: {
      1: {
        leagueName: 'Bahraini Premier League',
        clubs: [
          'Al Riffa', 'Al Muharraq', 'Al Ahli', 'Al Najma',
          'Al Hidd', 'Al Shabab', 'Bahrain SC', 'East Riffa',
          'Manama Club', 'Muharraq Club', 'Sitra Club', 'Al Ittifaq',
          'Al Hala', 'Al Tadamun', 'Busaiteen', 'Isa Town',
        ],
      },
    },
  },
  OM: {
    country: 'Oman',
    tiers: {
      1: {
        leagueName: 'Oman Professional League',
        clubs: [
          'Al Seeb', 'Al Nasr', 'Al Nahda', 'Dhofar',
          'Sohar', 'Sur', 'Bahla', 'Al Rustaq',
          'Al Shabab', 'Al Suwaiq', 'Ibri', 'Muscat',
          'Oman Club', 'Saham', 'Samail', 'Al Ansar',
        ],
      },
    },
  },
  JO: {
    country: 'Jordan',
    tiers: {
      1: {
        leagueName: 'Jordanian Pro League',
        clubs: [
          'Al Faisaly', 'Al Wehdat', 'Al Hussein', 'Shabab Al Ordon',
          'Al Ramtha', 'Al Jazeera', 'Al Salt', 'Al Ahli',
          'Al Baqaa', 'Al Faisaly II', 'Al Jalil', 'Al Sareeh',
          'Ittihad Al Ramtha', 'Maan', 'Sahab', 'Shabab Al Hussein',
        ],
      },
    },
  },
  LB: {
    country: 'Lebanon',
    tiers: {
      1: {
        leagueName: 'Lebanese Premier League',
        clubs: [
          'Al Ahed', 'Al Ansar', 'Nejmeh', 'Safa',
          'Bourj', 'Racing Beirut', 'Shabab Al Ghazieh', 'Tadamon Sour',
          'Al Akhaa Al Ahli', 'Al Nabi Sheet', 'Al Shabab Sahel', 'Bekaa SC',
          'Chabab Ghazieh', 'Sagesse', 'Salam Zgharta', 'Tripoli SC',
        ],
      },
    },
  },
  SY: {
    country: 'Syria',
    tiers: {
      1: {
        leagueName: 'Syrian Premier League',
        clubs: [
          'Al Jaish', 'Al Shorta', 'Al Wahda', 'Al Karama',
          'Al Wathba', 'Tishreen', 'Al Ittihad', 'Al Taliya',
          'Al Horriya', 'Al Majd', 'Al Sahel', 'Al Shoulla',
          'Foutoua', 'Hottin', 'Jabala', 'Malkiya',
        ],
      },
    },
  },
  YE: {
    country: 'Yemen',
    tiers: {
      1: {
        leagueName: 'Yemeni League',
        clubs: [
          'Al Ahli Sana\'a', 'Al Tilal', 'Al Wahda Aden', 'Al Yarmouk',
          'Al Saqr', 'Al Shabab Aden', 'Al Ittihad Ibb', 'Al Oruba',
          'Al Hilal Hudaydah', 'Al Nasr Taiz', 'Al Sha\'ab Ibb', 'Shabab Al Bayda',
          'Al Ahli Taiz', 'Al Hudaydah', 'Al Saada', 'Al Wehda Sana\'a',
        ],
      },
    },
  },
  TM: {
    country: 'Turkmenistan',
    tiers: {
      1: {
        leagueName: 'Ýokary Liga',
        clubs: [
          'Altyn Asyr', 'Ahal', 'Köpetdag', 'Merw',
          'Nebitçi', 'Şagadam', 'Energetik', 'Garagumrukçy',
          'Lebap', 'Mary', 'Sagadam', 'Aşgabat',
          'Daşoguz', 'Balkan', 'Hazar', 'Köpetdag Aşgabat',
        ],
      },
    },
  },
  KG: {
    country: 'Kyrgyzstan',
    tiers: {
      1: {
        leagueName: 'Kyrgyzstan League',
        clubs: [
          'Dordoi Bishkek', 'Abdysh-Ata', 'Alga Bishkek', 'Alay Osh',
          'Bars', 'FC Talas', 'Ilbirs', 'Kara-Balta',
          'Neftchi Kochkor-Ata', 'Ala-Too Naryn', 'FC Bishkek City', 'Dinamo Bishkek',
          'FC Ozgon', 'FC Talas', 'Kyrgyzstan', 'Muras United',
        ],
      },
    },
  },
  TJ: {
    country: 'Tajikistan',
    tiers: {
      1: {
        leagueName: 'Tajikistan Higher League',
        clubs: [
          'Istiklol', 'Khujand', 'Ravshan', 'CSKA Pamir',
          'Khosilot', 'Hima Dushanbe', 'Panjsher', 'Regar-TadAZ',
          'Vakhsh', 'Barkchi', 'Eskhata', 'Fayzkand',
          'Istaravshan', 'Khatlon', 'Sitora', 'Zarafshon',
        ],
      },
    },
  },
  GE: {
    country: 'Georgia',
    tiers: {
      1: {
        leagueName: 'Erovnuli Liga',
        clubs: [
          'Dinamo Tbilisi', 'Torpedo Kutaisi', 'Saburtalo', 'Dila Gori',
          'Samgurali', 'Samtredia', 'Gagra', 'Telavi',
          'Iberia 1999', 'Kolkheti 1913', 'Spaeri', 'Gareji',
          'Meshakhte', 'Rustavi', 'Sioni', 'WIT Georgia',
        ],
      },
    },
  },
  AM: {
    country: 'Armenia',
    tiers: {
      1: {
        leagueName: 'Armenian Premier League',
        clubs: [
          'Pyunik', 'Ararat-Armenia', 'Noah', 'Urartu',
          'Alashkert', 'Shirak', 'Ararat Yerevan', 'Banants',
          'Gandzasar', 'Lori', 'Sevan', 'Van',
          'Andranik', 'Araks', 'BKMA', 'Syunik',
        ],
      },
    },
  },
  AZ: {
    country: 'Azerbaijan',
    tiers: {
      1: {
        leagueName: 'Azerbaijan Premier League',
        clubs: [
          'Qarabag', 'Neftchi Baku', 'Sabah', 'Sumgayit',
          'Zira', 'Kapaz', 'Gabala', 'Turan',
          'Araz', 'Imisli', 'Mil-Muğan', 'MOIK',
          'Shafa', 'Shamakhi', 'Standard Sumgayit', 'Zaqatala',
        ],
      },
    },
  },
  MN: {
    country: 'Mongolia',
    tiers: {
      1: {
        leagueName: 'Mongolia Premier League',
        clubs: [
          'Erchim', 'Khangarid', 'Ulaanbaatar', 'Athletic 220',
          'Deren', 'FC Ulaanbaatar', 'Hunters', 'Khoromkhon',
          'Mazaalai', 'Selenge Press', 'Ulaanbaatar City', 'Ulaanbaatar Warriors',
          'Central Stallions', 'Khovd', 'Orkhon', 'Tuv Province',
        ],
      },
    },
  },
}
