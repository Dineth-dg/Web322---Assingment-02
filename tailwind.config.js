// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// module.exports = {
//   content: ['./views/**/*.ejs'], // watch all .ejs files
//   theme: {
//     extend: {},
//   },
//   plugins: [require('@tailwindcss/typography'), require('daisyui')],
//   daisyui: {
//     themes: ['dim'], // or pick your theme
//   },
// }


module.exports = {
  content: ["./views/**/*.ejs", "./public/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
