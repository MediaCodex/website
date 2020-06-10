<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="password"
      name="new-password"
      autocomplete="new-password"
      :label="$t('auth.password')"
      prepend-icon="mdi-password"
      type="password"
      class="mb-5"
      required
    />
    <v-text-field
      v-model="passwordConfirm"
      name="confirm-password"
      autocomplete="confirm-password"
      :label="$t('auth.passwordConfirm')"
      prepend-icon="mdi-lock"
      type="password"
      required
    />
    <v-btn
      :disabled="loading || !valid"
      :loading="loading"
      color="primary"
      block
      @click="submit"
    >
      {{ $t('submit') }}
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'ChallengePassword',
  data() {
    return {
      loading: false,
      valid: false,
      password: null,
      passwordConfirm: null
    }
  },
  methods: {
    async submit() {
      if (!this.$refs.form.validate()) return
      this.loading = true

      try {
        const data = { password: this.password }
        await this.$store.dispatch('auth/passwordChallenge', data)
        this.$emit('success')
      } catch (error) {
        this.$emit('error', error.message)
      }

      // cleanup
      this.loading = false
    }
  }
}
</script>
