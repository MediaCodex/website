<template>
  <div>
    <v-btn color="#3b5998" dark block width="55" @click="facebook">
      <v-icon class="mr-2" width="20" height="20">mdi-facebook</v-icon>
      {{ $t('auth.social.facebook') }}
    </v-btn>
    <v-btn color="#4285F4" dark block class="mt-3" width="55" @click="google">
      <v-icon class="mr-2" color="#db4a39" width="20" height="20">
        mdi-google-plus
      </v-icon>
      {{ $t('auth.social.google') }}
    </v-btn>
  </div>
</template>

<script>
import Auth from '@aws-amplify/auth'
export default {
  name: 'Social',
  methods: {
    // facebook() {
    //   const formData = {
    //     response_type: 'code',
    //     client_id: process.env.AMPLIFY_AUTH_CLIENT_ID,
    //     redirect_uri: 'http://localhost:3000/oauth2'
    //   }

    //   const params = Object.keys(formData)
    //     .map(
    //       (key) =>
    //         `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`
    //     )
    //     .join('&')

    //   const cognitoDomain = 'mediacodex-dev.auth.eu-central-1.amazoncognito.com'
    //   window.location.href = `https://${cognitoDomain}/oauth2/authorize?${params}`
    // },
    facebook() {
      Auth.federatedSignIn({ provider: 'Facebook' })
    },
    google() {
      Auth.federatedSignIn({ provider: 'Google' })
    }
  }
}
</script>
