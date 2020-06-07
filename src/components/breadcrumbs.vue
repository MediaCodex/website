<template>
  <v-breadcrumbs :items="items">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item nuxt exact :to="item.to" :disabled="item.disabled">
        <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
        {{ item.text }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: {
    items: { type: Array, default: null }
  }
}
</script>
