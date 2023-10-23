<template>
    <div class="drawer min-h-screen">
      <input id="nav-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        <!-- Topbar -->
        <div class="w-full navbar bg-primary text-secondary">
          <div class="flex-none lg:hidden">
            <label
              for="nav-drawer"
              aria-label="open sidebar"
              class="btn btn-square btn-ghost"
            >
              <Bars4Icon class="w-8 h-8" />
            </label>
          </div>
          <div class="flex-1">
            <nav-header />
          </div>
          <div class="flex-none hidden lg:block navbar-center">
            <nav-topbar-menu />
          </div>
          <div class="navbar-end">
            <nav-profile />
          </div>
        </div>
        <!-- Content -->
        <main class="h-full">
          <div class="container mx-auto mt-4 space-y-4">
            <NuxtPage />
          </div>
        </main>
      </div>
      <!-- Sidebar -->
      <div class="drawer-side">
        <label
          for="nav-drawer"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <nav-sidebar-menu />
      </div>
  </div>
</template>

<script setup>
import { Bars4Icon, HomeIcon, UsersIcon } from '@heroicons/vue/20/solid'

const navigation = [
  { name: 'Home', to: '/', icon: HomeIcon },
  { name: 'Companies', to: '/companies', icon: UsersIcon }
]
</script>
