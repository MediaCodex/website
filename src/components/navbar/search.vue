<template>
  <!-- <v-layout row align-center>
    <v-text-field
      :append-icon-cb="() => {}"
      :placeholder="$t('navbar.search')"
      single-line
      append-icon="search"
      solo-inverted
      hide-details
      dense
    ></v-text-field>
  </v-layout> -->
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-icon dark v-on="on">search</v-icon>
    </template>
    <span>Coming soon</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'Search'
}
</script>
