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
        <settings />
        <profile />
      </v-app-bar>

      <!-- Main content -->
      <v-content>
        <nuxt />
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Meta from '~/assets/js/meta'
import Search from '~/components/navbar/search'
import Routes from '~/components/navbar/routes'
import Profile from '~/components/navbar/profile'
import Settings from '~/components/navbar/settings'
export default {
  components: {
    Search,
    Routes,
    Profile,
    Settings
  },
  middleware: [],
  data: () => ({
    drawer: true
  }),
  head() {
    const i18nSeo = this.$nuxtI18nSeo()
    return {
      htmlAttrs: i18nSeo.htmlAttrs,
      meta: [...Meta, ...i18nSeo.meta],
      link: i18nSeo.link
    }
  }
}
</script>
