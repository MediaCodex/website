<template>
  <!-- Avatar -->
  <v-menu v-if="isLoggedIn" offset-y>
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark icon size="32" v-on="on">
        <v-avatar v-if="avatar" size="32">
          <img :src="photoUrl" />
        </v-avatar>
        <v-icon v-else size="32" color="white">mdi-account</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        <v-list-item-title>{{ $t('navbar.logout') }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>

  <!-- signin/register -->
  <auth v-else />
</template>

<script>
import Auth from '../auth'
export default {
  name: 'NavProfile',
  components: {
    Auth
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isLoggedIn']
    },
    avatar() {
      return this.$store.getters['auth/user'].photoUrl
    }
  }
}
</script>
