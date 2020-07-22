<template>
  <v-container fluid>
    <!-- header -->
    <v-row class="px-4" dense>
      <!-- navigation -->
      <v-col align-self="end"></v-col>

      <!-- title -->
      <v-col>
        <section class="text-center">
          <h1 class="mb-2 display-3">{{ $t('profile.edit') }}</h1>
        </section>
      </v-col>

      <!-- actions -->
      <v-col align="right" justify="end" align-self="end">
        <v-btn icon class="mr-1" @click="refresh">
          <v-icon dark>mdi-refresh</v-icon>
        </v-btn>
        <v-btn icon color="error darken" @click="clear">
          <v-icon dark>mdi-close</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- block one -->
    <v-row>
      <v-col>
        <v-card class="mx-auto">
          <v-card-text>
            <v-row>
              <!-- Basic Info -->
              <v-col cols="12" md="6">
                <v-form>
                  <!-- displayName -->
                  <v-text-field
                    v-model="displayName"
                    :label="$t('profile.displayName')"
                    type="text"
                    outlined
                    required
                    counter="20"
                  />
                  <!-- photoURL -->
                  <v-text-field
                    v-model="photoURL"
                    :label="$t('profile.photoURL')"
                    type="text"
                    outlined
                  />
                </v-form>
              </v-col>

              <!-- dates -->
              <v-col cols="12" md="6">
                <!-- facebook -->
                <icon-btn
                  btn-class="mb-3"
                  btn-color="#3b5998"
                  icon="mdi-facebook"
                  :text="getUsername('facebook.com', 'profile.social.facebook')"
                  :disabled="providers.includes('facebook.com')"
                  @click="linkSocial('facebook')"
                />
                <!-- google -->
                <icon-btn
                  btn-class="mb-3"
                  btn-color="#4285F4"
                  icon="mdi-google-plus"
                  icon-color="#db4a39"
                  :text="getUsername('google.com', 'profile.social.google')"
                  :disabled="providers.includes('google.com')"
                  @click="linkSocial('google')"
                />
                <!-- twitter -->
                <icon-btn
                  btn-color="#1DA1F2"
                  icon="mdi-twitter"
                  :text="getUsername('twitter.com', 'profile.social.twitter')"
                  :disabled="providers.includes('twitter.com')"
                  @click="linkSocial('twitter')"
                />
              </v-col>
            </v-row>

            <!-- submit -->
            <v-row>
              <v-col>
                <v-btn color="primary" :loading="submitting" @click="submit">
                  {{ $t('submit') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase'
import IconBtn from '~/components/iconButton'
export default {
  components: { IconBtn },
  middleware: ['auth'],
  data: () => ({
    submitting: false,
    displayName: undefined,
    photoURL: undefined
  }),
  computed: {
    providers() {
      const providers = this.$fireAuth.currentUser.providerData
      return providers.map((provider) => provider.providerId)
    }
  },
  mounted() {
    const { displayName, photoURL } = this.$fireAuth.currentUser
    this.displayName = displayName
    this.photoURL = photoURL
  },
  methods: {
    async submit() {
      this.submitting = true

      await this.$store.dispatch('auth/updateProfile', {
        displayName: this.displayName,
        photoURL: this.photoURL
      })

      this.submitting = false
    },
    clear() {
      if (confirm('Are you sure?')) {
        Object.assign(this.$data, this.$options.data())
      }
    },
    async refresh() {
      this.data = await this.$fireAuth.currentUser
    },
    async linkSocial(provider) {
      const providers = {
        google: firebase.auth.GoogleAuthProvider,
        twitter: firebase.auth.TwitterAuthProvider,
        facebook: firebase.auth.FacebookAuthProvider
      }
      await this.$fireAuth.currentUser.linkWithPopup(new providers[provider]())
    },
    getUsername(providerId, fallback) {
      const providers = this.$fireAuth.currentUser.providerData
      const provider = providers.find(
        (provider) => provider.providerId === providerId
      )

      if (provider) {
        return provider.displayName
      }

      return this.$t(fallback)
    }
  }
}
</script>
