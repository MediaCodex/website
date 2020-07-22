/**
 * Add JWT token to request
 *
 * @param {*} store Vuex store
 * @param {*} config Axios request config
 */
// const setAuthToken = async (store, $axios) => {
//   // get current token from store
//   let token = store.getters['auth/idToken']

//   // if no token, try to refresh it
//   if (!token) {
//     await store.dispatch('auth/refreshToken')
//     token = store.getters['auth/idToken']
//   }

//   console.log(token)
//   $axios.setToken(token)
// }

/**
 * Axios plugin
 *
 * @param {object} context Nuxt context
 */
export default function({ $axios, store }, inject) {
  const api = $axios.create()

  // onRequest injections
  api.interceptors.request.use(async (config) => {
    // get current token from store
    let token = store.getters['auth/idToken']

    // if no token, try to refresh it
    if (!token) {
      await store.dispatch('auth/refreshToken')
      await new Promise((resolve) => setTimeout(resolve, 50))
      token = store.getters['auth/idToken']
    }

    config.headers.Authorization = token
    return config
  })

  // Inject to context as $api
  inject('api', api)
}
