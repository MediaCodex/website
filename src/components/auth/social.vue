<template>
  <div>
    <v-btn
      color="#3b5998"
      dark
      block
      width="55"
      :loading="loading"
      @click="facebook"
    >
      <v-icon class="mr-2" width="20" height="20">mdi-facebook</v-icon>
      {{ $t('auth.social.facebook') }}
    </v-btn>
    <v-btn
      color="#4285F4"
      dark
      block
      class="mt-3"
      width="55"
      :loading="loading"
      @click="google"
    >
      <v-icon class="mr-2" color="#db4a39" width="20" height="20">
        mdi-google-plus
      </v-icon>
      {{ $t('auth.social.google') }}
    </v-btn>
    <v-btn
      color="#1DA1F2"
      dark
      block
      class="mt-3"
      width="55"
      :loading="loading"
      @click="twitter"
    >
      <v-icon class="mr-2" width="20" height="20">
        mdi-twitter
      </v-icon>
      {{ $t('auth.social.twitter') }}
    </v-btn>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Social',
  data: () => ({
    loading: false
  }),
  methods: {
    async facebook() {
      this.loading = true
      const provider = new firebase.auth.FacebookAuthProvider()
      await this.$fireAuth.signInWithPopup(provider)
      this.loading = false
    },
    async google() {
      this.loading = true
      const provider = new firebase.auth.GoogleAuthProvider()
      await this.$fireAuth.signInWithPopup(provider)
      this.loading = false
    },
    async twitter() {
      this.loading = true
      const provider = new firebase.auth.TwitterAuthProvider()
      await this.$fireAuth.signInWithPopup(provider)
      this.loading = false
    }
  }
}
</script>
