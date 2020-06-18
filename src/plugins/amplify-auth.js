import Auth from '@aws-amplify/auth'

Auth.configure({
  // REQUIRED - Amazon Cognito Region
  region: process.env.AMPLIFY_AUTH_REGION,

  // OPTIONAL - Amazon Cognito User Pool ID
  userPoolId: process.env.AMPLIFY_AUTH_POOL_ID,

  // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  userPoolWebClientId: process.env.AMPLIFY_AUTH_CLIENT_ID,

  oauth: {
    domain: 'mediacodex-dev.auth.eu-central-1.amazoncognito.com',
    // scope: ['phone', 'email', 'profile', 'openid', `'aws.cognito.signin.user.admin'],
    redirectSignIn: `${process.env.DOMAIN_NAME}/oauth2`,
    redirectSignOut: `${process.env.DOMAIN_NAME}/oauth2`,
    responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
  }
})
