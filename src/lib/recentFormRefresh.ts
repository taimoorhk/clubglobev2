import type {
  Club,
  ClubMatchOutcome,
  ClubRecentForm,
  ClubRecentMatch,
} from './types'

const LAST_MATCH_COUNT = 10
const NO_RECENT_FORM_DATA = 'no data to show'

type ApiEnvelope<T> = {
  response?: T
}

type TeamSide = {
  id?: number | string
  name?: string
  score?: number
}

type MatchStatus = {
  utcTime?: string
  finished?: boolean
  cancelled?: boolean
  scoreStr?: string
  reason?: {
    short?: string
    long?: string
    shortKey?: string
    longKey?: string
  }
}

type LeagueMatch = {
  home?: TeamSide
  away?: TeamSide
  status?: MatchStatus
  tournament?: { name?: string; stage?: string }
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

function normalizeTeamName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/\b(fc|afc|sc|cf|ac|as|club|football club)\b/g, '')
    .replace(/[^a-z0-9]/g, '')
}

function teamIdFromLogo(logoUrl: string): string | null {
  return logoUrl.match(/teamlogo\/(\d+)\.png/)?.[1] ?? null
}

function teamIdKey(id: number | string | undefined): string | null {
  if (id === undefined || id === null || id === '') return null
  return String(id)
}

function addTeamToIndex(
  index: Map<string, string>,
  id: number | string | undefined,
  name?: string,
) {
  const key = teamIdKey(id)
  if (!key || !name) return
  index.set(`id:${key}`, key)
  index.set(`name:${normalizeTeamName(name)}`, key)
}

function buildTeamIndex(matches: LeagueMatch[]): Map<string, string> {
  const index = new Map<string, string>()
  for (const match of matches) {
    addTeamToIndex(index, match.home?.id, match.home?.name)
    addTeamToIndex(index, match.away?.id, match.away?.name)
  }
  return index
}

function clubTeamId(club: Club, index: Map<string, string>): string | null {
  const logoTeamId = teamIdFromLogo(club.logoUrl)
  if (logoTeamId && index.has(`id:${logoTeamId}`)) return logoTeamId
  return index.get(`name:${normalizeTeamName(club.name)}`) ?? null
}

function isCancelled(match: LeagueMatch): boolean {
  const reason = [
    match.status?.reason?.short,
    match.status?.reason?.long,
    match.status?.reason?.shortKey,
    match.status?.reason?.longKey,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return Boolean(
    match.status?.cancelled ||
      reason.includes('cancel') ||
      reason.includes('postpon') ||
      reason.includes('abandon') ||
      reason.includes('suspend'),
  )
}

function isCompletedOrCancelled(match: LeagueMatch): boolean {
  return Boolean(match.status?.finished || isCancelled(match))
}

function sideForTeam(
  match: LeagueMatch,
  teamId: string,
): { side: 'home' | 'away'; team: TeamSide; opponent: TeamSide } | null {
  if (teamIdKey(match.home?.id) === teamId) {
    return { side: 'home', team: match.home ?? {}, opponent: match.away ?? {} }
  }
  if (teamIdKey(match.away?.id) === teamId) {
    return { side: 'away', team: match.away ?? {}, opponent: match.home ?? {} }
  }
  return null
}

function outcomeForMatch(
  match: LeagueMatch,
  team: TeamSide,
  opponent: TeamSide,
): ClubMatchOutcome {
  if (isCancelled(match)) return 'C'
  if (typeof team.score !== 'number' || typeof opponent.score !== 'number') {
    return 'C'
  }
  if (team.score > opponent.score) return 'W'
  if (team.score < opponent.score) return 'L'
  return 'D'
}

function matchScore(match: LeagueMatch, team: TeamSide, opponent: TeamSide): string | undefined {
  if (match.status?.scoreStr) return match.status.scoreStr
  if (typeof team.score === 'number' && typeof opponent.score === 'number') {
    return `${team.score} - ${opponent.score}`
  }
  return undefined
}

function noRecentForm(): ClubRecentForm {
  return {
    wins: 0,
    draws: 0,
    losses: 0,
    cancelled: 0,
    matches: [],
    source: 'rapidapi-live',
    updatedAt: todayIso(),
    unavailableReason: NO_RECENT_FORM_DATA,
  }
}

function recentFormForClub(
  teamId: string | null,
  matches: LeagueMatch[],
): ClubRecentForm {
  if (!teamId) return noRecentForm()

  const recent = matches
    .filter(isCompletedOrCancelled)
    .reduce<ClubRecentMatch[]>((acc, match) => {
      const side = sideForTeam(match, teamId)
      if (!side) return acc
      const date = match.status?.utcTime
      const score = matchScore(match, side.team, side.opponent)
      const competition = match.tournament?.name ?? match.tournament?.stage
      const status = match.status?.reason?.short ?? match.status?.reason?.long
      acc.push({
        ...(date ? { date } : {}),
        opponent: side.opponent.name ?? 'Unknown opponent',
        homeAway: side.side,
        ...(score ? { score } : {}),
        outcome: outcomeForMatch(match, side.team, side.opponent),
        ...(competition ? { competition } : {}),
        ...(status ? { status } : {}),
      })
      return acc
    }, [])
    .sort((a, b) => {
      const aTime = a.date ? Date.parse(a.date) || 0 : 0
      const bTime = b.date ? Date.parse(b.date) || 0 : 0
      return bTime - aTime
    })
    .slice(0, LAST_MATCH_COUNT)

  if (recent.length === 0) return noRecentForm()

  const counts = recent.reduce(
    (acc, match) => {
      if (match.outcome === 'W') acc.wins++
      else if (match.outcome === 'D') acc.draws++
      else if (match.outcome === 'L') acc.losses++
      else acc.cancelled++
      return acc
    },
    { wins: 0, draws: 0, losses: 0, cancelled: 0 },
  )

  return {
    ...counts,
    matches: recent,
    source: 'rapidapi-live',
    updatedAt: todayIso(),
  }
}

export async function fetchLiveRecentFormsForLeague(
  clubs: Club[],
  leagueId: string,
): Promise<Map<string, ClubRecentForm>> {
  if (!/^\d+$/.test(leagueId)) return new Map()

  const response = await fetch(
    `/api/recent-form/league?leagueId=${encodeURIComponent(leagueId)}`,
    { cache: 'no-store' },
  )
  if (!response.ok) {
    const message =
      (await response.json().catch(() => null))?.error ??
      `Recent form refresh failed (${response.status})`
    throw new Error(message)
  }

  const data = (await response.json()) as ApiEnvelope<{ matches?: LeagueMatch[] }>
  const matches = Array.isArray(data.response?.matches)
    ? data.response.matches
    : []
  const teamIndex = buildTeamIndex(matches)
  const updates = new Map<string, ClubRecentForm>()

  for (const club of clubs) {
    if (club.leagueId !== leagueId) continue
    updates.set(club.id, recentFormForClub(clubTeamId(club, teamIndex), matches))
  }

  return updates
}
