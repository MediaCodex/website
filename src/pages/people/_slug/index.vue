<template>
  <v-container fluid>
    <!-- header -->
    <page-header :breadcrumbs="breadcrumbs" @refresh="refresh">
      <template v-slot:actions>
        <edit-action :to="`/people/${id}/edit`" title="people.pages.edit" />
        <permalink-action :to="`/people/_${id}`" />
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
                        {{ $t('people.name') }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <!-- Slug -->
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>{{ slug }}</v-list-item-title>
                      <v-list-item-subtitle>
                        {{ $t('people.slug') }}
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
                        {{ $t('people.founded') }}
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
import PageHeader from '~/components/pageHeader'
import { EditAction, PermalinkAction } from '~/components/pageHeader/actions'
export default {
  components: { PageHeader, EditAction, PermalinkAction },

  asyncData({ $api, params }) {
    const idPrefix = /_[a-zA-Z0-9]{10}/
    if (idPrefix.test(params.slug)) {
      return $api.$get(`/people/${params.slug.replace('_', '')}`)
    }

    return $api.$get(`/people/${params.slug}`, {
      params: { slug: true }
    })
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
        { text: this.$t('people.pages.index'), to: '/people' },
        { text: this.name, disabled: true }
      ]
    }
  },

  methods: {
    async refresh() {
      this.loading = true
      const res = await this.$api.$get(`/people/${this.id}`)
      Object.assign(this, res)
      this.loading = false
    }
  }
}
</script>
