<template>
  <v-list-item nuxt to="/profile">
    <v-list-item-icon>
      <v-icon>mdi-account-edit</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title v-text="$t('profile.edit')" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'EditProfile'
}
</script>
