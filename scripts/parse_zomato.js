import * as fs from 'fs';
import * as path from 'path';

const filePath = 'C:\\Users\\adriy\\.gemini\\antigravity-ide\\brain\\09c52529-4726-4cc9-b1c8-938f2400b074\\.system_generated\\steps\\139\\content.md';
const content = fs.readFileSync(filePath, 'utf8');
console.log('Total file length:', content.length);

// Extract all JSON-LD scripts
const jsonLdRegex = /<script data-rh="true" type="application\/ld\+json">([\s\S]*?)<\/script>/g;
let match;
while ((match = jsonLdRegex.exec(content)) !== null) {
  try {
    const data = JSON.parse(match[1]);
    console.log('JSON-LD Type:', data['@type']);
    if (data['@type'] === 'Restaurant') {
      console.log('Restaurant details:', JSON.stringify(data, null, 2));
    }
  } catch (e) {}
}

// Extract image URLs
const imgRegex = /https:\/\/b\.zmtcdn\.com\/[^"'\s\)]+\.(?:jpg|jpeg|png|webp)/gi;
const imgs = [...new Set(content.match(imgRegex) || [])];
console.log('\nFound Zomato CDN Images (' + imgs.length + '):');
imgs.forEach(img => console.log('-', img));

// Search for menu items or page content in HTML
console.log('\nLooking for menu pages or images...');
const menuPageRegex = /https:\/\/b\.zmtcdn\.com\/data\/menus\/[^"'\s\)]+/gi;
const menuPages = [...new Set(content.match(menuPageRegex) || [])];
console.log('Menu pages found:', menuPages);

// Search for any dish names or text in the page
const bodyWithoutTags = content.replace(/<[^>]+>/g, ' ');
const words = bodyWithoutTags.split(/\s+/).filter(w => w.length > 2);
console.log('Total text words:', words.length);
console.log('Sample text snippet:', bodyWithoutTags.slice(0, 1000));
