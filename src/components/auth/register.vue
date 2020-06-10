<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="username"
      name="username"
      autocomplete="username"
      :label="$t('auth.username')"
      prepend-icon="mdi-face"
      type="text"
    />
    <v-text-field
      v-model="email"
      name="email"
      autocomplete="email"
      :label="$t('auth.email')"
      prepend-icon="mdi-email"
      type="email"
    />
    <v-text-field
      v-model="password"
      name="new-password"
      autocomplete="new-password"
      :label="$t('auth.password')"
      prepend-icon="mdi-lock"
      type="password"
    >
    </v-text-field>
    <v-text-field
      v-model="passwordConfirm"
      name="confirm-password"
      autocomplete="confirm-password"
      :label="$t('auth.passwordConfirm')"
      prepend-icon="mdi-lock"
      type="password"
    />
    <v-btn
      :disabled="loading || !valid"
      :loading="loading"
      color="primary"
      block
      @click="register"
    >
      {{ $t('auth.register') }}
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      loading: false,
      valid: false,
      username: null,
      email: null,
      password: null,
      passwordConfirm: null
    }
  },
  methods: {
    async register() {
      if (!this.$refs.form.validate()) return
      this.loading = true

      try {
        const data = {
          username: this.username,
          email: this.email,
          password: this.password
        }
        await this.$store.dispatch('auth/signup', data)
        this.$emit('success')
      } catch (error) {
        this.$emit('error', error.message)
      }

      this.loading = false
    }
  }
}
</script>
