<template>
  <v-container fluid>
    <p style="text-align: center;">
      Authenticated: <code>{{ isLoggedIn }}</code>
    </p>
    <p>
      Auth state <code>{{ authUser }}</code>
    </p>
    <p>
      Auth token <code>{{ idToken }}</code>
    </p>
    <v-btn @click="signOut">logout</v-btn>
    <h4>WIP sections:</h4>
    <ul>
      <li><nuxt-link to="/anime">Anime</nuxt-link></li>
    </ul>
  </v-container>
</template>

<script>
export default {
  computed: {
    authUser() {
      return JSON.stringify(this.$store.state.auth.user)
    },
    idToken() {
      return this.$store.state.auth.idToken
    },
    isLoggedIn() {
      return this.$store.getters['auth/isLoggedIn']
    }
  },
  methods: {
    signOut() {
      this.$fireAuth.signOut()
    }
  }
}
</script>
