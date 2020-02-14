<template>
  <mdb-form-inline class="ml-auto">
    <mdbIcon icon="search" color="white" title="Not available yet" />
    <mdb-input
      type="text"
      class="text-white"
      :placeholder="$t('navbar.search')"
      :aria-label="$t('navbar.search')"
      label
      nav-input
      disabled
      hidden
    />
  </mdb-form-inline>
</template>

<script>
import { mdbInput, mdbIcon, mdbFormInline } from 'mdbvue'
export default {
  name: 'Search',
  components: {
    mdbInput,
    mdbIcon,
    mdbFormInline
  }
}
</script>
