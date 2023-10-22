/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blueAntd: '#1677ff',
        lightHover: '#f2f2f2',
        lightTitle: '#606060',
        darkTitle: '#aaaaaa',
      },
    },
    fontFamily: {
      body: ['Roboto', 'sans-serif'],
      rubikWet: ['Rubik Wet Paint'],
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // <== disable this!
  },
}
