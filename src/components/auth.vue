<template>
  <mdb-container>
    <mdb-modal :show="show" cascade tabs @close="close">
      <mdb-modal-header color="light-blue darken-3 white-text">
        <mdb-modal-title tag="h4" bold class="w-100">
          {{ $t(`auth.${mode}`) }}
        </mdb-modal-title>
      </mdb-modal-header>

      <!-- errors -->
      <mdb-alert v-if="!loading && errors.length" color="danger">
        <ul>
          <li v-for="(error, index) in errors" :key="index">
            {{ error.message }}
          </li>
        </ul>
      </mdb-alert>

      <!-- Login -->
      <mdb-modal-body v-if="mode === 'login'" class="mx-3 grey-text">
        <mdb-input
          v-model="formData.email"
          :label="$t('auth.usernameOrEmail')"
          icon="envelope"
          type="email"
          class="mb-5"
          required
        />
        <mdb-input
          v-model="formData.password"
          :label="$t('auth.password')"
          icon="lock"
          type="password"
          required
        />
        <a>No account? Create One</a>
        <mdb-btn v-if="loading" color="primary" class="float-right" disabled>
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span class="sr-only">Loading...</span>
        </mdb-btn>
        <mdb-btn
          v-else
          color="primary"
          class="float-right"
          @click.native="login"
        >
          {{ $t('auth.login') }}
        </mdb-btn>
      </mdb-modal-body>

      <!-- Change password -->
      <mdb-modal-body v-if="mode === 'changePassword'" class="mx-3 grey-text">
        <mdb-input
          v-model="formData.password"
          :label="$t('auth.password')"
          icon="password"
          type="password"
          class="mb-5"
          required
        />
        <mdb-input
          v-model="formData.passwordConfirm"
          :label="$t('auth.passwordConfirm')"
          icon="lock"
          type="password"
          required
        />
        <mdb-btn v-if="loading" color="primary" class="float-right" disabled>
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span class="sr-only">Loading...</span>
        </mdb-btn>
        <mdb-btn
          v-else
          color="primary"
          class="float-right"
          @click.native="submitChallenge"
        >
          {{ $t('submit') }}
        </mdb-btn>
      </mdb-modal-body>

      <!-- footer -->
      <mdb-modal-footer center>
        Social buttons here
      </mdb-modal-footer>
    </mdb-modal>
  </mdb-container>
</template>

<script>
import {
  mdbContainer,
  mdbBtn,
  mdbModal,
  mdbModalHeader,
  mdbModalBody,
  mdbModalFooter,
  mdbInput,
  mdbModalTitle,
  mdbAlert
} from 'mdbvue'
export default {
  name: 'Auth',
  components: {
    mdbContainer,
    mdbBtn,
    mdbModal,
    mdbModalHeader,
    mdbModalBody,
    mdbModalFooter,
    mdbInput,
    mdbModalTitle,
    mdbAlert
  },
  props: { show: { type: Boolean, default: false } },
  data() {
    return {
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
        await this.$store.dispatch('auth/login', form)
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
      if (challenge.type === 'password') this.mode = 'changePassword'
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

      // cleanup
      this.loading = false
      if (!this.$store.getters['auth/challenge']) close()
      else this.challenge()
    }
  }
}
</script>
