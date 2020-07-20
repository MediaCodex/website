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
                  <v-text-field
                    v-model="displayName"
                    :label="$t('profile.displayName')"
                    type="text"
                    outlined
                    required
                    counter="20"
                  />
                </v-form>
              </v-col>

              <!-- dates -->
              <v-col cols="12" md="6">
                <v-form>
                  <h1>nothing here... yet</h1>
                </v-form>
              </v-col>
            </v-row>

            <!-- submit -->
            <v-row>
              <v-col>
                <v-btn primary :loading="submitting" @click="submit">
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
export default {
  middleware: ['auth'],
  data: () => ({
    displayName: '',
    submitting: false
  }),
  mounted() {
    const { displayName } = this.$fireAuth.currentUser
    this.displayName = displayName
  },
  methods: {
    async submit() {
      // TODO: add proper error/success handling
      this.submitting = true
      await this.$fireAuth.currentUser.updateProfile({
        displayName: this.displayName
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
    }
  }
}
</script>
