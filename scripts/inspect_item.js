import * as fs from 'fs';

const raw = fs.readFileSync('scripts/parsed_order_state.json', 'utf8');
const state = JSON.parse(raw);
const resData = state.pages.restaurant['41122'];
const menus = resData.order.menuList.menus;

const firstCategory = menus[2].menu.categories[0];
const sampleItem = firstCategory.category.items[0].item;

console.log('Sample Item Keys:', Object.keys(sampleItem));
console.log('Sample Item:', JSON.stringify(sampleItem, null, 2));
