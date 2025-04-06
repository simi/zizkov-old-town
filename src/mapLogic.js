import * as esri from 'esri-leaflet';
import L from 'leaflet';
import { CONFIG } from './constants';
import { getInitialLayerId } from './mapInit';

function updateState(map, layerId) {
  if(!map) return;

  // Also update hash to reflect the new layer
  const center = map.getCenter();
  const zoom = map.getZoom();
  const hash = `#${zoom.toFixed(2)}/${center.lat.toFixed(5)}/${center.lng.toFixed(5)}/${layerId}`;
  history.replaceState(null, null, hash);
}

export function setupMapLogic(map) {
  const loadingEl = document.getElementById('loading');

  // Base ortho layer
  const orthoLayer = esri.dynamicMapLayer({
    url: CONFIG.serviceUrl,
    layers: [getInitialLayerId() || CONFIG.defaultLayerId],
    opacity: 1
  }).addTo(map);

  // Update ortho layer on year change
  document.getElementById('yearSelect').addEventListener('change', (e) => {
    const layerId = parseInt(e.target.value);
    orthoLayer.setLayers([layerId]);
    updateState(map. layerId);
  });

  map.on('moveend', () => {
    const layerId = parseInt(document.getElementById('yearSelect').value);
    updateState(map, layerId);
  });

  orthoLayer.on('loading', () => {
    loadingEl.classList.remove('hidden');
  });

  orthoLayer.on('load', () => {
    loadingEl.classList.add('hidden');
  });

  const positionEl = document.getElementById('position');
  map.on('mousemove', (e) => {
    positionEl.innerHTML = `Ukazatel: [${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}]`
  });

  const zizkovIcon = L.icon({
    iconUrl: 'marker-mini.png',  // Path relative to the public folder
    iconSize: [48, 48],             // Reasonable display size for 128x128 image
    iconAnchor: [24, 48],           // Point at bottom center
    popupAnchor: [0, -48],          // Popup appears above the marker
  });

  const markerListEl = document.getElementById('markerList');

  CONFIG.markers.forEach(marker => {
    const leafletMarker = L.marker([marker.lat, marker.lng], { icon: zizkovIcon })
      .addTo(map)
      .bindPopup(`
      <b>${marker.title}</b><br>
      <img src="${marker.image}" style="display: block; width: 300px" />
    `);

    // Add to the sidebar marker list
    const listItem = document.createElement('li');
    listItem.textContent = marker.title;
    listItem.style.cursor = 'pointer';

    listItem.addEventListener('click', () => {
      map.setView([marker.lat, marker.lng], 17); // zoom level can be adjusted
      leafletMarker.openPopup();
    });

    markerListEl.appendChild(listItem);
  });
}

