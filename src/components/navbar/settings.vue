<template>
  <v-menu offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on }">
      <v-btn dark icon size="32" v-on="on">
        <v-icon>settings</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        <v-switch
          v-model="$vuetify.theme.dark"
          append-icon="brightness_4"
          :label="$t('settings.darkmode')"
          primary
        />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'Settings'
}
</script>
