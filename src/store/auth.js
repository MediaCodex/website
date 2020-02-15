import Auth from '@aws-amplify/auth'

export const state = () => ({
  authenticated: false,
  challenge: false,
  challengeAttributes: null,
  user: null
})

export const mutations = {
  updateUser(state, user) {
    state.user = user
  },
  authenticated(state) {
    state.authenticated = true
    state.challenge = false
    state.challengeAttributes = null
    delete state.user.challengeName
    delete state.user.challengeParam
  },
  challengeMfa(state, type) {
    state.authenticated = false
    state.challenge = 'mfa'
    state.challengeAttributes = type
  },
  challengePassword(state, attr) {
    state.authenticated = false
    state.challenge = 'password'
    state.challengeAttributes = attr
  },
  challengeMfaSetup(state) {
    state.authenticated = false
    state.challenge = 'mfaSetup'
  }
}

export const actions = {
  async login({ commit }, { email, password }) {
    const user = await Auth.signIn(email, password)
    commit('updateUser', user)

    // MFA Code challenge
    if (['SMS_MFA', 'SOFTWARE_TOKEN_MFA'].includes(user.challengeName)) {
      commit('challengeMfa', user.challengeName)
      return false
    }

    // Change password challenge
    else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
      const { requiredAttributes } = user.challengeParam
      commit('challengePassword', requiredAttributes)
      return false
    }

    // MFA setup
    else if (user.challengeName === 'MFA_SETUP') {
      commit('challengeMfaSetup')
      return false
    }

    commit('authenticated')
    return true
  },
  async mfaChallenge({ commit, state }, code) {
    const user = await Auth.confirmSignIn(
      state.user, // object from login
      state.challengeAttributes, // MFA type, e.g. SMS or TOTP
      code // confirmation code
    )
    commit('updateUser', user)
    commit('authenticated')
  },
  async passwordChallenge({ commit, state }, { password, email, phone }) {
    const user = await Auth.completeNewPassword(
      state.user, // object from login
      state.challengeAttributes, // MFA type, e.g. SMS or TOTP
      password, // new password
      { email, phone } // optional required attributes
    )
    commit('updateUser', user)
    commit('authenticated')
  },
  async mfaSetupChallenge({ commit, state }, { password, email, phone }) {
    // TODO
  }
}

export const getters = {}
