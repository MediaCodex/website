<template>
  <v-list>
    <v-list-item v-for="item in items" :key="item.to" nuxt :to="item.to">
      <v-list-item-action>
        <v-icon>mdi-{{ item.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'Routes',
  computed: {
    active: () => {}
  },
  data: () => ({
    items: [
      { icon: 'home', title: 'Home', to: '/' },
      { icon: 'help-circle-outline', title: 'Anime', to: '/anime' }
    ]
  })
}
</script>
