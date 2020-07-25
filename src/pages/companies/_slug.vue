<template>
  <v-container fluid>
    <!-- header -->
    <v-row class="px-4" dense>
      <!-- navigation -->
      <v-col align-self="end">
        <v-btn icon nuxt exact to="/companies">
          <v-icon dark>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>

      <!-- title -->
      <v-col>
        <section class="text-center">
          <h1 class="mb-2 display-3">{{ name }}</h1>
        </section>
      </v-col>

      <!-- actions -->
      <v-col align="right" justify="end" align-self="end">
        <v-btn icon class="mr-1" @click="refresh">
          <v-icon dark>mdi-refresh</v-icon>
        </v-btn>
      </v-col>
    </v-row>

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
              <v-col cols="12" md="6">
                <v-form>
                  <date-picker
                    v-model="founded"
                    outlined
                    :label="$t('companies.founded')"
                  />
                </v-form>
              </v-col>
            </v-row>

            <!-- submit -->
            <v-row>
              <v-col>
                <v-btn color="primary" :loading="submitting" @click="submit">
                  {{ $t('submit') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  asyncData({ $api, params }) {
    return $api.$get(`/companies/${params.slug}`)
  },
  data: () => ({
    loading: true,
    id: '',
    slug: undefined,
    name: undefined,
    founded: undefined
  }),
  methods: {
    refresh() {
      this.asyncData()
    }
  }
}
</script>
