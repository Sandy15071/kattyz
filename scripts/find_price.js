import * as fs from 'fs';

const raw = fs.readFileSync('scripts/parsed_order_state.json', 'utf8');
const state = JSON.parse(raw);

// Find occurrences of the item id ctl_469605083
function findInObject(obj, target, path = '') {
  if (!obj) return;
  if (typeof obj === 'string' && obj === target) {
    console.log('Found exact string at path:', path);
  } else if (typeof obj === 'object') {
    for (const [key, val] of Object.entries(obj)) {
      const p = path ? `${path}.${key}` : key;
      if (key === target) {
        console.log('Found key at path:', p, typeof val);
        if (typeof val === 'object') console.log(JSON.stringify(val, null, 2).slice(0, 300));
      }
      if (val === target) {
        console.log('Found value at path:', p);
      }
      if (typeof val === 'object') {
        findInObject(val, target, p);
      }
    }
  }
}

console.log('Searching for ctl_469605083...');
findInObject(state, 'ctl_469605083');

// Also search for "price" in state.entities or pages
if (state.entities) {
  console.log('Entities keys:', Object.keys(state.entities));
}
