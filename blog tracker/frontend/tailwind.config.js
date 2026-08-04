/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#12061F',
        panel: '#1E0B3C',
        grape: '#4C1D95',
        bloom: '#8B5CF6',
        glow: '#C4B5FD',
        mist: '#EDE9FE',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
