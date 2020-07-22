<template>
  <div>
    <icon-btn
      btn-class="mb-3"
      btn-color="#3b5998"
      icon="mdi-facebook"
      :text="$t('auth.social.facebook')"
      @click="facebook"
    />
    <icon-btn
      btn-class="mb-3"
      btn-color="#4285F4"
      icon="mdi-google-plus"
      icon-color="#db4a39"
      :text="$t('auth.social.google')"
      @click="google"
    />
    <icon-btn
      btn-color="#1DA1F2"
      icon="mdi-twitter"
      :text="$t('auth.social.twitter')"
      @click="twitter"
    />
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import IconBtn from '../iconButton'
export default {
  name: 'Social',
  components: { IconBtn },
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
