<template>
  <mdb-container>
    <mdb-modal :show="show" cascade tabs @close="close">
      <mdb-modal-header color="light-blue darken-3 white-text">
        <h4 class="title pl-5">
          {{ $t(`auth.${mode}`) }}
        </h4>
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
          required
        />
        <mdb-input
          v-model="formData.password"
          name="password"
          autocomplete="password"
          :label="$t('auth.password')"
          icon="lock"
          type="password"
          required
        />
        <div class="text-center mt-3">
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
      <mdb-modal-body
        v-if="mode === 'passwordChallenge'"
        class="mx-3 grey-text"
      >
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
        <div class="text-center mt-3">
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
        <div class="text-center  mt-3">
          <mdb-btn
            color="primary"
            :disabled="loading"
            class="btn-block z-depth-1a"
            @click.native="register"
          >
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span v-else>{{ $t('auth.register') }}</span>
          </mdb-btn>
        </div>
      </mdb-modal-body>

      <!-- Confirmation code -->
      <mdb-modal-body v-if="mode === 'confirmChallenge'" class="mx-3 grey-text">
        <mdb-input
          v-model="formData.code"
          name="code"
          autocomplete="code"
          :label="$t('auth.confirmCode')"
          icon="check-double"
          type="text"
          class="mb-5"
          required
        />
        <div class="text-center mt-3">
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

      <!-- footer -->
      <mdb-modal-footer center class="font-small grey-text justify-content-end">
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
      <mdb-alert v-if="errors.length" color="danger" class="mb-0 rounded-0">
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
