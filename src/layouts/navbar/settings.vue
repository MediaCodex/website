<template>
  <div>
    <v-list-item @click="darkmode">
      <v-switch
        v-model="$vuetify.theme.dark"
        append-icon="mdi-brightness-4"
        :label="$t('settings.darkmode')"
        primary
      />
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  methods: {
    darkmode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>
