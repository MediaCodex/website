<template>
  <v-list-item-group>
    <v-list-item>
      <v-switch
        v-model="$vuetify.theme.dark"
        append-icon="mdi-brightness-4"
        :label="$t('settings.darkmode')"
        primary
      />
    </v-list-item>
  </v-list-item-group>
</template>

<script>
export default {
  name: 'Settings'
}
</script>
