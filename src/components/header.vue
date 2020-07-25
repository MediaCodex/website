<template>
  <v-row dense>
    <!-- breadcrumbs -->
    <v-col align-self="end" cols="9">
      <v-breadcrumbs v-if="breadcrumbs" :items="breadcrumbs" class="py-2 pl-2">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            nuxt
            exact
            :to="item.to"
            :disabled="item.disabled"
          >
            <v-icon v-if="item.icon">mdi-{{ item.icon }}</v-icon>
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </v-col>

    <!-- actions -->
    <v-col align-self="end" align="right" cols="3">
      <!-- refresh -->
      <v-btn
        v-if="hasRefreshListener"
        icon
        class="mr-1"
        :title="$t('actions.refresh')"
        @click="$emit('refresh')"
      >
        <v-icon dark>mdi-refresh</v-icon>
      </v-btn>

      <!-- clear -->
      <v-btn
        v-if="hasClearListener"
        icon
        color="error darken"
        :title="$t('actions.clear')"
        @click="$emit('clear')"
      >
        <v-icon dark>mdi-close</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    back: { type: String, default: undefined },
    title: { type: String, default: undefined },
    subtitle: { type: String, default: undefined },
    breadcrumbs: { type: Array, default: undefined }
  },
  computed: {
    hasRefreshListener() {
      return this.$listeners && this.$listeners.refresh
    },
    hasClearListener() {
      return this.$listeners && this.$listeners.clear
    }
  }
}
</script>
