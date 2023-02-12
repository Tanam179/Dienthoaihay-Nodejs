/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/views/**/*.{ejs,hbs,pug}'],
  mode: 'jit',
  theme: {
    extend: {
      borderRadius: {
        "sale-percent-tl": "20px",
        "sale-percent-tr": "100px",
        "sale-percent-br": "100px",

      }
    },
  },
  plugins: [],
}
