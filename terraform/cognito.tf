data "terraform_remote_state" "core" {
  backend   = "s3"
  workspace = terraform.workspace
  config = {
    bucket = "terraform-state-mediacodex"
    key    = "core.tfstate"
    region = "eu-central-1"
    //role_arn       = "arn:aws:iam::939514526661:role/remotestate/website"
    session_name = "terraform"
  }
}

resource "aws_cognito_user_pool_client" "client" {
  name         = "client"
  user_pool_id = data.terraform_remote_state.core.outputs.cognito_pool
}