<template>
  <div class="drawer min-h-screen">
    <input id="nav-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Topbar -->
      <div class="w-full navbar bg-primary text-secondary">
        <div class="flex-none">
          <label
            for="nav-drawer"
            aria-label="open sidebar"
            class="btn btn-square btn-ghost"
          >
            <Bars4Icon class="w-8 h-8" />
          </label>
        </div>
        <div class="flex-1">
        <!-- header -->
        <NuxtLink
          class="btn rounded border-none bg-secondary hover:bg-secondary text-primary"
          to="/"
        >
          <img src="/favicon.ico" alt="MediaCodex" class="rounded" />
          <span class="ml-2 text-xl font-['orbitron']">MediaCodex</span>
        </NuxtLink>
        </div>
        <div class="flex-none hidden lg:block navbar-center">SEARCH</div>
        <div class="navbar-end">
          <nav-profile-menu />
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
      <div class="h-full w-80 min-h-full bg-primary">
        <!-- header -->
        <NuxtLink
          class="btn btn-block rounded-none border-none bg-secondary hover:bg-secondary text-primary"
          to="/"
        >
          <img src="/favicon.ico" alt="MediaCodex" class="rounded" />
          <span class="ml-2 text-xl font-['orbitron']">MediaCodex</span>
        </NuxtLink>

        <!-- nav -->
        <nav-sidebar-menu />

        <!-- footer -->
        <NuxtLink to="/profile" class="btn btn-block rounded-none border-none bg-secondary hover:bg-secondary text-primary absolute bottom-0">
          <auth-profile/>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Bars4Icon, HomeIcon, UsersIcon } from '@heroicons/vue/20/solid'
</script>
