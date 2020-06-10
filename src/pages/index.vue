<template>
  <v-container fluid>
    <p style="text-align: center;">
      authenticated: {{ $store.state.auth.authenticated ? 'yay' : 'nay' }}
    </p>
    <h4>WIP sections:</h4>
    <ul>
      <li><nuxt-link to="/anime">Anime</nuxt-link></li>
    </ul>
  </v-container>
</template>
