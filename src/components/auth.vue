<template>
  <mdb-container>
    <mdb-modal :show="show" cascade tabs @close="close">
      <mdb-modal-header color="light-blue darken-3 white-text">
        <mdb-modal-title tag="h4" bold class="w-100">
          {{ $t(`auth.${mode}`) }}
        </mdb-modal-title>
      </mdb-modal-header>

      <!-- Login -->
      <mdb-modal-body v-if="mode === 'login'" class="mx-3 grey-text">
        <mdb-input
          v-model="formData.email"
          name="username"
          autocomplete="username"
          :label="$t('auth.usernameOrEmail')"
          icon="envelope"
          type="email"
          class="mb-3"
          required
        />
        <mdb-input
          v-model="formData.password"
          name="password"
          autocomplete="password"
          :label="$t('auth.password')"
          icon="lock"
          type="password"
          class="mb-3"
          required
        />
        <div class="text-center mb-3">
          <mdb-btn
            color="primary"
            :disabled="loading"
            class="btn-block z-depth-1a"
            @click.native="login"
          >
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span v-else>{{ $t('auth.login') }}</span>
          </mdb-btn>
        </div>
      </mdb-modal-body>

      <!-- Change password -->
      <mdb-modal-body v-if="mode === 'changePassword'" class="mx-3 grey-text">
        <mdb-input
          v-model="formData.password"
          name="new-password"
          autocomplete="new-password"
          :label="$t('auth.password')"
          icon="password"
          type="password"
          class="mb-5"
          required
        />
        <mdb-input
          v-model="formData.passwordConfirm"
          name="confirm-password"
          autocomplete="confirm-password"
          :label="$t('auth.passwordConfirm')"
          icon="lock"
          type="password"
          required
        />
        <div class="text-center mb-3">
          <mdb-btn
            color="primary"
            :disabled="loading"
            class="btn-block z-depth-1a"
            @click.native="submitChallenge"
          >
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span v-else>{{ $t('submit') }}</span>
          </mdb-btn>
        </div>
      </mdb-modal-body>

      <!-- Register -->
      <mdb-modal-body v-if="mode === 'register'" class="mx-3 grey-text">
        <mdb-input
          v-model="formData.username"
          name="username"
          autocomplete="username"
          :label="$t('auth.username')"
          icon="user"
          type="text"
        />
        <mdb-input
          v-model="formData.email"
          name="email"
          autocomplete="email"
          :label="$t('auth.email')"
          icon="envelope"
          type="email"
        />
        <mdb-input
          v-model="formData.password"
          name="new-password"
          autocomplete="new-password"
          :label="$t('auth.password')"
          icon="lock"
          type="password"
        >
        </mdb-input>
        <mdb-input
          v-model="formData.passwordConfirm"
          name="confirm-password"
          autocomplete="confirm-password"
          :label="$t('auth.passwordConfirm')"
          icon="lock"
          type="password"
        />
      </mdb-modal-body>

      <!-- footer -->
      <mdb-modal-footer
        center
        class="font-small grey-text d-flex justify-content-end"
      >
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
      </mdb-modal-footer>

      <!-- errors -->
      <mdb-alert
        v-if="errors.length"
        color="danger"
        class="mb-0 rounded-0"
        dissmiss
      >
        <ul style="list-style-type:disc;">
          <li v-for="(error, index) in errors" :key="index">
            {{ error.message }}
          </li>
        </ul>
      </mdb-alert>
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
      mode: 'register',
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
