<template>
  <v-list>
    <!-- top level nav -->
    <v-list-item v-for="item in items" :key="item.to" nuxt :to="item.to">
      <v-list-item-icon>
        <v-icon>mdi-{{ item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="$t(item.title)" />
      </v-list-item-content>
    </v-list-item>

    <!-- misc subnav -->
    <v-list-group key="misc" no-action>
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title v-text="$t('navbar.misc')"></v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item v-for="item in miscItems" :key="item.to" nuxt :to="item.to">
        <v-list-item-content>
          <v-list-item-title v-text="$t(item.title)" />
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script>
export default {
  name: 'Routes',
  data: () => ({
    items: [
      { icon: 'home', title: 'navbar.home', to: '/' },
      { icon: 'help-circle', title: 'anime.pages.index', to: '/anime' }
    ],
    miscItems: [{ title: 'companies.pages.index', to: '/companies' }]
  })
}
</script>
