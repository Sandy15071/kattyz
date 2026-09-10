import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Determine whether we have a real Firebase project ID configured
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== "AIzaSyPlaceholderKeyForLocalDevelopment123" &&
  firebaseConfig.apiKey !== "your_api_key_here" &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== "kattyz-thane" &&
  firebaseConfig.projectId !== "kattyz-fastfood"
);

let app = null;
let db = null;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase initialization warning (running in local fallback mode):", error.message);
  db = null;
}

export { app, db };
export default app;
