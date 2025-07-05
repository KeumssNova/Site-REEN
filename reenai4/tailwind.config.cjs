/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        conthrax: ['Conthrax', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}
