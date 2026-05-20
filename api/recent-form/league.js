const RAPIDAPI_HOST = 'free-api-live-football-data.p.rapidapi.com'

function sendJson(res, statusCode, body) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    sendJson(res, 405, { error: 'Method not allowed' })
    return
  }

  const apiKey = process.env.RAPIDAPI_KEY?.trim()
  if (!apiKey) {
    sendJson(res, 503, { error: 'Missing RAPIDAPI_KEY in Vercel environment' })
    return
  }

  const rawLeagueId = req.query?.leagueId
  const leagueId = Array.isArray(rawLeagueId) ? rawLeagueId[0] : rawLeagueId
  if (!leagueId || !/^\d+$/.test(leagueId)) {
    sendJson(res, 400, { error: 'A numeric leagueId is required' })
    return
  }

  try {
    const upstreamUrl = new URL(
      `https://${RAPIDAPI_HOST}/football-get-all-matches-by-league`,
    )
    upstreamUrl.searchParams.set('leagueid', leagueId)

    const upstream = await fetch(upstreamUrl, {
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': RAPIDAPI_HOST,
      },
    })

    const text = await upstream.text()
    res.statusCode = upstream.status
    res.setHeader(
      'Content-Type',
      upstream.headers.get('content-type') ?? 'application/json',
    )
    res.setHeader('Cache-Control', 'no-store')
    res.end(text)
  } catch (error) {
    sendJson(res, 502, {
      error: error instanceof Error ? error.message : 'RapidAPI request failed',
    })
  }
}
