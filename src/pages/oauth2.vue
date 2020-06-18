<template>
  <h1>signing in...</h1>
</template>

<script>
export default {
  // async mounted() {
  //   const code = this.$route.query.code
  //   const formData = {
  //     grant_type: 'authorization_code',
  //     code,
  //     client_id: process.env.AMPLIFY_AUTH_CLIENT_ID,
  //     redirect_uri: 'http://localhost:3000/oauth2'
  //   }

  //   const body = Object.keys(formData)
  //     .map(
  //       (key) =>
  //         `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`
  //     )
  //     .join('&')

  //   const cognitoDomain = 'mediacodex-dev.auth.eu-central-1.amazoncognito.com'
  //   const res = await this.$axios.$post(
  //     `https://${cognitoDomain}/oauth2/token`,
  //     {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       },
  //       body
  //     }
  //   )

  //   console.log(res)
  // }
}
</script>
