import { useCallback, useRef } from 'react'
import type { GlobeMethods } from 'react-globe.gl'
import type { Club } from '@/lib/types'

/** POV altitude in globe-radius units; ~0 = street level */
export const MIN_ALTITUDE = 0.00001
export const MAX_ALTITUDE = 4

type GlobeWithTiles = GlobeMethods & {
  globeTileEngineMaxLevel?: (level: number) => unknown
}

type ClippableCamera = ReturnType<GlobeMethods['camera']> & {
  near: number
  far: number
  updateProjectionMatrix: () => void
}

/** Prevent z-fighting: tight near plane only when zoomed in */
export function updateCameraClipPlanes(globe: GlobeMethods) {
  const globeR = globe.getGlobeRadius()
  const pov = globe.pointOfView()
  const altitude = Math.max(MIN_ALTITUDE, pov.altitude)
  const camera = globe.camera() as ClippableCamera
  const controls = globe.controls()

  // Near scales with altitude — large when zoomed out, tiny when zoomed in
  camera.near = Math.max(
    globeR * 1e-5,
    Math.min(globeR * 0.08, altitude * globeR * 0.04),
  )
  camera.far = globeR * Math.max(30, 15 + altitude * 60)
  camera.updateProjectionMatrix()

  controls.minDistance = globeR * (1 + Math.max(MIN_ALTITUDE, altitude * 0.0005))
}

export function useGlobeControls() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const autoRotateRef = useRef(true)
  const zoomLimitHandlerRef = useRef<(() => void) | null>(null)

  const setupControls = useCallback((autoRotate: boolean) => {
    const globe = globeRef.current as GlobeWithTiles | undefined
    if (!globe) return

    const controls = globe.controls()
    const globeR = globe.getGlobeRadius()
    const camera = globe.camera() as ClippableCamera

    camera.near = 1e-6
    camera.far = globeR * 2000
    camera.updateProjectionMatrix()

    controls.enableZoom = true
    controls.enableRotate = true
    controls.enablePan = true
    controls.autoRotate = autoRotate
    controls.autoRotateSpeed = 0.35
    // Camera at the surface (distance from earth center = globe radius)
    controls.minDistance = globeR * 1.00001
    controls.maxDistance = globeR * 500

    const tileGlobe = globe as GlobeWithTiles
    if (typeof tileGlobe.globeTileEngineMaxLevel === 'function') {
      const isCompactViewport =
        typeof window !== 'undefined' &&
        window.matchMedia('(max-width: 767px)').matches
      tileGlobe.globeTileEngineMaxLevel(isCompactViewport ? 7 : 19)
    }

    const lights = globe.lights()
    if (lights[1]) lights[1].position.set(0, 0.35, 1)
    if (lights[0]) lights[0].intensity = 1.4

    if (zoomLimitHandlerRef.current) {
      controls.removeEventListener('change', zoomLimitHandlerRef.current)
    }

    const onControlsChange = () => {
      updateCameraClipPlanes(globe)
      const pov = globe.pointOfView()
      controls.zoomSpeed = Math.max(0.8, Math.sqrt(pov.altitude) * 1.5)
    }
    zoomLimitHandlerRef.current = onControlsChange
    controls.addEventListener('change', onControlsChange)
    updateCameraClipPlanes(globe)
  }, [])

  const setAutoRotate = useCallback((enabled: boolean) => {
    autoRotateRef.current = enabled
    const controls = globeRef.current?.controls()
    if (controls) {
      controls.autoRotate = enabled
      controls.autoRotateSpeed = 0.35
    }
  }, [])

  const setAltitude = useCallback((factor: number) => {
    const globe = globeRef.current
    if (!globe) return
    const pov = globe.pointOfView()
    const altitude = Math.max(
      MIN_ALTITUDE,
      Math.min(MAX_ALTITUDE, pov.altitude * factor),
    )
    globe.pointOfView({ ...pov, altitude }, 0)
    updateCameraClipPlanes(globe)
  }, [])

  const zoomIn = useCallback(() => setAltitude(0.55), [setAltitude])
  const zoomOut = useCallback(() => setAltitude(1.6), [setAltitude])

  const flyToClub = useCallback((club: Club) => {
    const globe = globeRef.current
    if (!globe) return

    const controls = globe.controls()
    controls.autoRotate = false
    globe.pointOfView({ lat: club.lat, lng: club.lng, altitude: 0.12 }, 1400)
    window.setTimeout(() => updateCameraClipPlanes(globe), 1450)
  }, [])

  const flyToCountry = useCallback((clubs: Club[]) => {
    if (clubs.length === 0) return
    const lat =
      clubs.reduce((sum, c) => sum + c.lat, 0) / clubs.length
    const lng =
      clubs.reduce((sum, c) => sum + c.lng, 0) / clubs.length
    const spread = Math.max(
      ...clubs.map((c) => Math.abs(c.lat - lat) + Math.abs(c.lng - lng)),
      2,
    )
    const altitude = Math.min(2.5, Math.max(0.15, spread * 0.35))
    globeRef.current?.pointOfView({ lat, lng, altitude }, 1500)
  }, [])

  const resetView = useCallback(() => {
    const globe = globeRef.current
    if (!globe) return

    globe.pointOfView({ lat: 18, lng: 0, altitude: 2.35 }, 1400)
    window.setTimeout(() => updateCameraClipPlanes(globe), 1450)
  }, [])

  return {
    globeRef,
    flyToClub,
    flyToCountry,
    resetView,
    setAutoRotate,
    setupControls,
    zoomIn,
    zoomOut,
    setAltitude,
    autoRotateRef,
  }
}
