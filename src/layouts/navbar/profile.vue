<template>
  <!-- Avatar -->
  <v-menu v-if="isLoggedIn" offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark icon size="32" v-on="on">
        <v-avatar v-if="user.photoURL" size="32">
          <img :src="user.photoURL" :alt="`@${user.displayName}`" />
        </v-avatar>
        <v-icon v-else size="32" color="white">mdi-account</v-icon>
      </v-btn>
    </template>
    <v-list width="230">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-center">
            @{{ user.displayName }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <settings />
      <v-divider />
      <actions />
    </v-list>
  </v-menu>

  <!-- signin/register -->
  <auth v-else />
</template>

<script>
import Actions from './actions/index'
import Settings from './settings'
import Auth from '~/components/auth'
export default {
  name: 'NavProfile',
  middleware: 'auth',
  components: { Auth, Actions, Settings },
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isLoggedIn']
    },
    user() {
      return this.$store.getters['auth/user']
    }
  }
}
</script>
