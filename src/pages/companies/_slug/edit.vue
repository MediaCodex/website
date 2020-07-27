<template>
  <v-container fluid>
    <!-- header -->
    <page-header :breadcrumbs="breadcrumbs" @refresh="refresh" @clear="clear" />

    <!-- block one -->
    <v-row>
      <v-col>
        <v-card class="mx-auto">
          <v-card-text>
            <v-row>
              <!-- Basic Info -->
              <v-col cols="12" md="6">
                <v-form>
                  <v-text-field
                    v-model="name"
                    :label="$t('companies.name')"
                    type="text"
                    outlined
                    required
                    counter="255"
                  />
                  <v-text-field
                    v-model="slug"
                    :label="$t('companies.slug')"
                    type="text"
                    outlined
                    required
                    counter="100"
                    :placeholder="defaultSlug"
                  />
                </v-form>
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
import { paramCase } from 'change-case'
import DatePicker from '~/components/DatePicker'
import PageHeader from '~/components/pageHeader'
export default {
  components: { DatePicker, PageHeader },
  middleware: ['auth'],
  asyncData({ $api, params }) {
    return $api.$get(`/companies/${params.slug}`)
  },
  data: () => ({
    submitting: false,
    // form data
    id: undefined,
    name: undefined,
    slug: undefined,
    founded: undefined
  }),
  computed: {
    defaultSlug() {
      return this.name ? paramCase(this.name) : undefined
    },
    breadcrumbs() {
      return [
        { icon: 'home', to: '/' },
        { text: this.$t('companies.pages.index'), to: '/companies' },
        { text: this.name, to: `/companies/${this.slug}` },
        { text: this.$t('companies.pages.edit'), disabled: true }
      ]
    }
  },
  methods: {
    async submit() {
      this.submitting = true
      const body = {
        name: this.name,
        slug: this.slug || this.defaultSlug,
        founded: this.founded
      }
      await this.$api.$patch('companies', body)
      this.submitting = false
    },
    clear() {
      // TODO: confirmation overlay
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>
