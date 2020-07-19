resource "aws_cognito_user_pool_client" "default" {
  name         = "client"
  user_pool_id = data.terraform_remote_state.core.outputs.cognito_pool
}

output "cognito_client" {
  value = aws_cognito_user_pool_client.default.id
}