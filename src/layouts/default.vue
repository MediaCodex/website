<template>
  <div>
    <!-- Navbar -->
    <Navbar />
    <!-- Main content -->
    <nuxt />
  </div>
</template>

<script>
import Navbar from '@/components/navbar'
export default {
  components: {
    Navbar
  },
  middleware: ['auth']
}
</script>
