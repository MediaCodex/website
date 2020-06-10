<template>
  <v-list dense>
    <v-list-item v-for="item in items" :key="item.text" link>
      <v-list-item-action>
        <v-icon>mdi-{{ item.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          {{ item.text }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'Routes',
  data: () => ({
    items: [{ icon: 'home', text: 'Home' }]
  })
}
</script>
