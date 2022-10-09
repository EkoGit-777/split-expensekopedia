/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  corePlugins: {
    container: false,
  },
  theme: {
    // container: {
    //   center: true,
    //   padding: {
    //     DEFAULT: '1rem',
    //   },
    // },
    extend: {
      colors: {
        link: colors.blue['400'],
        primary: colors.blue['800'],
        success: colors.green['800'],
        warning: colors.orange['800'],
      },
    },
  },
  plugins: [
    require('@gradin/tailwindcss-scrollbar'),
  ],
}