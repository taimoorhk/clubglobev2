/**
 * Slippy-map tiles for globe.gl — loads sharper detail as you zoom in.
 * CARTO Voyager: streets, city/town labels (OpenStreetMap data).
 */
export function voyagerTileUrl(x: number, y: number, level: number): string {
  // Standard tiles (no @2x) so high zoom levels load reliably
  return `https://basemaps.cartocdn.com/rastertiles/voyager/${level}/${x}/${y}.png`
}

export const MAP_ATTRIBUTION =
  '© OpenStreetMap contributors · © CARTO'
