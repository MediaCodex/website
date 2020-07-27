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
                    :label="$t('people.name')"
                    type="text"
                    outlined
                    required
                    counter="255"
                  />
                  <v-text-field
                    v-model="slug"
                    :label="$t('people.slug')"
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
                    v-model="born"
                    outlined
                    :label="$t('people.born')"
                  />
                  <date-picker
                    v-model="died"
                    outlined
                    :label="$t('people.died')"
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
  data() {
    return {
      breadcrumbs: [
        { icon: 'home', to: '/' },
        { text: this.$t('people.pages.index'), to: '/people' },
        { text: this.$t('people.pages.create'), disabled: true }
      ],
      submitting: false,
      // form data
      name: undefined,
      slug: undefined,
      born: undefined,
      died: undefined
    }
  },
  computed: {
    defaultSlug() {
      return this.name ? paramCase(this.name) : undefined
    }
  },
  methods: {
    async submit() {
      this.submitting = true
      const body = {
        name: this.name,
        slug: this.slug || this.defaultSlug,
        born: this.born,
        died: this.died
      }
      await this.$api.$post('people', body)
      this.submitting = false
      this.$router.push(`/people/${body.slug}`)
    },
    clear() {
      // TODO: confirmation overlay
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>
