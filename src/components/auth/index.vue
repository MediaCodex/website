<template>
  <v-dialog v-model="show" width="500">
    <template v-slot:activator="{ on }">
      <v-btn text class="text-none underscore" v-on="on">
        {{ $t('navbar.login') }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        {{ $t(`auth.${mode}`) }}
      </v-card-title>

      <v-fade-transition group leave-absolute>
        <!-- Login -->
        <v-card-text v-if="mode === 'login'" key="login">
          <login @error="error = $event" @success="challenge" />
        </v-card-text>

        <!-- Register -->
        <v-card-text v-if="mode === 'register'" key="register">
          <register @error="error = $event" @success="challenge" />
        </v-card-text>

        <!-- Change password -->
        <v-card-text v-if="mode === 'passwordChallenge'" key="challengePass">
          <challenge-password @error="error = $event" @success="challenge" />
        </v-card-text>

        <!-- Confirmation code -->
        <v-card-text v-if="mode === 'confirmChallenge'" key="challengeConfirm">
          <challenge-confirm @error="error = $event" @success="challenge" />
        </v-card-text>
      </v-fade-transition>

      <!-- footer -->
      <v-divider class="mx-4"></v-divider>
      <v-subheader>
        <span v-if="mode === 'login'">
          {{ $t('auth.registerMessage') }}
          <a href="#" @click="mode = 'register'">
            {{ $t('auth.register') }}
          </a>
        </span>
        <span v-else>
          {{ $t('auth.loginMessage') }}
          <a href="#" @click="mode = 'login'">
            {{ $t('auth.login') }}
          </a>
        </span>
      </v-subheader>

      <!-- errors -->
      <v-alert v-if="error" type="error" class="mb-0" tile>
        {{ error }}
      </v-alert>
    </v-card>
  </v-dialog>
</template>

<script>
import Login from './login'
import Register from './register'
import ChallengePassword from './challenges/password'
import ChallengeConfirm from './challenges/confirm'
export default {
  name: 'Auth',
  components: {
    Login,
    Register,
    ChallengePassword,
    ChallengeConfirm
  },
  data() {
    return {
      mode: 'login',
      show: false,
      error: null
    }
  },
  watch: {
    mode() {
      this.error = null
    }
  },
  methods: {
    challenge() {
      const challenge = this.$store.getters['auth/challenge']
      if (challenge === null && this.$store.state.auth.authenticated) {
        this.show = false
      }
      this.mode = `${challenge.type}Challenge`
    }
  }
}
</script>
