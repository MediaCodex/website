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

      <!-- Login -->
      <v-card-text v-if="mode === 'login'">
        <v-text-field
          v-model="formData.email"
          name="username"
          autocomplete="username"
          :label="$t('auth.usernameOrEmail')"
          prepend-icon="email"
          type="email"
          required
        />
        <v-text-field
          v-model="formData.password"
          name="password"
          autocomplete="password"
          :label="$t('auth.password')"
          prepend-icon="lock"
          type="password"
          required
        />
        <v-btn
          :disabled="loading"
          :loading="loading"
          color="primary"
          block
          @click.native="login"
        >
          {{ $t('auth.login') }}
        </v-btn>
      </v-card-text>

      <!-- Change password -->
      <v-card-text v-if="mode === 'passwordChallenge'">
        <v-text-field
          v-model="formData.password"
          name="new-password"
          autocomplete="new-password"
          :label="$t('auth.password')"
          prepend-icon="password"
          type="password"
          class="mb-5"
          required
        />
        <v-text-field
          v-model="formData.passwordConfirm"
          name="confirm-password"
          autocomplete="confirm-password"
          :label="$t('auth.passwordConfirm')"
          prepend-icon="lock"
          type="password"
          required
        />
        <v-btn
          :disabled="loading"
          :loading="loading"
          color="primary"
          block
          @click.native="submitChallenge"
        >
          {{ $t('submit') }}
        </v-btn>
      </v-card-text>

      <!-- Register -->
      <v-card-text v-if="mode === 'register'">
        <v-text-field
          v-model="formData.username"
          name="username"
          autocomplete="username"
          :label="$t('auth.username')"
          prepend-icon="face"
          type="text"
        />
        <v-text-field
          v-model="formData.email"
          name="email"
          autocomplete="email"
          :label="$t('auth.email')"
          prepend-icon="email"
          type="email"
        />
        <v-text-field
          v-model="formData.password"
          name="new-password"
          autocomplete="new-password"
          :label="$t('auth.password')"
          prepend-icon="lock"
          type="password"
        >
        </v-text-field>
        <v-text-field
          v-model="formData.passwordConfirm"
          name="confirm-password"
          autocomplete="confirm-password"
          :label="$t('auth.passwordConfirm')"
          prepend-icon="lock"
          type="password"
        />
        <v-btn
          :disabled="loading"
          :loading="loading"
          color="primary"
          block
          @click.native="register"
        >
          {{ $t('auth.register') }}
        </v-btn>
      </v-card-text>

      <!-- Confirmation code -->
      <v-card-text v-if="mode === 'confirmChallenge'">
        <v-text-field
          v-model="formData.code"
          name="code"
          autocomplete="code"
          :label="$t('auth.confirmCode')"
          prepend-icon="check-double"
          type="text"
          class="mb-5"
          required
        />
        <v-btn
          :disabled="loading"
          :loading="loading"
          color="primary"
          block
          @click.native="submitChallenge"
        >
          {{ $t('submit') }}
        </v-btn>
      </v-card-text>

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
      <v-alert v-if="errors.length" type="error" class="mb-0" tile>
        <ul style="list-style-type:disc;">
          <li v-for="(error, index) in errors" :key="index">
            {{ error.message }}
          </li>
        </ul>
      </v-alert>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Auth',
  data() {
    return {
      show: false,
      mode: 'login',
      loading: false,
      formData: {},
      errors: []
    }
  },
  watch: {
    mode() {
      this.formData = { email: this.formData.email }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async login() {
      this.loading = true
      const form = {
        email: this.formData.email,
        password: this.formData.password
      }
      try {
        await this.$store.dispatch('auth/signin', form)
      } catch (error) {
        this.errors = [error]
      }

      // cleanup
      this.loading = false
      if (!this.$store.getters['auth/challenge']) close()
      else this.challenge()
    },
    challenge() {
      const challenge = this.$store.getters['auth/challenge']
      this.mode = `${challenge.type}Challenge`
    },
    async submitChallenge() {
      this.loading = true
      const challenge = await this.$store.getters['auth/challenge']

      // password change
      if (challenge.type === 'password') {
        if (this.formData.password !== this.formData.passwordConfirm) {
          this.errors = ['Passwords do not match']
          return
        }
        try {
          await this.$store.dispatch('auth/passwordChallenge', {
            password: this.formData.password
          })
        } catch (error) {
          this.errors = [error]
        }
      }

      if (challenge.type === 'confirm') {
        try {
          await this.$store.dispatch(
            'auth/confirmChallenge',
            this.formData.code
          )
        } catch (error) {
          this.errors = [error]
        }
      }

      // cleanup
      this.loading = false
      if (!this.$store.getters['auth/challenge']) close()
      else this.challenge()
    },
    async register() {
      if (this.formData.password !== this.formData.passwordConfirm) {
        this.errors = ['Passwords do not match']
        return
      }
      this.loading = true
      const form = {
        username: this.formData.username,
        email: this.formData.email,
        password: this.formData.password
      }

      try {
        await this.$store.dispatch('auth/signup', form)
      } catch (error) {
        this.errors = [error]
      }

      this.loading = false
      if (!this.$store.getters['auth/challenge']) close()
      else this.challenge()
    }
  }
}
</script>
