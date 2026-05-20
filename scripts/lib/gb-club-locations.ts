/**
 * Resolves English club names to place names and stadium coordinates.
 */

export interface ClubLocation {
  city: string
  lat: number
  lng: number
}

/** London-based clubs (Premier League, Championship, non-league) */
const LONDON_CLUBS = new Set([
  'Arsenal',
  'Brentford',
  'Charlton Athletic',
  'Chelsea',
  'Crystal Palace',
  'Fulham',
  'Leyton Orient',
  'Millwall',
  'Queens Park Rangers',
  'Tottenham Hotspur',
  'West Ham United',
  'AFC Wimbledon',
  'Dagenham & Redbridge',
  'Barnet',
  'Bromley',
  'Sutton United',
  'Wealdstone',
  'Boreham Wood',
  'Welling United',
  'Hampton & Richmond Borough',
  'Maidenhead United',
  'Slough Town',
  'Chelmsford City',
  'Dorking Wanderers',
  'Eastbourne Borough',
  'Farnborough',
  'Hemel Hempstead Town',
  'Hornchurch',
  'St Albans City',
  'Tonbridge Angels',
  'Worthing',
  'Dartford',
  'Ebbsfleet United',
  'Maidstone United',
])

/** Precise stadium / ground coordinates */
export const GB_STADIUM_LOCATIONS: Record<string, ClubLocation> = {
  'Arsenal': { city: 'London', lat: 51.5549, lng: -0.1084 },
  'Aston Villa': { city: 'Birmingham', lat: 52.509, lng: -1.8849 },
  'AFC Bournemouth': { city: 'Bournemouth', lat: 50.7352, lng: -1.8385 },
  'Bournemouth': { city: 'Bournemouth', lat: 50.7352, lng: -1.8385 },
  'Brentford': { city: 'London', lat: 51.4908, lng: -0.2889 },
  'Brighton & Hove Albion': { city: 'Brighton', lat: 50.8607, lng: -0.083 },
  'Brighton': { city: 'Brighton', lat: 50.8607, lng: -0.083 },
  'Burnley': { city: 'Burnley', lat: 53.789, lng: -2.2402 },
  'Chelsea': { city: 'London', lat: 51.4817, lng: -0.191 },
  'Crystal Palace': { city: 'London', lat: 51.3983, lng: -0.0861 },
  'Everton': { city: 'Liverpool', lat: 53.4388, lng: -2.9664 },
  'Fulham': { city: 'London', lat: 51.475, lng: -0.2214 },
  'Leeds United': { city: 'Leeds', lat: 53.7772, lng: -1.5722 },
  'Liverpool': { city: 'Liverpool', lat: 53.4308, lng: -2.9608 },
  'Manchester City': { city: 'Manchester', lat: 53.4831, lng: -2.2004 },
  'Manchester United': { city: 'Manchester', lat: 53.4631, lng: -2.2913 },
  'Newcastle United': { city: 'Newcastle', lat: 54.9756, lng: -1.6217 },
  'Nottingham Forest': { city: 'Nottingham', lat: 52.94, lng: -1.1327 },
  'Tottenham Hotspur': { city: 'London', lat: 51.6033, lng: -0.0657 },
  'West Ham United': { city: 'London', lat: 51.5387, lng: -0.0166 },
  'Wolverhampton Wanderers': { city: 'Wolverhampton', lat: 52.5903, lng: -2.1305 },
  'Sunderland': { city: 'Sunderland', lat: 54.9146, lng: -1.3884 },
  'Sheffield United': { city: 'Sheffield', lat: 53.3703, lng: -1.4707 },
  'Sheffield Wednesday': { city: 'Sheffield', lat: 53.4115, lng: -1.5006 },
  'Birmingham City': { city: 'Birmingham', lat: 52.4756, lng: -1.8682 },
  'Blackburn Rovers': { city: 'Blackburn', lat: 53.7488, lng: -2.4821 },
  'Bristol City': { city: 'Bristol', lat: 51.4397, lng: -2.6203 },
  'Cardiff City': { city: 'Cardiff', lat: 51.4729, lng: -3.203 },
  'Coventry City': { city: 'Coventry', lat: 52.4483, lng: -1.4965 },
  'Derby County': { city: 'Derby', lat: 52.9142, lng: -1.4427 },
  'Hull City': { city: 'Hull', lat: 53.7758, lng: -0.3678 },
  'Ipswich Town': { city: 'Ipswich', lat: 52.0551, lng: 1.1449 },
  'Leicester City': { city: 'Leicester', lat: 52.6203, lng: -1.1423 },
  'Middlesbrough': { city: 'Middlesbrough', lat: 54.5781, lng: -1.2169 },
  'Millwall': { city: 'London', lat: 51.4859, lng: -0.0506 },
  'Norwich City': { city: 'Norwich', lat: 52.6223, lng: 1.3093 },
  'Oxford United': { city: 'Oxford', lat: 51.7167, lng: -1.2078 },
  'Plymouth Argyle': { city: 'Plymouth', lat: 50.3881, lng: -4.1508 },
  'Portsmouth': { city: 'Portsmouth', lat: 50.7964, lng: -1.0639 },
  'Preston North End': { city: 'Preston', lat: 53.7722, lng: -2.6885 },
  'Queens Park Rangers': { city: 'London', lat: 51.509, lng: -0.232 },
  'Southampton': { city: 'Southampton', lat: 50.9058, lng: -1.3908 },
  'Stoke City': { city: 'Stoke', lat: 52.9883, lng: -2.1756 },
  'Swansea City': { city: 'Swansea', lat: 51.6428, lng: -3.9347 },
  'Watford': { city: 'Watford', lat: 51.6498, lng: -0.4046 },
  'West Bromwich Albion': { city: 'West Bromwich', lat: 52.509, lng: -1.9639 },
  'Wrexham': { city: 'Wrexham', lat: 53.0517, lng: -3.0037 },
  'Luton Town': { city: 'Luton', lat: 51.8842, lng: -0.4317 },
  'Charlton Athletic': { city: 'London', lat: 51.4863, lng: 0.0362 },
  'Leyton Orient': { city: 'London', lat: 51.5497, lng: -0.0117 },
  'AFC Wimbledon': { city: 'London', lat: 51.4283, lng: -0.2136 },
  'Wycombe Wanderers': { city: 'Wycombe', lat: 51.6307, lng: -0.8002 },
  'Stevenage': { city: 'Stevenage', lat: 51.8894, lng: -0.1936 },
  'Barnsley': { city: 'Barnsley', lat: 53.5522, lng: -1.4677 },
  'Blackpool': { city: 'Blackpool', lat: 53.8045, lng: -3.0489 },
  'Bolton Wanderers': { city: 'Bolton', lat: 53.7676, lng: -2.4779 },
  'Bradford City': { city: 'Bradford', lat: 53.8045, lng: -1.7594 },
  'Burton Albion': { city: 'Burton', lat: 52.8214, lng: -1.6269 },
  'Doncaster Rovers': { city: 'Doncaster', lat: 53.5308, lng: -1.1143 },
  'Exeter City': { city: 'Exeter', lat: 50.7302, lng: -3.5216 },
  'Huddersfield Town': { city: 'Huddersfield', lat: 53.6544, lng: -1.7683 },
  'Lincoln City': { city: 'Lincoln', lat: 53.2183, lng: -0.5409 },
  'Mansfield Town': { city: 'Mansfield', lat: 53.1384, lng: -1.2005 },
  'Northampton Town': { city: 'Northampton', lat: 52.2353, lng: -0.9026 },
  'Peterborough United': { city: 'Peterborough', lat: 52.5646, lng: -0.2403 },
  'Reading': { city: 'Reading', lat: 51.422, lng: -0.9828 },
  'Rotherham United': { city: 'Rotherham', lat: 53.4268, lng: -1.3625 },
  'Stockport County': { city: 'Stockport', lat: 53.3996, lng: -2.1664 },
  'Wigan Athletic': { city: 'Wigan', lat: 53.5475, lng: -2.6544 },
  'Alfreton Town': { city: 'Alfreton', lat: 53.0944, lng: -1.3811 },
  'Billericay Town': { city: 'Billericay', lat: 51.6228, lng: 0.4201 },
  'Billericay': { city: 'Billericay', lat: 51.6228, lng: 0.4201 },
  'Brackley Town': { city: 'Brackley', lat: 52.0325, lng: -1.1512 },
  'Chippenham Town': { city: 'Chippenham', lat: 51.4588, lng: -2.1158 },
  'Curzon': { city: 'Ashton-under-Lyne', lat: 53.4897, lng: -2.0945 },
  'Curzon Ashton': { city: 'Ashton-under-Lyne', lat: 53.4897, lng: -2.0945 },
  'Evesham United': { city: 'Evesham', lat: 52.0924, lng: -1.9471 },
  'Guiseley': { city: 'Guiseley', lat: 53.8756, lng: -1.7064 },
  'Ramsgate': { city: 'Ramsgate', lat: 51.3357, lng: 1.4199 },
  'Stocksbridge Park Steels': { city: 'Stocksbridge', lat: 53.4782, lng: -1.5888 },
  'Uxbridge': { city: 'Uxbridge', lat: 51.5447, lng: -0.474 },
  'Walton and Hersham': { city: 'Walton-on-Thames', lat: 51.3868, lng: -0.4136 },
  'Yate Town': { city: 'Yate', lat: 51.5478, lng: -2.4184 },
}

const CLUB_PLACE_OVERRIDES: Record<string, string> = {
  'West Bromwich Albion': 'West Bromwich',
  'Brighton & Hove Albion': 'Brighton',
  'Queens Park Rangers': 'London',
  'Preston North End': 'Preston',
  'Crystal Palace': 'London',
  'Aston Villa': 'Birmingham',
  'Nottingham Forest': 'Nottingham',
  'Tottenham Hotspur': 'London',
  'West Ham United': 'London',
  'Wolverhampton Wanderers': 'Wolverhampton',
  'Newcastle United': 'Newcastle',
  'Manchester United': 'Manchester',
  'Manchester City': 'Manchester',
  'Leeds United': 'Leeds',
  'Cardiff City': 'Cardiff',
  'Port Vale': 'Stoke',
  'Forest Green Rovers': 'Nailsworth',
  'MK Dons': 'Milton Keynes',
  'AFC Fylde': 'Wesham',
  'Accrington Stanley': 'Accrington',
  'Curzon': 'Ashton-under-Lyne',
  'Curzon Ashton': 'Ashton-under-Lyne',
  'Walton and Hersham': 'Walton-on-Thames',
  'Stocksbridge Park Steels': 'Stocksbridge',
  'Billericay': 'Billericay',
}

export function resolveGbPlaceName(teamName: string): string {
  if (CLUB_PLACE_OVERRIDES[teamName]) return CLUB_PLACE_OVERRIDES[teamName]
  if (GB_STADIUM_LOCATIONS[teamName]) return GB_STADIUM_LOCATIONS[teamName].city
  if (LONDON_CLUBS.has(teamName)) return 'London'

  if (teamName.startsWith('Brighton')) return 'Brighton'
  if (teamName.includes('Nottingham')) return 'Nottingham'
  if (teamName.includes('West Bromwich')) return 'West Bromwich'
  if (teamName.includes('Queens Park')) return 'London'

  let m = teamName.match(/^(.+?)\s+United$/i)
  if (m) return m[1]

  m = teamName.match(/^(.+?)\s+City$/i)
  if (m) return m[1]

  m = teamName.match(/^(.+?)\s+Town$/i)
  if (m) return m[1]

  m = teamName.match(/^(.+?)\s+(Rovers|Athletic|Albion|Wanderers|County)$/i)
  if (m) return m[1]

  m = teamName.match(/^AFC\s+(.+)$/i)
  if (m) return m[1]

  m = teamName.match(/^(.+?)\s+Hotspur$/i)
  if (m) return m[1]

  m = teamName.match(/^(.+?)\s+Wednesday$/i)
  if (m) return 'Sheffield'

  m = teamName.match(/^(.+?)\s+Forest$/i)
  if (m) return m[1]

  m = teamName.match(/^(.+?)\s+Villa$/i)
  if (m) return 'Birmingham'

  m = teamName.match(/^(.+?)\s+Palace$/i)
  if (m) return 'London'

  m = teamName.match(/^(.+?)\s+Orient$/i)
  if (m) return 'London'

  m = teamName.match(/^(.+?)\s+North End$/i)
  if (m) return m[1]

  return teamName
}

export function resolveGbClubLocation(
  teamName: string,
  teamId: string | number,
  cities: Record<string, { lat: number; lng: number; countryCode: string }>,
): ClubLocation {
  const stadium = GB_STADIUM_LOCATIONS[teamName]
  if (stadium) return stadium

  const place = resolveGbPlaceName(teamName)
  const entry = cities[place]
  if (entry && entry.countryCode === 'GB') {
    const seed = hashId(teamId)
    return {
      city: place,
      lat: entry.lat + spread(seed, 0),
      lng: entry.lng + spread(seed, 1),
    }
  }

  for (const [name, c] of Object.entries(cities)) {
    if (c.countryCode !== 'GB') continue
    const n = name.toLowerCase()
    const p = place.toLowerCase()
    if (p.includes(n) || n.includes(p)) {
      const seed = hashId(teamId)
      return {
        city: name,
        lat: c.lat + spread(seed, 0),
        lng: c.lng + spread(seed, 1),
      }
    }
  }

  const seed = hashId(teamId)
  return {
    city: place,
    lat: 52.5 + spread(seed, 0),
    lng: -1.5 + spread(seed, 1),
  }
}

function hashId(id: string | number): number {
  const s = String(id)
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 10000
  return h
}

function spread(seed: number, axis: number): number {
  const n = (seed + axis * 97) % 41
  return (n - 20) * 0.004
}
