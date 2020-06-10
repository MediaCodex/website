export default {
  mode: 'spa',
  srcDir: 'src/',
  dotenv: { path: '.' },

  /**
   * Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /**
   * Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /**
   * Global CSS
   */
  css: [],

  /**
   * Plugins to load before mounting the App
   */
  plugins: [{ src: '~plugins/amplify-auth', mode: 'client' }],

  /**
   * Nuxt.js dev-modules
   *
   * @see{@link https://github.com/nuxt-community/eslint-module ESLint Module}
   * @see{@link https://github.com/nuxt-community/stylelint-module Stylelint Module}
   */
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify'
  ],

  /**
   * Nuxt.js modules
   *
   * @see{@link https://axios.nuxtjs.org/usage Axios Module}
   * @see{@link https://github.com/nuxt-community/dotenv-module Dotenv Module}
   */
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/dotenv', 'nuxt-i18n'],

  /**
   * Axios module configuration
   * @see{@link https://axios.nuxtjs.org/options}
   */
  axios: {},

  /**
   * i18n Configuration
   * @see{@link https://nuxt-community.github.io/nuxt-i18n/}
   */
  i18n: {
    defaultLocale: 'en',
    lazy: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'en'
    },
    locales: [{ code: 'en', iso: 'en-US', file: 'en-US/index.js' }]
  },
  'nuxt-i18n': {
    seo: false
  },

  vuetify: {
    defaultAssets: {
      icons: 'mdi'
    },
    customVariables: ['~/assets/variables.scss'],
    treeShake: true
  },

  /**
   * Build configuration
   */
  build: {
    // You can extend webpack config here
    extend(config, ctx) {}
  },

  /**
   * Environment variable mapping
   *
   * @see{@link https://nuxtjs.org/api/configuration-env}
   */
  env: {
    DOMAIN_NAME: process.env.DOMAIN_NAME,
    AMPLIFY_AUTH_REGION: process.env.AMPLIFY_AUTH_REGION,
    AMPLIFY_AUTH_POOL_ID: process.env.AMPLIFY_AUTH_POOL_ID,
    AMPLIFY_AUTH_CLIENT_ID: process.env.AMPLIFY_AUTH_CLIENT_ID
  }
}
