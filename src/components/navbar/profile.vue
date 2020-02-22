<template>
  <!-- Avatar -->
  <v-menu v-if="$store.state.auth.authenticated" offset-y>
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark icon v-on="on">
        <v-avatar size="36">
          <img
            src="https://static-cdn.jtvnw.net/jtv_user_pictures/cd6701140ae14505-profile_image-70x70.png"
          />
        </v-avatar>
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
import Auth from './auth'
export default {
  name: 'NavProfile',
  components: {
    Auth
  }
}
</script>
