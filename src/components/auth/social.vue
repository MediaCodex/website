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
    facebook: () => Auth.federatedSignIn({ provider: 'Facebook' }),
    google: () => Auth.federatedSignIn({ provider: 'Google' })
  }
}
</script>
