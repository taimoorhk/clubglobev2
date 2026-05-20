import { useCallback, useEffect, useRef, useState } from 'react'
import Globe from 'react-globe.gl'
import type { GlobeMethods } from 'react-globe.gl'
import type { Club } from '@/lib/types'
import {
  MAX_ALTITUDE,
  MIN_ALTITUDE,
} from '@/hooks/useGlobeControls'
import { MAP_ATTRIBUTION, voyagerTileUrl } from '@/lib/mapTiles'
import { buildClubPinElement } from './ClubPin'

const SKY_TEXTURE =
  'https://unpkg.com/three-globe/example/img/night-sky.png'
/** Base layer visible through tile gaps when zoomed out */
const EARTH_FALLBACK =
  'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'

interface GlobeMapProps {
  clubs: Club[]
  selectedClub: Club | null
  onSelectClub: (club: Club) => void
  onClearSelection: () => void
  globeRef: React.MutableRefObject<GlobeMethods | undefined>
  autoRotate: boolean
  onGlobeReady: () => void
  onZoomIn: () => void
  onZoomOut: () => void
}

export function GlobeMap({
  clubs,
  selectedClub,
  onSelectClub,
  onClearSelection,
  globeRef,
  autoRotate,
  onGlobeReady,
  onZoomIn,
  onZoomOut,
}: GlobeMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const selectedIdRef = useRef<string | null>(null)
  const onSelectRef = useRef(onSelectClub)
  const suppressNextGlobeClickRef = useRef(false)

  useEffect(() => {
    onSelectRef.current = onSelectClub
  }, [onSelectClub])

  useEffect(() => {
    selectedIdRef.current = selectedClub?.id ?? null
  }, [selectedClub])

  useEffect(() => {
    const controls = globeRef.current?.controls()
    if (controls) {
      controls.autoRotate = autoRotate
    }
  }, [autoRotate, globeRef])

  // Direct altitude zoom bypasses OrbitControls min-distance cap
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const globe = globeRef.current
      if (!globe) return
      const pov = globe.pointOfView()
      const factor = e.deltaY > 0 ? 1.1 : 0.9
      const altitude = Math.max(
        MIN_ALTITUDE,
        Math.min(MAX_ALTITUDE, pov.altitude * factor),
      )
      globe.pointOfView({ ...pov, altitude }, 0)
    }

    el.addEventListener('wheel', onWheel, { passive: false, capture: true })
    return () =>
      el.removeEventListener('wheel', onWheel, { capture: true })
  }, [globeRef])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const resize = () => {
      setDimensions({
        width: el.clientWidth || 800,
        height: el.clientHeight || 600,
      })
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleGlobeReady = useCallback(() => {
    onGlobeReady()
  }, [onGlobeReady])

  const handleGlobeClick = useCallback(() => {
    if (suppressNextGlobeClickRef.current) {
      suppressNextGlobeClickRef.current = false
      return
    }
    if (selectedClub) onClearSelection()
  }, [onClearSelection, selectedClub])

  const htmlElement = useCallback((datum: object) => {
    const club = datum as Club
    return buildClubPinElement(club, {
      selected: club.id === selectedIdRef.current,
      onClick: (c) => {
        suppressNextGlobeClickRef.current = true
        onSelectRef.current(c)
        window.setTimeout(() => {
          suppressNextGlobeClickRef.current = false
        }, 200)
      },
    })
  }, [])

  const htmlElementVisibilityModifier = useCallback(
    (el: Element, isVisible: boolean) => {
      const node = el as HTMLElement
      node.style.opacity = isVisible ? '1' : '0'
      node.style.pointerEvents = isVisible ? 'auto' : 'none'
    },
    [],
  )

  return (
    <div
      ref={containerRef}
      className="globe-container relative h-full min-h-[220px] w-full md:min-h-[400px]"
    >
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundImageUrl={SKY_TEXTURE}
        globeImageUrl={EARTH_FALLBACK}
        globeTileEngineUrl={voyagerTileUrl}
        globeTileEngineMaxLevel={19}
        globeCurvatureResolution={4}
        showAtmosphere
        atmosphereColor="#6baed6"
        atmosphereAltitude={0.12}
        onGlobeReady={handleGlobeReady}
        onGlobeClick={handleGlobeClick}
        htmlElementsData={clubs}
        htmlLat={(d) => (d as Club).lat}
        htmlLng={(d) => (d as Club).lng}
        htmlElement={htmlElement}
        htmlElementVisibilityModifier={htmlElementVisibilityModifier}
        htmlTransitionDuration={300}
      />

      <div className="pointer-events-none absolute right-3 top-3 z-10 flex flex-col gap-2 md:right-4 md:top-4">
        <button
          type="button"
          onClick={onZoomIn}
          title="Zoom in (scroll wheel also works)"
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-lg border border-slate-600 bg-slate-900/90 text-lg font-bold text-white shadow-lg hover:bg-slate-800 md:h-9 md:w-9"
        >
          +
        </button>
        <button
          type="button"
          onClick={onZoomOut}
          title="Zoom out"
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-lg border border-slate-600 bg-slate-900/90 text-lg font-bold text-white shadow-lg hover:bg-slate-800 md:h-9 md:w-9"
        >
          −
        </button>
      </div>

      <p className="pointer-events-none absolute bottom-3 right-3 z-10 hidden rounded bg-slate-900/80 px-2 py-1 text-[10px] text-slate-400 sm:block md:right-4">
        Scroll to zoom in deeply · Drag to rotate
      </p>

      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto absolute bottom-3 left-3 z-10 rounded bg-white/90 px-2 py-0.5 text-[10px] text-slate-700 shadow hover:bg-white"
      >
        {MAP_ATTRIBUTION}
      </a>
    </div>
  )
}
