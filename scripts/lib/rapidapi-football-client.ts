const HOST = 'free-api-live-football-data.p.rapidapi.com'
const BASE = `https://${HOST}`

const DELAY_MS = Number(process.env.RAPIDAPI_DELAY_MS ?? 700)

let lastRequestAt = 0

export class RapidApiFootballError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message)
    this.name = 'RapidApiFootballError'
  }
}

async function throttle(): Promise<void> {
  const elapsed = Date.now() - lastRequestAt
  if (elapsed < DELAY_MS) {
    await new Promise((r) => setTimeout(r, DELAY_MS - elapsed))
  }
  lastRequestAt = Date.now()
}

export async function rapidFetch<T>(
  apiKey: string,
  endpoint: string,
  params?: Record<string, string | number | undefined>,
  attempt = 0,
): Promise<T> {
  await throttle()
  const url = new URL(`${BASE}/${endpoint.replace(/^\//, '')}`)
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== '') url.searchParams.set(k, String(v))
    }
  }

  const res = await fetch(url, {
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': HOST,
    },
  })

  if (res.status === 429) {
    if (attempt >= 2) {
      throw new RapidApiFootballError(
        'Rate limit exceeded (hourly quota). Wait and re-run, or increase RAPIDAPI_DELAY_MS.',
        429,
      )
    }
    const retryAfter = Number(res.headers.get('retry-after') ?? 60)
    await new Promise((r) => setTimeout(r, retryAfter * 1000))
    return rapidFetch<T>(apiKey, endpoint, params, attempt + 1)
  }

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new RapidApiFootballError(
      `RapidAPI ${res.status} ${endpoint}${body ? `: ${body.slice(0, 200)}` : ''}`,
      res.status,
    )
  }

  return res.json() as Promise<T>
}

export interface ApiEnvelope<T> {
  status: string
  message?: string
  response: T
}

export interface LeagueSummary {
  id: number
  name: string
  localizedName?: string
  ccode?: string
  logo?: string
}

export interface LeagueDetail {
  id: number
  type?: string
  name: string
  country?: string
  shortName?: string
  seopath?: string
}

export interface StandingRow {
  id: number
  name: string
  shortName?: string
  pageUrl?: string
}

export function teamLogoUrl(teamId: number | string): string {
  return `https://images.fotmob.com/image_resources/logo/teamlogo/${teamId}.png`
}
