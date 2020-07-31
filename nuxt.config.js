import { exponentialDelay, isNetworkOrIdempotentRequestError } from 'axios-retry'
import firebaseConfig from './firebase.config'
export default {
  mode: 'spa',
  srcDir: 'src/',
  dotenv: { path: '.' },

  /**
   * Headers of the page
   */
  head: {
    title: 'MediaCodex',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
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
  plugins: ['~/plugins/axios', '~/plugins/vuetify'],

  /**
   * Nuxt.js dev-modules
   *
   * @see{@link https://github.com/nuxt-community/eslint-module ESLint Module}
   * @see{@link https://github.com/nuxt-community/stylelint-module Stylelint Module}
   */
  buildModules: [
    '@nuxtjs/stylelint-module',
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/moment'
  ],

  /**
   * Nuxt.js modules
   *
   * @see{@link https://github.com/nuxt-community/dotenv-module Dotenv Module}
   */
  modules: [
    'cookie-universal-nuxt',
    '@nuxtjs/firebase',
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-i18n'
  ],

  /**
   * Axios module configuration
   *
   * @see{@link https://axios.nuxtjs.org/options}
   */
  axios: {
    baseURL: `https://api.mediacodex.dev/v1`,
    retry: {
      retries: 3,
      retryDelay: exponentialDelay,
      retryCondition: isNetworkOrIdempotentRequestError
    }
  },

  /**
   * i18n Configuration
   *
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

  /**
   * Vuetify config
   *
   * @see {@link https://github.com/nuxt-community/vuetify-module#options}
   */
  vuetify: {
    treeShake: true,
    defaultAssets: false,
    customVariables: ['~/assets/variables.scss'],
    icons: {
      iconfont: 'mdi'
    },
    theme: {
      options: {
        variations: false
      }
    }
  },

  /**
   * Moment config
   *
   * @see {@link https://github.com/nuxt-community/moment-module#configuration}
   */
  moment: {
    timezone: true,
    defaultLocale: 'en'
    // locales: ['en']
  },

  /**
   * Firebase config
   *
   * @see{@link https://firebase.nuxtjs.org/guide/options/#config}
   */
  firebase: {
    customEnv: true,
    config: firebaseConfig,
    services: {
      auth: {
        initialize: {
          onAuthStateChangedAction: 'auth/onAuthStateChanged'
        }
      },
      analytics: true
    }
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
    FIRE_ENV: process.env.FIRE_ENV || 'development'
  }
}
