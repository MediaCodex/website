<template>
  <div>
    <p>{{ $store.state.auth.authenticated ? 'yay' : 'nay' }}</p>
    <p>{{ test }}</p>
  </div>
</template>
<script>
export default {
  computed: {
    test() {
      return 'BANANA'
    }
  }
}
</script>
