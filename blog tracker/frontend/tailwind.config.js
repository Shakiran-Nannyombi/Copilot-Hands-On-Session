/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#05070f',
        ink: '#0b1220',
        navy: '#102542',
        steel: '#1e3a5f',
        sky: '#1d4ed8',
        cyan: '#38bdf8',
      },
    },
  },
  plugins: [],
}
