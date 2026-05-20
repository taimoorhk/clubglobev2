/**
 * Writes curated seed club data (no API) for reliable local development.
 */
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT = path.join(ROOT, 'public', 'data', 'clubs')
const TODAY = new Date().toISOString().slice(0, 10)
const SEASON = '2025-26'

type SeedTeam = {
  name: string
  city: string
  lat: number
  lng: number
  tier: number
  league: string
  leagueId: string
  logoUrl?: string
}

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function toClub(
  t: SeedTeam,
  country: string,
  countryCode: string,
) {
  return {
    id: `${countryCode.toLowerCase()}-${slugify(t.name)}`,
    name: t.name,
    countryCode,
    country,
    city: t.city,
    lat: t.lat,
    lng: t.lng,
    divisionTier: t.tier,
    leagueId: t.leagueId,
    leagueName: t.league,
    season: SEASON,
    logoUrl: t.logoUrl ?? '',
    source: 'seed',
    updatedAt: TODAY,
  }
}

const GB_TEAMS: SeedTeam[] = [
  { name: 'Arsenal', city: 'London', lat: 51.5549, lng: -0.1084, tier: 1, league: 'English Premier League', leagueId: '4328' },
  { name: 'Aston Villa', city: 'Birmingham', lat: 52.509, lng: -1.884, tier: 1, league: 'English Premier League', leagueId: '4328' },
  { name: 'Bournemouth', city: 'Bournemouth', lat: 50.7352, lng: -1.8385, tier: 1, league: 'English Premier League', leagueId: '4328' },
  { name: 'Brentford', city: 'London', lat: 51.4908, lng: -0.2889, tier: 1, league: 'English Premier League', leagueId: '4328' },
  { name: 'Brighton', city: 'Brighton', lat: 50.8607, lng: -0.083, tier: 1, league: 'English Premier League', leagueId: '4328' },
  { name: 'Chelsea', city: 'London', lat: 51.4817, lng: -0.191, tier: 1, league: 'English Premier League', leagueId: '4328' },
  { name: 'Crystal Palace', city: 'London', lat: 51.3983, lng: -0.0861, tier: 1, league: 'English Premier League', leagueId: '4328' },
  { name: 'Everton', city: 'Liverpool', lat: 53.4388, lng: -2.9664, tier: 1, league: 'English Premier League', leagueId: '4328' },
  { name: 'Fulham', city: 'London', lat: 51.475, lng: -0.2214, tier: 1, league: 'English Premier League', leagueId: '4328' },
  { name: 'Liverpool', city: 'Liverpool', lat: 53.4308, lng: -2.9608, tier: 1, league: 'English Premier League', leagueId: '4328' },
  { name: 'Manchester City', city: 'Manchester', lat: 53.4831, lng: -2.2004, tier: 1, league: 'English Premier League', leagueId: '4328' },
  { name: 'Manchester United', city: 'Manchester', lat: 53.4631, lng: -2.2913, tier: 1, league: 'English Premier League', leagueId: '4328' },
  { name: 'Newcastle United', city: 'Newcastle', lat: 54.9756, lng: -1.6217, tier: 1, league: 'English Premier League', leagueId: '4328' },
  { name: 'Nottingham Forest', city: 'Nottingham', lat: 52.94, lng: -1.1327, tier: 1, league: 'English Premier League', leagueId: '4328' },
  { name: 'Tottenham Hotspur', city: 'London', lat: 51.6033, lng: -0.0657, tier: 1, league: 'English Premier League', leagueId: '4328' },
  { name: 'West Ham United', city: 'London', lat: 51.5387, lng: -0.0166, tier: 1, league: 'English Premier League', leagueId: '4328' },
  { name: 'Wolverhampton Wanderers', city: 'Wolverhampton', lat: 52.5903, lng: -2.1305, tier: 1, league: 'English Premier League', leagueId: '4328' },
  { name: 'Leeds United', city: 'Leeds', lat: 53.7772, lng: -1.5722, tier: 2, league: 'English League Championship', leagueId: '4329' },
  { name: 'Burnley', city: 'Burnley', lat: 53.789, lng: -2.2402, tier: 2, league: 'English League Championship', leagueId: '4329' },
  { name: 'Sheffield United', city: 'Sheffield', lat: 53.3703, lng: -1.4707, tier: 2, league: 'English League Championship', leagueId: '4329' },
]

const ES_TEAMS: SeedTeam[] = [
  { name: 'Real Madrid', city: 'Madrid', lat: 40.4531, lng: -3.6883, tier: 1, league: 'Spanish La Liga', leagueId: '4335' },
  { name: 'Barcelona', city: 'Barcelona', lat: 41.3809, lng: 2.1228, tier: 1, league: 'Spanish La Liga', leagueId: '4335' },
  { name: 'Atlético Madrid', city: 'Madrid', lat: 40.4362, lng: -3.5995, tier: 1, league: 'Spanish La Liga', leagueId: '4335' },
  { name: 'Sevilla', city: 'Seville', lat: 37.384, lng: -5.9707, tier: 1, league: 'Spanish La Liga', leagueId: '4335' },
  { name: 'Valencia', city: 'Valencia', lat: 39.4745, lng: -0.3582, tier: 1, league: 'Spanish La Liga', leagueId: '4335' },
  { name: 'Athletic Bilbao', city: 'Bilbao', lat: 43.2642, lng: -2.9491, tier: 1, league: 'Spanish La Liga', leagueId: '4335' },
  { name: 'Real Sociedad', city: 'San Sebastián', lat: 43.3014, lng: -1.9737, tier: 1, league: 'Spanish La Liga', leagueId: '4335' },
  { name: 'Villarreal', city: 'Villarreal', lat: 39.9442, lng: -0.1034, tier: 1, league: 'Spanish La Liga', leagueId: '4335' },
]

const DE_TEAMS: SeedTeam[] = [
  { name: 'Bayern Munich', city: 'Munich', lat: 48.2188, lng: 11.6247, tier: 1, league: 'German Bundesliga', leagueId: '4331' },
  { name: 'Borussia Dortmund', city: 'Dortmund', lat: 51.4926, lng: 7.4518, tier: 1, league: 'German Bundesliga', leagueId: '4331' },
  { name: 'RB Leipzig', city: 'Leipzig', lat: 51.3458, lng: 12.348, tier: 1, league: 'German Bundesliga', leagueId: '4331' },
  { name: 'Bayer Leverkusen', city: 'Leverkusen', lat: 51.0392, lng: 7.002, tier: 1, league: 'German Bundesliga', leagueId: '4331' },
  { name: 'Eintracht Frankfurt', city: 'Frankfurt', lat: 50.0686, lng: 8.6454, tier: 1, league: 'German Bundesliga', leagueId: '4331' },
]

const IT_TEAMS: SeedTeam[] = [
  { name: 'Inter Milan', city: 'Milan', lat: 45.4781, lng: 9.124, tier: 1, league: 'Italian Serie A', leagueId: '4332' },
  { name: 'AC Milan', city: 'Milan', lat: 45.4781, lng: 9.124, tier: 1, league: 'Italian Serie A', leagueId: '4332' },
  { name: 'Juventus', city: 'Turin', lat: 45.1096, lng: 7.6413, tier: 1, league: 'Italian Serie A', leagueId: '4332' },
  { name: 'Napoli', city: 'Naples', lat: 40.8278, lng: 14.193, tier: 1, league: 'Italian Serie A', leagueId: '4332' },
  { name: 'Roma', city: 'Rome', lat: 41.934, lng: 12.4547, tier: 1, league: 'Italian Serie A', leagueId: '4332' },
  { name: 'Lazio', city: 'Rome', lat: 41.9261, lng: 12.4547, tier: 1, league: 'Italian Serie A', leagueId: '4332' },
]

const FR_TEAMS: SeedTeam[] = [
  { name: 'Paris Saint-Germain', city: 'Paris', lat: 48.8414, lng: 2.253, tier: 1, league: 'French Ligue 1', leagueId: '4334' },
  { name: 'Olympique Marseille', city: 'Marseille', lat: 43.2699, lng: 5.3959, tier: 1, league: 'French Ligue 1', leagueId: '4334' },
  { name: 'Olympique Lyon', city: 'Lyon', lat: 45.7652, lng: 4.9821, tier: 1, league: 'French Ligue 1', leagueId: '4334' },
  { name: 'AS Monaco', city: 'Monaco', lat: 43.7277, lng: 7.419, tier: 1, league: 'French Ligue 1', leagueId: '4334' },
  { name: 'Lille', city: 'Lille', lat: 50.6119, lng: 3.1306, tier: 1, league: 'French Ligue 1', leagueId: '4334' },
]

const DATASETS: { code: string; country: string; teams: SeedTeam[] }[] = [
  { code: 'GB', country: 'England', teams: GB_TEAMS },
  { code: 'ES', country: 'Spain', teams: ES_TEAMS },
  { code: 'DE', country: 'Germany', teams: DE_TEAMS },
  { code: 'IT', country: 'Italy', teams: IT_TEAMS },
  { code: 'FR', country: 'France', teams: FR_TEAMS },
]

async function buildManifest() {
  const files = await fs.readdir(OUT)
  const countries = []
  for (const file of files.filter((f) => f.endsWith('.json'))) {
    const code = file.replace('.json', '')
    const clubs = JSON.parse(await fs.readFile(path.join(OUT, file), 'utf-8'))
    const tiers = [...new Set(clubs.map((c: { divisionTier: number }) => c.divisionTier))].sort()
    countries.push({
      countryCode: code,
      country: clubs[0]?.country ?? code,
      clubCount: clubs.length,
      tiersAvailable: tiers,
      file: `clubs/${file}`,
    })
  }
  countries.sort((a, b) => a.country.localeCompare(b.country))
  await fs.writeFile(
    path.join(ROOT, 'public', 'data', 'manifest.json'),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        totalClubs: countries.reduce((s, c) => s + c.clubCount, 0),
        countries,
      },
      null,
      2,
    ),
  )
}

async function main() {
  await fs.mkdir(OUT, { recursive: true })
  await fs.mkdir(path.join(ROOT, 'public', 'data'), { recursive: true })

  for (const { code, country, teams } of DATASETS) {
    const clubs = teams.map((t) => toClub(t, country, code))
    await fs.writeFile(path.join(OUT, `${code}.json`), JSON.stringify(clubs, null, 2))
    console.log(`${code}: ${clubs.length} clubs`)
  }

  await fs.copyFile(
    path.join(ROOT, 'data', 'coverage.json'),
    path.join(ROOT, 'public', 'data', 'coverage.json'),
  )
  await buildManifest()
}

main()
