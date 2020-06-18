import Auth from '@aws-amplify/auth'
import { Hub } from '@aws-amplify/core'

Hub.listen('auth', ({ payload: { event, data } }) => {
  switch (event) {
    case 'signIn':
      console.log('HUB SIGN IN')
      console.log(data)
      break
    case 'signOut':
      console.log('HUB SIGN OUT')
      break
    case 'customOAuthState':
      console.log('HUB CUSTOM OAUTH')
      console.log(data)
      break
    default:
      console.log(`HUB DEFAULT: ${event}`)
      console.log(data)
  }
})

Auth.configure({
  // REQUIRED - Amazon Cognito Region
  region: process.env.AMPLIFY_AUTH_REGION,

  // OPTIONAL - Amazon Cognito User Pool ID
  userPoolId: process.env.AMPLIFY_AUTH_POOL_ID,

  // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  userPoolWebClientId: process.env.AMPLIFY_AUTH_CLIENT_ID,

  oauth: {
    domain: 'mediacodex-dev.auth.eu-central-1.amazoncognito.com',
    // scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    redirectSignIn: 'http://localhost:3000/oauth2',
    redirectSignOut: 'http://localhost:3000/oauth2',
    responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
  }
})
