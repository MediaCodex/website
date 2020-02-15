import Auth from '@aws-amplify/auth'

Auth.configure({
  // REQUIRED - Amazon Cognito Region
  region: process.env.AMPLIFY_AUTH_REGION,

  // OPTIONAL - Amazon Cognito User Pool ID
  userPoolId: process.env.AMPLIFY_AUTH_POOL_ID,

  // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  userPoolWebClientId: process.env.AMPLIFY_AUTH_CLIENT_ID,

  // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
  mandatorySignIn: false,

  // OPTIONAL - Configuration for cookie storage
  // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
  cookieStorage: {
    // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    domain: `.${process.env.DOMAIN_NAME}`,
    // OPTIONAL - Cookie path
    path: '/',
    // OPTIONAL - Cookie expiration in days
    expires: 365,
    // OPTIONAL - Cookie secure flag
    // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
    secure: true
  },

  // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
  authenticationFlowType: 'USER_PASSWORD_AUTH'
})
