<template>
  <div class="avatar">
    <div class="rounded ring-1 ring-secondary">
      <img :src="user.avatarUrl" />
    </div>
  </div>
  {{ user.username }}
</template>

<script setup lang="ts">
const user = {
  username: 'DeltaByte',
  avatarUrl: '/favicon.ico'
}
</script>
