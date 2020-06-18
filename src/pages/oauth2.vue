<template>
  <h1>signing in...</h1>
</template>

<script>
import { Hub } from '@aws-amplify/core'
export default {
  mounted() {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          console.log('HUB SIGN IN')
          console.log(data)
          break
        case 'signOut':
          console.log('HUB SIGN OUT')
      }
    })
  }
}
</script>
