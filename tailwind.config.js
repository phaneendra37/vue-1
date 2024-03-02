/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,json}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      scrollbar: ['rounded']
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('tailwind-scrollbar')
  ]
}
