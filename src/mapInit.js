import L from 'leaflet';
import proj4 from 'proj4';
import 'proj4leaflet';
import { CONFIG } from './constants';

let { defaultCenter, defaultZoom, defaultLayerId, crs, minZoom, maxZoom } = CONFIG;

// Define CRS for EPSG:5514 (S-JTSK)
proj4.defs(crs.code, crs.def);

const system = new L.Proj.CRS(crs.code, proj4.defs(crs.code), {
  origin: crs.origin,
  resolutions: crs.resolutions,
  transformation: new L.Transformation(1, 0, -1, 0),
  bounds: L.bounds(crs.bounds)
});

// Parse hash: #zoom/lat/lng/layerId
function parseHash() {
  const hash = location.hash.slice(1);
  const [zoomStr, latStr, lngStr, layerStr] = hash.split('/');
  const zoom = parseFloat(zoomStr);
  const lat = parseFloat(latStr);
  const lng = parseFloat(lngStr);
  const layer = parseInt(layerStr);

  const hasCoords = !isNaN(zoom) && !isNaN(lat) && !isNaN(lng);

  return {
    center: hasCoords ? [lat, lng] : defaultCenter,
    zoom: hasCoords ? zoom : defaultZoom,
    layer: !isNaN(layer) ? layer : defaultLayerId
  };
}

// Create map instance
export function createMap() {
  const { center, zoom } = parseHash();

  return L.map('map', {
    system,
    zoom,
    center,
    minZoom: minZoom,
    maxZoom: maxZoom + 10,
  });
}

// Export layer ID helper
export function getInitialLayerId() {
  return parseHash().layer;
}
