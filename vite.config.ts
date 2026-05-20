import {
  defineConfig,
  loadEnv,
  type Plugin,
  type PreviewServer,
  type ViteDevServer,
} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const RAPIDAPI_HOST = 'free-api-live-football-data.p.rapidapi.com'

type JsonResponse = {
  statusCode: number
  setHeader: (name: string, value: string) => void
  end: (body: string) => void
}

function sendJson(res: JsonResponse, statusCode: number, body: unknown) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

function rapidApiRecentFormPlugin(apiKey: string | undefined): Plugin {
  async function handleRequest(
    req: { method?: string; url?: string },
    res: JsonResponse,
    next: () => void,
  ) {
    if (!req.url?.startsWith('/api/recent-form/league')) {
      next()
      return
    }

    if (req.method !== 'GET') {
      sendJson(res, 405, { error: 'Method not allowed' })
      return
    }

    if (!apiKey) {
      sendJson(res, 503, { error: 'Missing RAPIDAPI_KEY in local environment' })
      return
    }

    const url = new URL(req.url, 'http://localhost')
    const leagueId = url.searchParams.get('leagueId')
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

  return {
    name: 'rapidapi-recent-form-proxy',
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req, res, next) => {
        void handleRequest(req, res, next)
      })
    },
    configurePreviewServer(server: PreviewServer) {
      server.middlewares.use((req, res, next) => {
        void handleRequest(req, res, next)
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      rapidApiRecentFormPlugin(env.RAPIDAPI_KEY?.trim()),
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      fs: {
        allow: ['..'],
      },
    },
  }
})
