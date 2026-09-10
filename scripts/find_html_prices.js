import * as fs from 'fs';

const filePath = 'C:\\Users\\adriy\\.gemini\\antigravity-ide\\brain\\09c52529-4726-4cc9-b1c8-938f2400b074\\.system_generated\\steps\\155\\content.md';
const content = fs.readFileSync(filePath, 'utf8');

// Find occurrences of "Snacky Veg Wrap" in content.md and look at the surrounding text
const idx = content.indexOf('Snacky Veg Wrap');
if (idx !== -1) {
  console.log('Context around Snacky Veg Wrap:\n');
  console.log(content.slice(idx - 200, idx + 500));
} else {
  console.log('Snacky Veg Wrap not found in raw content');
}

// Search for any currency symbols or price spans
const priceRegex = /₹\s*(\d+)/g;
let m;
const prices = [];
while ((m = priceRegex.exec(content)) !== null) {
  prices.push(m[0]);
}
console.log('\nFound ₹ prices:', prices.slice(0, 25));
