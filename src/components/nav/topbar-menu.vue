<template>
  <ul class="menu menu-horizontal space-x-2">
    <nav-topbar-item to="/" name="Home"><HomeIcon /></nav-topbar-item>
    <nav-topbar-item to="/companies" name="Companies"></nav-topbar-item>
  </ul>
</template>

<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/20/solid'
</script>
