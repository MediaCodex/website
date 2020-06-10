<template>
  <v-container fluid>
    <!-- header -->
    <v-row class="px-4" dense>
      <!-- navigation -->
      <v-col align-self="end">
        <v-btn icon nuxt exact to="/anime">
          <v-icon dark>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>

      <!-- title -->
      <v-col>
        <section class="text-center">
          <h1 class="mb-2 display-3">{{ $t('anime.create.title') }}</h1>
        </section>
      </v-col>

      <!-- actions -->
      <v-col align="right" justify="end" align-self="end">
        <v-btn icon class="mr-1" @click="refresh">
          <v-icon dark>mdi-refresh</v-icon>
        </v-btn>
        <v-btn icon color="error darken" @click="clear">
          <v-icon dark>mdi-close</v-icon>
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
                <v-form>
                  <v-select
                    v-model="type"
                    :items="types"
                    :label="$t('anime.type')"
                    required
                    outlined
                  />
                  <v-text-field
                    v-model="title"
                    :label="$t('create.title')"
                    type="text"
                    outlined
                    required
                    counter="255"
                  />
                  <v-text-field
                    v-model="slug"
                    :label="$t('create.slug')"
                    type="text"
                    outlined
                    required
                    counter="100"
                    :placeholder="defaultSlug"
                  />
                  <v-textarea
                    v-model="synopsis"
                    :label="$t('create.synopsis')"
                    outlined
                    counter="1024"
                    rows="5"
                  />
                  <v-text-field
                    v-if="episodic"
                    v-model="episodes"
                    :label="$t('anime.episodes')"
                    outlined
                    required
                    type="number"
                  />
                  <v-text-field
                    v-model="duration"
                    :label="$t(`anime.duration${episodic ? 'Avg' : ''}Mins`)"
                    outlined
                    required
                    type="number"
                  />
                </v-form>
              </v-col>

              <!-- dates -->
              <v-col cols="12" md="6">
                <v-form>
                  <datetime-picker
                    v-model="premiered"
                    outlined
                    :label="$t('create.premiered')"
                  />
                  <date-picker
                    v-model="airedFrom"
                    outlined
                    :label="$t('create.airedFrom')"
                  />
                  <date-picker
                    v-model="airedTo"
                    outlined
                    :label="$t('create.airedTo')"
                  />
                  <v-divider class="mb-4" />
                  <h4 class="subtitle-1 text-center">
                    {{ $t('create.schedule.title') }}
                  </h4>
                  <schedule outlined />
                </v-form>
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
import { typesDisplay } from '~/assets/js/anime'
import DatetimePicker from '~/components/DatetimePicker'
import DatePicker from '~/components/DatePicker'
import Schedule from '~/components/schedule'
export default {
  components: { DatetimePicker, DatePicker, Schedule },
  data: () => ({
    showAiredFrom: false,
    // form data
    type: 'series',
    title: null,
    slug: null,
    synopsis: null,
    episodes: null,
    duration: null,
    status: 'planned',
    premiered: null,
    airedFrom: null,
    airedTo: null
  }),
  computed: {
    types: typesDisplay,
    defaultSlug() {
      return this.title ? paramCase(this.title) : null
    },
    episodic() {
      return this.type !== 'movie'
    }
  },
  methods: {
    submit() {
      const body = {
        title: this.title,
        slug: this.slug || this.defaultSlug(),
        synopsis: this.synopsis
      }
      console.log(body)
    },
    clear() {
      // TODO: confirmation overlay
      Object.assign(this.$data, this.$options.data())
    },
    refresh() {
      // TODO: reload external data sources
    }
  }
}
</script>
