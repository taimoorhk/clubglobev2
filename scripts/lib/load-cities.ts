import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import type { CitiesMap } from './club-data.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.resolve(__dirname, '../../data')

export async function loadAllCities(): Promise<CitiesMap> {
  const merged: CitiesMap = {}

  const basePath = path.join(DATA_DIR, 'cities.json')
  try {
    Object.assign(
      merged,
      JSON.parse(await fs.readFile(basePath, 'utf-8')) as CitiesMap,
    )
  } catch {
    // optional
  }

  const entries = await fs.readdir(DATA_DIR)
  for (const file of entries) {
    if (!file.startsWith('cities-') || !file.endsWith('.json')) continue
    const chunk = JSON.parse(
      await fs.readFile(path.join(DATA_DIR, file), 'utf-8'),
    ) as CitiesMap
    Object.assign(merged, chunk)
  }

  return merged
}

export async function loadCitiesForCountry(
  countryCode: string,
): Promise<CitiesMap> {
  const all = await loadAllCities()
  const filtered: CitiesMap = {}
  for (const [name, entry] of Object.entries(all)) {
    if (entry.countryCode === countryCode) {
      filtered[name] = entry
    }
  }
  return filtered
}

export function citiesFilePath(countryCode: string): string {
  const slug = countryCode.toLowerCase().replace(/[^a-z0-9-]/g, '-')
  return path.join(DATA_DIR, `cities-${slug}.json`)
}
