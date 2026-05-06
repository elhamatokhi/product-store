/** @type {import('tailwindcss').Config} */
export default {
  // Tell Tailwind where your files are
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  // Enable class-based dark mode
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        brand: {
          light: "#374151",
          DEFAULT: "#111827",
          dark: "#030712",
        },
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      boxShadow: {
        card: "0 2px 10px rgba(0,0,0,0.08)",
      },
    },
  },

  plugins: [],
};