<template>
  <v-container fluid>
    <page-header
      :breadcrumbs="breadcrumbs"
      @refresh="refresh"
      @create="create"
    />
    <v-row>
      <v-col>
        <v-simple-table class="elevation-1">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">{{ $t('companies.name') }}</th>
                <th class="text-left">{{ $t('companies.founded') }}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="company in companies"
                :key="company.name"
                @click="$router.push(`/companies/${company.slug}`)"
              >
                <td>{{ company.name }}</td>
                <td>{{ $moment(company.founded).format('LL') }}</td>
                <td class="d-flex justify-end">
                  <v-icon>mdi-chevron-right</v-icon>
                </td>
              </tr>
              <tr v-if="loading">
                <td colspan="3">
                  <v-btn icon loading xlarge block />
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PageHeader from '~/components/pageHeader'
export default {
  components: { PageHeader },
  async asyncData({ $api }) {
    return { companies: await $api.$get(`/companies`), loading: false }
  },
  data() {
    return {
      breadcrumbs: [
        { icon: 'home', to: '/', disabled: false },
        { text: 'Companies', to: '/companies', disabled: true }
      ],
      companies: [],
      headers: [
        { text: this.$t('companies.name'), value: 'name' },
        { text: this.$t('companies.founded'), value: 'founded' }
      ],
      loading: true
    }
  },
  methods: {
    async refresh() {
      this.loading = true
      this.companies = await this.$api.$get('/companies')
      this.loading = false
    },
    create() {
      this.$router.push('/companies/create')
    }
  }
}
</script>
