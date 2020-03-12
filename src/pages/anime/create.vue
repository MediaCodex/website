<template>
  <v-container fluid>
    <breadcrumbs :items="breadcrumbs" />
    <v-row>
      <v-col>
        <h1 class="display-2">{{ $t('anime.create.title') }}</h1>
      </v-col>
    </v-row>

    <v-row dense>
      <!-- Basic Info -->
      <v-col cols="12" md="6">
        <v-card class="mx-auto" height="35rem">
          <v-card-text>
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
              />
              <v-text-field
                v-model="episodes"
                :label="$t('anime.episodes')"
                outlined
                required
                type="number"
              />
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- dates -->
      <v-col cols="12" md="6">
        <v-card class="mx-auto" height="35rem">
          <v-card-text>
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
import Breadcrumbs from '~/components/breadcrumbs'
import Schedule from '~/components/schedule'
export default {
  components: { DatetimePicker, DatePicker, Breadcrumbs, Schedule },
  data: () => ({
    showAiredFrom: false,
    breadcrumbs: [
      { icon: 'home', to: '/', disabled: false },
      { text: 'Anime', to: '/anime', disabled: false },
      { text: 'Create', to: '/anime/create', disabled: true }
    ],
    // form data
    type: 'series',
    title: null,
    slug: null,
    synopsis: null,
    episodes: null,
    premiered: null,
    airedFrom: null,
    airedTo: null
  }),
  computed: {
    defaultSlug() {
      return this.title ? paramCase(this.title) : null
    },
    types: typesDisplay
  },
  methods: {
    submit() {
      const body = {
        title: this.title,
        slug: this.slug || this.defaultSlug(),
        synopsis: this.synopsis
      }
      console.log(body)
    }
  }
}
</script>
