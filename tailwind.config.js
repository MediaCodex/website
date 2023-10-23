/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: [
    './src/components/**/*.{js,vue,ts}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/plugins/**/*.{js,ts}',
    './src/app.vue',
    './src/error.vue'
  ],

  theme: {
    fontSize: {
      base: '1.5rem'
    },
    extend: {
      colors: {
        primary: '#7a0026',
        secondary: '#f8edc0'
      }
    }
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss'),
    require('daisyui')
  ]
}
