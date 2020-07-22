import jwtDecode from 'jwt-decode'
import firebase from 'firebase/app'
import 'firebase/auth'

export const state = () => ({
  user: null,
  claims: null,
  idToken: null
})
const initialState = state()

export const mutations = {
  reset: (state) => {
    Object.assign(state, initialState)
  },

  user: (state, authUser) => {
    state.user = {
      uid: authUser.uid,
      displayName: authUser.displayName,
      photoURL: authUser.photoURL
    }
  },

  claims: (state, claims) => {
    state.claims = claims
  },

  idToken: (state, idToken) => {
    state.idToken = idToken
  }
}

export const actions = {
  onAuthStateChanged({ commit, dispatch }, { authUser }) {
    if (!authUser) {
      commit('reset', null)
      return
    }

    // user profile
    commit('user', authUser)

    // secondary updates
    dispatch('refreshClaims')
    dispatch('refreshToken')
  },

  async refreshClaims({ state, commit }) {
    if (!state.user) {
      commit('claims', null)
      return
    }

    const tokenResult = await firebase.auth().currentUser.getIdTokenResult(true)
    commit('claims', tokenResult.claims)
  },

  async refreshToken({ state, commit }) {
    if (!state.user) {
      commit('claims', null)
      return
    }

    const token = await firebase.auth().currentUser.getIdToken()
    commit('idToken', token)
  },

  async updateProfile({ state, commit }, profile) {
    if (!state.user || typeof profile !== 'object') return

    // update firebase
    await firebase.auth().currentUser.updateProfile(profile)

    // update state
    const user = { ...state.user, ...profile }
    commit('user', user)
  }
}

export const getters = {
  isLoggedIn: (state) => {
    try {
      return state.user.id !== null
    } catch {
      return false
    }
  },

  user: (state) => {
    return state.user || {}
  },

  idToken: (state) => {
    // get current token from state, short-circuit if not set
    const token = state.idToken
    if (!token) return null

    // check expiry of current token
    const expiry = jwtDecode(token).exp
    const target = Math.floor(Date.now() / 1000) + 10

    // return null if token expires too quickly
    if (expiry <= target) {
      return null
    }

    return token
  }
}
