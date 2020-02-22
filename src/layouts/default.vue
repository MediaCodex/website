<template>
  <div id="app">
    <v-app id="inspire">
      <!-- sidebar -->
      <v-navigation-drawer v-model="drawer" app clipped>
        <routes />
      </v-navigation-drawer>

      <!-- navbar -->
      <v-app-bar app clipped-left dense dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="mr-5 align-center">
          <span class="title">MediaCodex</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <search />
        <profile />
      </v-app-bar>

      <!-- Main content -->
      <nuxt />
    </v-app>
  </div>
</template>

<script>
import Search from '~/components/navbar/search'
import Routes from '~/components/navbar/routes'
import Profile from '~/components/navbar/profile'
export default {
  components: {
    Search,
    Routes,
    Profile
  },
  middleware: ['auth'],
  data: () => ({
    drawer: true
  })
}
</script>
