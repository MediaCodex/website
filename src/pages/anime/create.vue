<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col cols="6">
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
    </v-row>
  </v-container>
</template>

<script>
import { paramCase } from 'change-case'
import { typesDisplay } from '~/assets/js/anime'
export default {
  data: () => ({
    type: 'series',
    title: null,
    slug: null,
    synopsis: null,
    episodes: null
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
