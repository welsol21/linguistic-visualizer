/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media', // или 'class' — если хочешь управлять вручную
  theme: {
    extend: {},
  },
  plugins: [],
};
