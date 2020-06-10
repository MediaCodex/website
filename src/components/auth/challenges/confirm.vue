<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="code"
      name="code"
      autocomplete="code"
      :label="$t('auth.confirmCode')"
      prepend-icon="mdi-check-double"
      type="text"
      class="mb-5"
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
  name: 'ChallengeConfirm',
  data() {
    return {
      loading: false,
      valid: false,
      code: null
    }
  },
  methods: {
    async submit() {
      if (!this.$refs.form.validate()) return
      this.loading = true

      try {
        const data = { code: this.code }
        await this.$store.dispatch('auth/confirmChallenge', data)
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
