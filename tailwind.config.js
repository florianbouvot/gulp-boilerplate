const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    mode: 'layers',
    content: [
      'src/templates/**/*.html',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
