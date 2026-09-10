import * as fs from 'fs';

const raw = fs.readFileSync('scripts/parsed_order_state.json', 'utf8');
const state = JSON.parse(raw);

const resId = '41122';
const resData = state.pages.restaurant[resId];
const menuList = resData.order.menuList;
const sections = resData.sections;

console.log('--- Restaurant Contact ---');
console.log(JSON.stringify(sections.SECTION_RES_CONTACT, null, 2));

console.log('--- Image Carousel ---');
console.log(JSON.stringify(sections.SECTION_IMAGE_CAROUSEL, null, 2));

console.log('\n--- Menu List Structure ---');
console.log('menuList keys:', Object.keys(menuList));

if (menuList.menus) {
  console.log('Number of menus:', menuList.menus.length);
  for (const menu of menuList.menus) {
    console.log(`\nMenu Category: "${menu.menu.name}" (items count: ${menu.menu.categories ? menu.menu.categories.length : 'no categories'})`);
    if (menu.menu.categories) {
      for (const cat of menu.menu.categories) {
        console.log(`  Subcategory: "${cat.category.name}" (items: ${cat.category.items ? cat.category.items.length : 0})`);
        if (cat.category.items) {
          cat.category.items.slice(0, 3).forEach(it => {
            const item = it.item;
            console.log(`    - [${item.name}] Price: ${item.price} | Desc: ${item.desc?.slice(0, 50)} | Img: ${item.item_image_url || item.item_image_thumb_url || item.thumb}`);
          });
        }
      }
    }
  }
}
