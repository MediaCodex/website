<template>
  <v-container fluid>
    <breadcrumbs :items="breadcrumbs" />
    <section class="mb-6 text-center">
      <h1 class="mb-2 display-3">Anime home</h1>
    </section>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-spacer />
            <v-btn icon color="primary" nuxt exact to="/anime/create">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>Not implemented</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Breadcrumbs from '~/components/breadcrumbs'
export default {
  components: { Breadcrumbs },
  data: () => ({
    breadcrumbs: [
      { icon: 'home', to: '/', disabled: false },
      { text: 'Anime', to: '/anime', disabled: true }
    ]
  })
}
</script>
