<template>
  <v-container fluid>
    <page-header :breadcrumbs="breadcrumbs" />
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-spacer />
            <v-btn icon color="primary" nuxt exact to="/companies/create">
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
import PageHeader from '~/components/header'
export default {
  components: { PageHeader },
  data: () => ({
    breadcrumbs: [
      { icon: 'home', to: '/', disabled: false },
      { text: 'Companies', to: '/companies', disabled: true }
    ]
  })
}
</script>
