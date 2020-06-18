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
  authenticated(state, success = true) {
    state.authenticated = success
    state.challenge = false
    state.challengeAttributes = null
    state.user.challengeName = undefined
    state.user.challengeParam = undefined
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
  },
  challengeConfirm(state) {
    state.authenticated = false
    state.challenge = 'confirm'
  }
}

export const actions = {
  async signin({ commit }, { email, password }) {
    const user = await Auth.signIn(email, password)
    commit('updateUser', user)

    // TODO: 'UserNotConfirmedException'
    // TODO: 'PasswordResetRequiredException'

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
  async signup({ commit }, { username, email, password }) {
    await Auth.signUp({
      username,
      password,
      attributes: { email }
    })
    commit('updateUser', { username, email })
    commit('challengeConfirm')
  },
  async confirmChallenge({ commit, state }, code) {
    await Auth.confirmSignUp(state.user.username, code)
    const user = await Auth.currentAuthenticatedUser()
    commit('updateUser', user)
    commit('authenticated')
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
      password, // new password
      { email, phone } // optional required attributes
    )
    commit('updateUser', user)
    commit('authenticated')
  },
  async mfaSetupChallenge({ commit, state }, { password, email, phone }) {
    // TODO
  },
  async fetchUser({ commit }) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      commit('updateUser', user)
      commit('authenticated')
    } catch (error) {
      commit('user', null)
      commit('authenticated', false)
    }
  }
  // async social({ commit }, provider) {
  //   await Auth.federatedSignIn({ provider })
  // },
  // async oauthCallback({ commit }, url) {
  //   await axios.post(`${baseUrl}/oauth2/token`, {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   })
  // }
}

export const getters = {
  challenge: (state) => {
    if (state.authenticated || !state.challenge) return null
    return {
      type: state.challenge,
      params: state.challengeAttributes
    }
  }
}
