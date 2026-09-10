import * as fs from 'fs';

const raw = fs.readFileSync('scripts/parsed_order_state.json', 'utf8');
const state = JSON.parse(raw);

console.log('State top-level keys:', Object.keys(state));

// Traverse to find menu or pages
function searchKeys(obj, path = '') {
  if (!obj || typeof obj !== 'object') return;
  for (const key of Object.keys(obj)) {
    const currentPath = path ? `${path}.${key}` : key;
    if (key.toLowerCase().includes('menu') || key.toLowerCase().includes('section') || key.toLowerCase().includes('dish') || key.toLowerCase().includes('item')) {
      console.log('Found key:', currentPath, Array.isArray(obj[key]) ? `Array(${obj[key].length})` : typeof obj[key]);
    }
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && currentPath.split('.').length < 5) {
      searchKeys(obj[key], currentPath);
    }
  }
}

searchKeys(state);

// Find pages
if (state.pages && state.pages.current) {
  console.log('Current page keys:', Object.keys(state.pages.current));
}
