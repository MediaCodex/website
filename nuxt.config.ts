// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  devtools: { enabled: true },

  // app config
  app: {
    cdnURL: ''
  },

  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // @ts-ignore
  googleFonts: {
    download: true,
    families: {
      orbitron: [400]
    }
  },

  // modules
  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts'
  ]
})