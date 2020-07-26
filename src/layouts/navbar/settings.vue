<template>
  <div>
    <v-list-item @click="toggleDarkmode">
      <v-switch
        v-model="isDarkmode"
        append-icon="mdi-brightness-4"
        :label="$t('settings.darkmode')"
        primary
        @change="toggleDarkmode"
      />
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  computed: {
    isDarkmode() {
      return this.$vuetify.theme.dark
    }
  },
  methods: {
    toggleDarkmode() {
      const theme = !this.$vuetify.theme.dark
      this.$cookies.set('vuetify-dark-theme', theme)
      this.$vuetify.theme.dark = theme
    }
  }
}
</script>
