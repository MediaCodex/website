<!-- <template>
  <Menu>
    <MenuButton>{{user.username}}</MenuButton>
    <MenuItems>
      <MenuItem v-slot="{ active }">
        <a :class='{ "bg-blue-500": active }' href="/account-settings">
          Account settings
        </a>
      </MenuItem>
      <MenuItem v-slot="{ active }">
        <a :class='{ "bg-blue-500": active }' href="/account-settings">
          Documentation
        </a>
      </MenuItem>
      <MenuItem disabled>
        <span class="opacity-75">Invite a friend (coming soon!)</span>
      </MenuItem>
    </MenuItems>
  </Menu>
</template> -->

<template>
  <div class="dropdown dropdown-end">
    <label tabindex="0" class="btn btn-ghost text-secondary hover:bg-secondary hover:text-primary">
      <div class="avatar">
        <div class="rounded ring-1 ring-secondary">
          <img :src="user.avatarUrl" />
        </div>
      </div>
      {{ user.username }}
      <ChevronDownIcon class="h-5 w-5"/>
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
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
const user = {
  username: 'DeltaByte',
  avatarUrl: '/favicon.ico'
}
</script>
