<template>
  <NuxtLink :to="to" v-slot="{ isActive, href, navigate }" custom>
    <li
      :class="
        isActive
          ? 'bg-secondary text-primary'
          : 'text-secondary hover:bg-secondary hover:text-primary'
      "
      class="rounded mb-2 last:mb-0"
      @click="navigate"
    >
      <a
        :href="href"
        @click="navigate"
        :class="
          isActive
            ? 'text-primary hover:text-primary'
            : 'text-secondary hover:text-primary'
        "
        class="hover:underline"
      >
        <slot name="icon"></slot>
        {{ name }}
      </a>
    </li>
  </NuxtLink>
</template>

<script setup lang="ts">
import { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue'
import { RouteLocationRaw } from 'vue-router'

defineProps<{
  to: RouteLocationRaw
  name: string
}>()
</script>
