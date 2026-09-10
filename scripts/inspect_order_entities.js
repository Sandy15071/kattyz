import * as fs from 'fs';

const raw = fs.readFileSync('scripts/parsed_order_state.json', 'utf8');
const state = JSON.parse(raw);

console.log('ORDER entity keys:', Object.keys(state.entities?.ORDER || {}));
if (state.entities?.ORDER) {
  const firstKey = Object.keys(state.entities.ORDER)[0];
  console.log('Sample ORDER entry:', JSON.stringify(state.entities.ORDER[firstKey], null, 2).slice(0, 500));
}

// Search all numbers or keys in state that might be prices or menus
console.log('pages keys:', Object.keys(state.pages || {}));
if (state.pages.postOrder) console.log('postOrder keys:', Object.keys(state.pages.postOrder));
if (state.pages.orderOnline) console.log('orderOnline keys:', Object.keys(state.pages.orderOnline));
