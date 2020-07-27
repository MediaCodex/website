<template>
  <v-list-item nuxt :to="to">
    <v-list-item-icon>
      <v-icon v-text="'mdi-pencil'" />
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title v-text="$t(title)" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'EditAction',
  props: {
    to: { type: String, default: undefined },
    title: { type: String, default: 'actions.edit' }
  }
}
</script>
