import * as fs from 'fs';

const filePath = 'C:\\Users\\adriy\\.gemini\\antigravity-ide\\brain\\09c52529-4726-4cc9-b1c8-938f2400b074\\.system_generated\\steps\\155\\content.md';
const content = fs.readFileSync(filePath, 'utf8');
console.log('Order page length:', content.length);

// Extract JSON scripts or state data
const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;
while ((match = scriptRegex.exec(content)) !== null) {
  const text = match[1];
  if (text.includes('menu') || text.includes('dish') || text.includes('category') || text.includes('item') || text.includes('price')) {
    console.log(`Script tag #${count}, length: ${text.length}`);
    if (text.includes('JSON.parse')) {
      console.log('  Has JSON.parse!');
      // Extract what is being parsed
      const parseMatch = text.match(/JSON\.parse\("([\s\S]*?)"\)/);
      if (parseMatch) {
        try {
          const unescaped = JSON.parse(`"${parseMatch[1]}"`);
          const parsed = JSON.parse(unescaped);
          fs.writeFileSync('scripts/parsed_order_state.json', JSON.stringify(parsed, null, 2));
          console.log('Successfully saved parsed state to scripts/parsed_order_state.json!');
        } catch (e) {
          console.log('Error unescaping/parsing JSON.parse:', e.message);
        }
      }
    }
  }
  count++;
}

// Also look for item titles and prices directly in HTML
const itemMatches = content.match(/<h4[^>]*>([^<]+)<\/h4>/gi) || [];
console.log('h4 headings found:', itemMatches.length);
itemMatches.slice(0, 20).forEach(h => console.log(' -', h));

// Extract all image urls
const imgRegex = /https:\/\/b\.zmtcdn\.com\/[^"'\s\)]+\.(?:jpg|jpeg|png|webp)/gi;
const imgs = [...new Set(content.match(imgRegex) || [])];
console.log('Found images:', imgs.length);
imgs.slice(0, 20).forEach(i => console.log(' *', i));
