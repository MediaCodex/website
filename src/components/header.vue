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
      <!-- options menu -->
      <v-menu v-if="hasActions" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon class="mr-1" v-on="on">
            <v-icon dark>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list width="230">
          <slot name="actions"></slot>
        </v-list>
      </v-menu>

      <!-- refresh -->
      <v-btn
        v-if="hasRefresh"
        icon
        class="mr-1"
        :title="$t('actions.refresh')"
        @click="$emit('refresh')"
      >
        <v-icon dark>mdi-refresh</v-icon>
      </v-btn>

      <!-- clear -->
      <v-btn
        v-if="hasClear"
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
    hasRefresh() {
      return this.$listeners && this.$listeners.refresh
    },
    hasClear() {
      return this.$listeners && this.$listeners.clear
    },
    hasActions() {
      return this.$slots && this.$slots.actions
    }
  }
}
</script>
