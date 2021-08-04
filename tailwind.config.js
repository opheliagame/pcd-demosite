module.exports = {
  purge: [ '_site/**/*.html' ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Noto Sans'", 'sans-serif']
      }
    } 
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
