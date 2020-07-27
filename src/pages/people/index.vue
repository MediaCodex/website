<template>
  <v-container fluid>
    <page-header
      :breadcrumbs="breadcrumbs"
      @refresh="refresh"
      @create="create"
    />
    <v-row>
      <v-col>
        <v-card>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">{{ $t('people.name') }}</th>
                  <th class="text-left">{{ $t('people.born') }}</th>
                  <th class="text-left">{{ $t('people.died') }}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="company in people"
                  :key="company.name"
                  @click="$router.push(`/people/${company.slug}`)"
                >
                  <td>{{ company.name }}</td>
                  <td>{{ $moment(company.born).format('LL') }}</td>
                  <td>{{ $moment(company.died).format('LL') }}</td>
                  <td class="d-flex justify-end">
                    <v-icon>mdi-chevron-right</v-icon>
                  </td>
                </tr>
                <tr v-if="loading">
                  <td colspan="3">
                    <v-btn icon loading x-large block />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PageHeader from '~/components/pageHeader'
export default {
  components: { PageHeader },
  async asyncData({ $api }) {
    return { people: await $api.$get(`/people`), loading: false }
  },
  data() {
    return {
      breadcrumbs: [
        { icon: 'home', to: '/', disabled: false },
        { text: 'people', to: '/people', disabled: true }
      ],
      people: [],
      loading: true
    }
  },
  methods: {
    async refresh() {
      this.loading = true
      this.people = await this.$api.$get('/people')
      this.loading = false
    },
    create() {
      this.$router.push('/people/create')
    }
  }
}
</script>
