# ClubGlobe — Interactive Football Clubs Map

A 3D rotatable world map of football/soccer clubs, filterable by country, city, and division tier (1–7). Club locations appear as pins with team logos.

## Features

- **3D globe** — drag to rotate, scroll to zoom, optional auto-rotate
- **Club pins** — team badges from Fotmob CDN via [RapidAPI Free API Live Football Data](https://rapidapi.com/Creativesdev/api/free-api-live-football-data)
- **Filters** — country, city, division tier, text search
- **Worldwide leagues** — tiers 1–7 where configured in the league map

## Quick start

```bash
npm install
cp .env.example .env   # add your RAPIDAPI_KEY
npm run data:build     # fetch clubs from RapidAPI → public/data/
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run data:build` | RapidAPI ingest + geocode → `public/data/` |
| `npm run data:rapidapi` | Same ingest step only |
| `npm run data:manifest` | Rebuild `manifest.json` from club files |
| `npm run data:seed` | Offline curated seed (legacy / fallback) |
| `npm run data:legacy` | Old TheSportsDB pipeline |
| `npm run data:logos` | Backfill African club logos (Fotmob + Wikipedia) |
| `npm run data:logos:wiki` | Wikipedia-only pass for clubs still missing badges |
| `npm run data:oceania` | Refresh/enrich Oceania club coverage |

## Environment

Copy `.env.example` to `.env`:

- `RAPIDAPI_KEY` — your [RapidAPI](https://rapidapi.com/Creativesdev/api/free-api-live-football-data) key (`X-RapidAPI-Key` header)
- `RAPIDAPI_DELAY_MS` — ms between requests (default `700`; increase if you hit rate limits)
- `RAPIDAPI_MAX_TIER` — highest division tier to ingest (default `7`)

## Data model

Clubs live in [`public/data/clubs/{countryCode}.json`](public/data/clubs/) with schema in [`data/schema/club.schema.json`](data/schema/club.schema.json).

**League configuration:** edit [`data/rapidapi-league-map.json`](data/rapidapi-league-map.json) (Fotmob league `id`, `tier`, `countryCode`). Add cities in [`data/cities.json`](data/cities.json) and [`data/cities-uk.json`](data/cities-uk.json) for better pin placement.

**Discover new leagues** (scans league IDs, slow):

```bash
npm run data:rapidapi -- --discover
```

Standings responses are cached under `data/rapidapi-cache/standings/`.

## API endpoints used

| Endpoint | Purpose |
|----------|---------|
| `football-get-league-detail` | Validate league ID |
| `football-get-standing-all` | Teams in league table |
| `football-popular-leagues` | Reference popular competitions |

## Deployment

```bash
npm run data:build
npm run build
```

Deploy `dist/` to Vercel, Netlify, or GitHub Pages.

## Tech stack

- React 19 + Vite + TypeScript
- [react-globe.gl](https://github.com/vasturiano/react-globe.gl) (Three.js)
- Tailwind CSS v4

## Project structure

```
src/           # React app
scripts/       # data ingestion (RapidAPI)
data/          # league map, cities, coverage
public/data/   # built club JSON + manifest
```
