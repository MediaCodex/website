<template>
  <v-menu offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on }">
      <v-btn dark icon size="32" v-on="on">
        <v-icon>mdi-cogs</v-icon>
      </v-btn>
    </template>
    <v-list width="230">
      <settings />
    </v-list>
  </v-menu>
</template>

<script>
import Settings from './settings'
export default {
  name: 'Settings',
  components: { Settings }
}
</script>
