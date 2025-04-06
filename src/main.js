import { createMap, getInitialLayerId } from './mapInit.js';
import { setupMapLogic } from './mapLogic.js';

const map = createMap();
setupMapLogic(map);

// Set the selected option in the dropdown to match the layer from the URL
const select = document.getElementById('yearSelect');
if (select) select.value = getInitialLayerId(); // ensures dropdown reflects current state

// toggle sidebar
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleSidebar');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('hidden');
  toggleBtn.textContent = sidebar.classList.contains('hidden') ? '☰' : '⛶';
  map.invalidateSize();
});
