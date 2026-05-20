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

export interface CityEntry {
  lat: number
  lng: number
  countryCode: string
}

export type CitiesMap = Record<string, CityEntry>

export const SEASON = '2025-26'

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

/** Pull the first nested value whose key matches (case-insensitive). */
export function pickField(obj: unknown, ...keys: string[]): string | undefined {
  if (!obj || typeof obj !== 'object') return undefined
  const record = obj as Record<string, unknown>
  for (const key of keys) {
    const found = Object.entries(record).find(
      ([k]) => k.toLowerCase() === key.toLowerCase(),
    )
    if (found) {
      const v = found[1]
      if (typeof v === 'string' && v.trim()) return v.trim()
      if (typeof v === 'number') return String(v)
    }
  }
  for (const v of Object.values(record)) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      const nested = pickField(v, ...keys)
      if (nested) return nested
    }
  }
  return undefined
}

export function pickNumber(obj: unknown, ...keys: string[]): number | undefined {
  const s = pickField(obj, ...keys)
  if (s === undefined) return undefined
  const n = Number(s)
  return Number.isFinite(n) ? n : undefined
}

const TEAM_SUFFIX =
  /\s+(FC|AFC|United|City|Town|Rovers|Athletic|Albion|Wanderers|Hotspur|County|Stanley|Wimbledon|Villa|Palace|Forest|Wednesday|County)$/i

export function parseCityFromTeamName(name: string): string {
  let cleaned = name.replace(/\s+&\s+.*$/, '').trim()
  for (let i = 0; i < 3; i++) {
    const next = cleaned.replace(TEAM_SUFFIX, '').trim()
    if (next === cleaned) break
    cleaned = next
  }
  return cleaned || name
}

export function geocodeClub(
  city: string,
  countryCode: string,
  cities: CitiesMap,
  teamId: string | number,
  fallback?: { lat: number; lng: number },
): { lat: number; lng: number; city: string } {
  const direct = cities[city]
  if (direct && direct.countryCode === countryCode) {
    return { lat: direct.lat, lng: direct.lng, city }
  }

  const lower = city.toLowerCase()
  for (const [name, entry] of Object.entries(cities)) {
    if (entry.countryCode !== countryCode) continue
    const n = name.toLowerCase()
    if (lower.includes(n) || n.includes(lower)) {
      return { lat: entry.lat, lng: entry.lng, city: name }
    }
  }

  if (fallback) {
    const seed = typeof teamId === 'number' ? teamId : parseInt(String(teamId), 10)
    const jitter = (Number.isFinite(seed) ? seed % 97 : 0) * 0.003
    return {
      lat: fallback.lat + jitter,
      lng: fallback.lng + jitter * 0.7,
      city,
    }
  }

  return { lat: 0, lng: 0, city }
}

export function mergeClubs(existing: Club[], incoming: Club[]): Club[] {
  const byId = new Map(existing.map((c) => [c.id, c]))
  for (const club of incoming) {
    const prev = byId.get(club.id)
    if (!prev) {
      byId.set(club.id, club)
      continue
    }
    const preferIncoming =
      club.source === 'rapidapi' ||
      (club.divisionTier >= (prev.divisionTier ?? 99) && club.source !== 'seed') ||
      prev.lat === 0 ||
      prev.lng === 0
    if (preferIncoming || prev.source !== 'seed') {
      byId.set(club.id, {
        ...prev,
        ...club,
        logoUrl: club.logoUrl || prev.logoUrl,
        lat: club.lat !== 0 ? club.lat : prev.lat,
        lng: club.lng !== 0 ? club.lng : prev.lng,
        recentForm: club.recentForm ?? prev.recentForm,
        trophies: club.trophies ?? prev.trophies,
      })
    }
  }
  return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name))
}
