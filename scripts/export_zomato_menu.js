import * as fs from 'fs';

const raw = fs.readFileSync('scripts/parsed_order_state.json', 'utf8');
const state = JSON.parse(raw);
const resData = state.pages.restaurant['41122'];
const menus = resData.order.menuList.menus;

const allDishes = [];

for (const m of menus) {
  const catName = m.menu.name;
  for (const c of m.menu.categories) {
    for (const it of c.category.items) {
      const item = it.item;
      allDishes.push({
        category: catName,
        name: item.name,
        desc: item.desc || '',
        imageUrl: item.item_image_url || null,
        isVeg: item.dietary_slugs?.includes('veg') || item.tag_slugs?.includes('veg') || false,
        tags: item.tag_slugs || [],
      });
    }
  }
}

console.log(`Total dishes extracted from Katty'z Zomato: ${allDishes.length}`);
const withImages = allDishes.filter(d => d.imageUrl);
console.log(`Dishes with direct Zomato CDN photos: ${withImages.length}`);

fs.writeFileSync('scripts/zomato_dishes.json', JSON.stringify(allDishes, null, 2));
console.log('Saved to scripts/zomato_dishes.json');

// Group by category
const byCat = {};
for (const d of allDishes) {
  if (!byCat[d.category]) byCat[d.category] = [];
  byCat[d.category].push(d);
}

for (const [cat, list] of Object.entries(byCat)) {
  console.log(`\n=== Category: ${cat} (${list.length} items) ===`);
  list.forEach(d => {
    console.log(`  - [${d.isVeg ? 'VEG' : 'NON-VEG'}] ${d.name} ${d.imageUrl ? '📸 (has photo)' : ''}`);
  });
}
