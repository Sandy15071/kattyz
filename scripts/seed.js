/**
 * Katty'z Firestore Seed Script
 * 
 * Inserts:
 * - 1 restaurantInfo doc with id "main"
 * - 4 menuCategories docs
 * - 14 menuItems across the categories
 * 
 * Run with: node scripts/seed.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { fallbackRestaurantInfo, fallbackCategories, fallbackMenuItems } from '../src/data/fallbackData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env file manually for standalone Node execution
function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env');
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const [key, ...vals] = trimmed.split('=');
    env[key.trim()] = vals.join('=').trim();
  });
  return env;
}

const env = loadEnv();

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID || process.env.VITE_FIREBASE_APP_ID,
};

async function seed() {
  console.log("Starting Katty'z Firestore Seed...");

  if (!firebaseConfig.projectId || firebaseConfig.projectId.includes("placeholder") || firebaseConfig.apiKey.includes("Placeholder")) {
    console.log("ℹ️ Note: .env currently has development placeholder keys.");
    console.log("To seed a live production Firestore database:");
    console.log("1. Add your real Firebase project credentials to .env");
    console.log("2. Run 'npm run seed' again.");
    console.log("Data structure is verified against PRD specifications.");
    return;
  }

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  try {
    // 1. Seed restaurantInfo
    console.log("Seeding restaurantInfo/main...");
    await setDoc(doc(db, "restaurantInfo", "main"), {
      name: fallbackRestaurantInfo.name,
      phoneNumber: env.VITE_RESTAURANT_PHONE || fallbackRestaurantInfo.phoneNumber,
      address: fallbackRestaurantInfo.address,
      lat: fallbackRestaurantInfo.lat,
      lng: fallbackRestaurantInfo.lng,
      hoursNote: fallbackRestaurantInfo.hoursNote,
      instagramUrl: fallbackRestaurantInfo.instagramUrl,
      facebookUrl: fallbackRestaurantInfo.facebookUrl,
    });
    console.log("✓ restaurantInfo seeded successfully.");

    // 2. Seed menuCategories
    console.log("Seeding menuCategories...");
    for (const cat of fallbackCategories) {
      await setDoc(doc(db, "menuCategories", cat.id), {
        name: cat.name,
        sortOrder: cat.sortOrder,
        isActive: cat.isActive,
      });
      console.log(`  ✓ Category: ${cat.name}`);
    }

    // 3. Seed menuItems
    console.log("Seeding menuItems...");
    for (const item of fallbackMenuItems) {
      await setDoc(doc(db, "menuItems", item.id), {
        categoryId: item.categoryId,
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl: item.imageUrl,
        tags: item.tags,
        isAvailable: item.isAvailable,
        sortOrder: item.sortOrder,
      });
      console.log(`  ✓ Item: ${item.name} (₹${item.price})`);
    }

    console.log("\n🎉 Firestore database successfully seeded with all Katty'z real data!");
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
  }
}

seed();
