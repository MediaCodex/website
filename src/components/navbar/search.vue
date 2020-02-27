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
  <v-btn dark icon size="32" disabled>
    <v-icon>search</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'Search'
}
</script>
