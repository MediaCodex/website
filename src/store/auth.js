import firebase from 'firebase'

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
      email: authUser.email
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
  }
}

export const getters = {
  isLoggedIn: (state) => {
    try {
      return state.user.id !== null
    } catch {
      return false
    }
  }
}
