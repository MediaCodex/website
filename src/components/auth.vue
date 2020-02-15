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
          class="mb-5 error"
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

      <!-- footer -->
      <mdb-modal-footer v-if="!loading" center>
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
import Joi from '@hapi/joi'
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
      loginSchema: Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }),
        password: Joi.string().min(5)
      }),
      formData: {
        email: '',
        password: ''
      },
      errors: []
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async validate(schema) {
      try {
        await schema.validateAsync(this.formData, {
          abortEarly: false
        })
      } catch (e) {
        this.errors = e.details
        return
      }
      this.errors = []
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
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
