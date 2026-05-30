/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // needs to be changed if the src changes
  theme: {
    extend: {
      fontFamily: {
        // pizza: ['Roboto Mono', 'monospace'], // for an specific place for fonts
        sans: ['Roboto Mono', 'monospace'], // for the whole site
      },
      colors: {
        pizza: '#123456',
      },
      fontSize: {
        huge: ['80rem', { lineHeight: '1' }],
      },
      height:{
        screen: '100dvh'
      }
    },
  },
  plugins: [],
};
