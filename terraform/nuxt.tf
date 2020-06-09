/*
 * These are outputs used for the CI to build the vuejs app
 */
output "nuxt" { 
  description = "Env config for nuxt build in CI"
  value = templatefile("nuxt.tpl", { env = {
    DOMAIN_NAME=local.domain,
    AMPLIFY_AUTH_REGION = "eu-central-1",
    AMPLIFY_AUTH_POOL_ID = data.terraform_remote_state.core.outputs.cognito_pool,
    AMPLIFY_AUTH_CLIENT_ID = aws_cognito_user_pool_client.default.id
  }})
}