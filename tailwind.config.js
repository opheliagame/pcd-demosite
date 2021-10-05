const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './_site/**/*.html',
    
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      'xxs': '.50rem',
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    extend: {
      boxShadow: {
        pink: '1em 1em rgba(170, 67, 111, 1.0)'
      },
      zIndex: {
        '-10': '-10',
      },
      fontFamily: {
        sans: ["'Open Sans'"],
        serif: ["'Noto Serif'"],
        head: ["'Archivo Black'", 'sans-serif']
      },
      gridTemplateRows: {
        // Simple 8 row grid
       '8': 'repeat(8, minmax(0, 1fr))',

        // Complex site-specific row configuration
       'layout': 'auto 1fr',

       'speaker-md': '1.5rem auto 1fr auto 1.5rem',

       'schedule': 'repeat(6, 1fr)',

      },
      gridTemplateColumns: {
        'speaker-md': '2fr 1fr',
        'speaker': '1.5fr 0.5fr 1fr'
      },
      scale: {
        '-100': '-1'
      },
      skew: {
        '32': '32deg',
        '48': '48deg',
        '-48': '-48deg'
      },
      minHeight: {
        '2/3': '66%'
      }
    },
    colors: {
      yellow: colors.amber,
      black: colors.black,
      white: colors.white,
      blue: colors.blue,
      pink: {
        DEFAULT: '#AA436F'
      },
      purple: {
        DEFAULT: '#9F62AE',
        '100': '#D7D5EB'
      },
      brown: {
        DEFAULT: '#BF7958'
      }
    },
    animation: {
      'spin-slow': 'spin 8s linear infinite',
      'flutter': 'flutter 3s ease-in-out infinite',
      'move-shadow': 'moveShadow 8s ease-in-out infinite',
    },
    keyframes: {
      flutter: {
        '0%, 100%': { transform: 'skew(0deg, -15deg)' },
        '50%': { transform: 'skew(0deg, 15deg)' },
      },
      spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform:'rotate(360deg)' }
      },
      moveShadow: {
        '0%, 100%': { transform: 'translateX(10px) skew(-48deg, 0deg)' },
        '50%': { transform: 'translateX(-20px) skew(64deg, 0deg)' },
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
