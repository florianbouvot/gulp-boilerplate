const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: [
    'src/templates/**/*.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      },
      padding: {
        '16x9': '56.25%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
