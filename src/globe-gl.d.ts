import 'react-globe.gl'

declare module 'react-globe.gl' {
  interface GlobeProps {
    globeTileEngineMaxLevel?: number
  }
}
