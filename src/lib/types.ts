export type ClubMatchOutcome = 'W' | 'D' | 'L' | 'C'

export interface ClubRecentMatch {
  date?: string
  opponent: string
  homeAway?: 'home' | 'away'
  score?: string
  outcome: ClubMatchOutcome
  competition?: string
  status?: string
}

export interface ClubRecentForm {
  wins: number
  draws: number
  losses: number
  cancelled: number
  matches: ClubRecentMatch[]
  source: string
  updatedAt: string
  unavailableReason?: string
}

export interface ClubTrophy {
  name: string
  count?: number
  seasons?: string[]
}

export interface ClubTrophies {
  items: ClubTrophy[]
  source: string
  updatedAt: string
  unavailableReason?: string
}

export interface Club {
  id: string
  name: string
  countryCode: string
  country: string
  city: string
  lat: number
  lng: number
  divisionTier: number
  leagueId: string
  leagueName: string
  season: string
  logoUrl: string
  source: string
  updatedAt: string
  recentForm?: ClubRecentForm
  trophies?: ClubTrophies
}

export interface CountryManifest {
  countryCode: string
  country: string
  clubCount: number
  tiersAvailable: number[]
  file: string
}

export interface DataManifest {
  generatedAt: string
  totalClubs: number
  countries: CountryManifest[]
}

export interface CountryCoverage {
  countryCode: string
  country: string
  tiersAvailable: number[]
  tiersPlanned: number[]
  notes?: string
}

export interface CoverageFile {
  updatedAt: string
  countries: CountryCoverage[]
}

export interface FilterState {
  countryCode: string | null
  city: string | null
  leagueId: string | null
  divisionTiers: number[]
  searchQuery: string
}

/** Max pins when browsing all countries at once; no cap when a country is selected */
export const MAX_VISIBLE_PINS_ALL_COUNTRIES = 5000
export const MAX_VISIBLE_PINS_MOBILE_ALL_COUNTRIES = 600
export const MAX_SIDEBAR_CLUBS_MOBILE_ALL_COUNTRIES = 250

export const ALL_TIERS = [1, 2, 3, 4, 5, 6, 7] as const
