<template>
  <v-container fluid>
    <!-- header -->
    <page-header :breadcrumbs="breadcrumbs" @refresh="refresh">
      <template v-slot:actions>
        <v-list-item nuxt :to="`/companies/${id}/edit`">
          <v-list-item-icon>
            <v-icon v-text="'mdi-pencil'" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="$t('companies.pages.edit')" />
          </v-list-item-content>
        </v-list-item>
      </template>
    </page-header>

    <!-- block one -->
    <v-row>
      <v-col>
        <v-card class="mx-auto">
          <v-card-text>
            <v-row>
              <!-- Basic Info -->
              <v-col cols="12" md="6">
                <v-list>
                  <!-- Name -->
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>{{ name }}</v-list-item-title>
                      <v-list-item-subtitle>
                        {{ $t('companies.name') }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <!-- Slug -->
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>{{ slug }}</v-list-item-title>
                      <v-list-item-subtitle>
                        {{ $t('companies.slug') }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <!-- Founded -->
                  <v-list-item v-if="founded" two-line>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ $moment(founded).format('LL') }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ $t('companies.founded') }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>

              <!-- dates -->
              <v-col cols="12" md="6"></v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PageHeader from '~/components/header'
export default {
  components: { PageHeader },
  asyncData({ $api, params }) {
    const id = params.slug.split('-').pop()
    return $api.$get(`/companies/${id}`)
  },
  data: () => ({
    loading: true,
    id: undefined,
    slug: undefined,
    name: undefined,
    founded: undefined
  }),
  computed: {
    breadcrumbs() {
      return [
        { icon: 'home', to: '/' },
        { text: this.$t('companies.pages.index'), to: '/companies' },
        { text: this.name, disabled: true }
      ]
    }
  },
  methods: {
    async refresh() {
      this.loading = true
      const res = await this.$api.$get(`/companies/${this.id}`)
      Object.assign(this, res)
      this.loading = false
    }
  }
}
</script>
