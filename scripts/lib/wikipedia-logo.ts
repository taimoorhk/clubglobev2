/**
 * Fetches team crest/thumbnail from Wikipedia REST API (fallback when Fotmob has no ID).
 */
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const WIKI_SUMMARY = 'https://en.wikipedia.org/api/rest_v1/page/summary'
const WIKI_SEARCH =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=3'
const DELAY_MS = 300

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CACHE_PATH = path.resolve(__dirname, '../../data/wikipedia-logos.json')

let lastFetch = 0
let cache: Record<string, string> | null = null
let cacheDirty = false

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

async function loadCache(): Promise<Record<string, string>> {
  if (cache) return cache
  try {
    cache = JSON.parse(await fs.readFile(CACHE_PATH, 'utf-8')) as Record<string, string>
  } catch {
    cache = {}
  }
  return cache
}

async function saveCache(): Promise<void> {
  if (!cacheDirty || !cache) return
  await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true })
  await fs.writeFile(CACHE_PATH, JSON.stringify(cache, null, 2))
  cacheDirty = false
}

function cacheKey(teamName: string, country?: string): string {
  return `${country ?? ''}:${teamName}`.toLowerCase()
}

async function throttle(): Promise<void> {
  const elapsed = Date.now() - lastFetch
  if (elapsed < DELAY_MS) await sleep(DELAY_MS - elapsed)
  lastFetch = Date.now()
}

function titleVariants(teamName: string, country?: string): string[] {
  const base = teamName.trim()
  const variants = new Set<string>()
  const wiki = base.replace(/\s+/g, '_')
  variants.add(wiki)
  variants.add(`${wiki}_FC`)
  variants.add(`${wiki}_Football_Club`)
  if (!/FC$/i.test(base)) variants.add(`${wiki}_F.C.`)
  if (country) {
    const c = country.replace(/\s+/g, '_')
    variants.add(`${wiki}_(${c})`)
    variants.add(`${wiki}_F.C._(${c})`)
  }
  return [...variants]
}

async function summaryLogo(title: string): Promise<string> {
  await throttle()
  const res = await fetch(`${WIKI_SUMMARY}/${encodeURIComponent(title)}`, {
    headers: { 'User-Agent': 'ClubGlobe/1.0 (football map; educational)' },
  })
  if (!res.ok) return ''
  const data = (await res.json()) as {
    thumbnail?: { source?: string }
    originalimage?: { source?: string }
  }
  const url = data.thumbnail?.source ?? data.originalimage?.source
  if (url && !url.includes('wikimedia-button')) return url
  return ''
}

async function searchTitles(query: string): Promise<string[]> {
  await throttle()
  const url = new URL(WIKI_SEARCH)
  url.searchParams.set('srsearch', query)
  const res = await fetch(url, {
    headers: { 'User-Agent': 'ClubGlobe/1.0 (football map; educational)' },
  })
  if (!res.ok) return []
  const data = (await res.json()) as {
    query?: { search?: { title: string }[] }
  }
  return (data.query?.search ?? []).map((s) => s.title)
}

export async function fetchWikipediaLogo(
  teamName: string,
  country?: string,
): Promise<string> {
  const store = await loadCache()
  const key = cacheKey(teamName, country)
  if (key in store) return store[key]

  for (const title of titleVariants(teamName, country)) {
    const url = await summaryLogo(title)
    if (url) {
      store[key] = url
      cacheDirty = true
      await saveCache()
      return url
    }
  }

  const queries = [
    `${teamName} football club`,
    country ? `${teamName} ${country} football` : null,
    `${teamName} FC`,
  ].filter(Boolean) as string[]

  for (const q of queries) {
    const titles = await searchTitles(q)
    for (const title of titles) {
      if (!/football|fc|f\.c\.|soccer|club/i.test(title)) continue
      const url = await summaryLogo(title.replace(/ /g, '_'))
      if (url) {
        store[key] = url
        cacheDirty = true
        await saveCache()
        return url
      }
    }
  }

  store[key] = ''
  cacheDirty = true
  await saveCache()
  return ''
}
