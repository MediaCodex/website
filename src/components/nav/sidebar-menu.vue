<template>
  <ul class="menu p-4 w-80 min-h-full bg-primary">
    <nav-header class="w-full mb-8" />
    <!-- Sidebar content here -->
    <nav-sidebar-item to="/" name="Home"><HomeIcon #icon /></nav-sidebar-item>
  </ul>
</template>

<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/24/outline'
</script>
