/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        redAntd: '#ff4d4f',
        blueAntd: '#1677ff',
        headerDark: '#18181c',
        sidebarDark: '#2c2c32',
        primaryDark: '#101014',
        darkTitle: '#aaaaaa',
        darkHover: '#343438',
        lightText: '#FFFFFFD1',
        lightHover: '#f2f2f2',
        lightTitle: '#606060',
      },
    },
    fontFamily: {
      body: ['Roboto Mono', 'sans-serif'],
      rubikWet: ['Rubik Wet Paint'],
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // <== disable this!
  },
}
