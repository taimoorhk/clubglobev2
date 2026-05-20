import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import type { CitiesMap } from './club-data.js'
import { resolveGbClubLocation, type ClubLocation } from './gb-club-locations.js'
import { resolvePlaceName } from './place-names.js'
import { regionFallback } from './region-fallbacks.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const STADIUM_PATH = path.resolve(__dirname, '../../data/stadium-locations.json')

export type { ClubLocation }

const STADIUM_BY_COUNTRY = JSON.parse(
  fs.readFileSync(STADIUM_PATH, 'utf-8'),
) as Record<string, Record<string, ClubLocation>>

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

function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
}

function lookupCity(
  place: string,
  countryCode: string,
  cities: CitiesMap,
): { name: string; lat: number; lng: number } | null {
  const direct = cities[place]
  if (direct && direct.countryCode === countryCode) {
    return { name: place, lat: direct.lat, lng: direct.lng }
  }

  const np = normalize(place)
  for (const [name, entry] of Object.entries(cities)) {
    if (entry.countryCode !== countryCode) continue
    if (normalize(name) === np) {
      return { name, lat: entry.lat, lng: entry.lng }
    }
  }

  if (place.length >= 4) {
    for (const [name, entry] of Object.entries(cities)) {
      if (entry.countryCode !== countryCode) continue
      const nn = normalize(name)
      if (nn === np || nn.startsWith(np) || np.startsWith(nn)) {
        return { name, lat: entry.lat, lng: entry.lng }
      }
    }
  }

  return null
}

export function resolveClubLocation(
  countryCode: string,
  teamName: string,
  teamId: string | number,
  cities: CitiesMap,
): ClubLocation {
  if (countryCode === 'GB') {
    return resolveGbClubLocation(teamName, teamId, cities)
  }

  const stadium = STADIUM_BY_COUNTRY[countryCode]?.[teamName]
  if (stadium) return stadium

  const place = resolvePlaceName(teamName, countryCode)
  const hit = lookupCity(place, countryCode, cities)
  const seed = hashId(teamId)

  if (hit) {
    return {
      city: hit.name,
      lat: hit.lat + spread(seed, 0),
      lng: hit.lng + spread(seed, 1),
    }
  }

  const fb = regionFallback(countryCode)
  return {
    city: place,
    lat: fb.lat + spread(seed, 0),
    lng: fb.lng + spread(seed, 1),
  }
}
