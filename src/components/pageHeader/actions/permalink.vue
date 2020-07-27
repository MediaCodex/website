<template>
  <v-list-item @click="copy">
    <v-list-item-icon>
      <v-icon v-text="'mdi-link'" />
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title v-text="$t('actions.permalink')" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'PermalinkAction',
  props: {
    to: { type: String, default: undefined }
  },
  methods: {
    async copy() {
      const domain = window.location.origin
      const path = this.$router.resolve(this.to).resolved.fullPath

      const permission = await navigator.permissions.query({
        name: 'clipboard-write'
      })

      // https://caniuse.com/#feat=mdn-api_clipboard_writetext
      if (permission.state === 'granted' || permission.state === 'prompt') {
        navigator.clipboard.writeText(domain + path)
      } else {
        // TODO: display error if denied
        console.log(`Clipboard failed: ${permission.state}`)
      }
    }
  }
}
</script>
