<template>
  <v-container fluid>
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item nuxt exact :to="item.to" :disabled="item.disabled">
          <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    <section class="mb-6 text-center">
      <h1 class="mb-2 display-3">Anime home</h1>
    </section>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-spacer />
            <v-btn icon color="primary" nuxt exact to="/anime/create">
              <v-icon dark>add</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>Not implemented</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    breadcrumbs: [
      { icon: 'home', to: '/', disabled: false },
      { text: 'Anime', to: '/anime', disabled: true }
    ]
  })
}
</script>
