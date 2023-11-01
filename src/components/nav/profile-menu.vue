<template>
  <div class="dropdown dropdown-end">
    <label
      tabindex="0"
      class="btn btn-wide btn-ghost text-secondary hover:bg-secondary hover:text-primary"
    >
      <auth-profile />
      <ChevronDownIcon class="h-5 w-5" />
    </label>
    <ul
      tabindex="0"
      class="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52 text-primary"
    >
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/outline'

defineProps<{
  up: { type: boolean; required: false }
}>()

const user = {
  username: 'DeltaByte',
  avatarUrl: '/favicon.ico'
}
</script>
