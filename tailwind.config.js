/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          violet: '#4A3A93',    // Katty'z Midnight Violet
          yellow: '#FED41D',    // Katty'z Golden Yellow
          white: '#FAFAFA',     // Off-white for readable sections
          dark: '#1E1B2E',      // Very dark violet/grey for text
        },
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        ui: ['Outfit', 'sans-serif'],
        brand: ['Fredoka', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'hard': '3px 3px 0px 0px rgba(30, 27, 46, 0.9)',
        'hard-hover': '1px 1px 0px 0px rgba(30, 27, 46, 0.9)',
        'soft': '0 16px 40px rgba(30, 27, 46, 0.10)',
      }
    },
  },
  plugins: [],
};
