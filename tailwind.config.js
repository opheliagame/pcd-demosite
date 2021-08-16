const colors = require('tailwindcss/colors')

module.exports = {
  purge: [ '_site/**/*.html' ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Poppins'", 'sans-serif']
      },
      gridTemplateRows: {
        // Simple 8 row grid
       '8': 'repeat(8, minmax(0, 1fr))',

        // Complex site-specific row configuration
       'layout': '64px 1fr',

       'speaker-md': '48px auto 1fr',
       'speaker-lg': '48px 1fr 4fr',

       'schedule': 'repeat(6, 1fr)',

      },
    },
    colors: {
      yellow: colors.amber,
      black: colors.black,
      white: colors.white
    },
    animation: {
      'spin-slow': 'spin 8s linear infinite',
      'flutter': 'flutter 3s ease-in-out infinite'
    },
    keyframes: {
      flutter: {
        '0%, 100%': { transform: 'skew(0deg, -15deg)' },
        '50%': { transform: 'skew(0deg, 15deg)' },
      },
      spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform:'rotate(360deg)' }
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
