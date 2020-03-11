<template>
  <v-container fluid>
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item nuxt exact :to="item.to" :disabled="item.disabled">
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    <v-row>
      <v-col>
        <h1 class="display-2">{{ $t('anime.create.title') }}</h1>
      </v-col>
    </v-row>

    <v-row>
      <!-- Basic Info -->
      <v-col>
        <v-card class="mx-auto">
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
      <v-col>
        <v-card class="mx-auto">
          <v-card-text>
            <v-form>
              <datetime
                v-model="premiered"
                outlined
                :label="$t('create.premiered')"
              />
              <datetime
                v-model="airedFrom"
                outlined
                :label="$t('create.airedFrom')"
                required
              />
              <datetime
                v-model="airedTo"
                outlined
                :label="$t('create.airedTo')"
              />
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
import Datetime from '~/components/datetime'
export default {
  components: {
    Datetime
  },
  data: () => ({
    type: 'series',
    title: null,
    slug: null,
    synopsis: null,
    episodes: null,
    breadcrumbs: [
      { text: 'Anime', to: '/anime', disabled: false },
      { text: 'Create', to: '/anime/create', disabled: true }
    ],
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
