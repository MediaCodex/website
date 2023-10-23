<template>
  <NuxtLink :to="to" v-slot="{ isActive, href, navigate }" custom>
    <li
      :class="
        isActive
          ? 'bg-secondary text-primary'
          : 'text-secondary hover:bg-secondary'
      "
      class="rounded hover:text-primary"
      @click="navigate"
    >
      <a
        :href="href"
        @click="navigate"
        :class="isActive ? 'text-primary' : 'text-secondary'"
        class="hover:underline hover:text-primary"
      >
        <span v-if="$slots.default" class="w-6"><slot></slot></span>
        {{ name }}
      </a>
    </li>
  </NuxtLink>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'
import { HomeIcon } from '@heroicons/vue/20/solid'

defineProps<{
  to: RouteLocationRaw
  name: string
}>()
</script>
