terraform {
  backend "s3" {
    bucket         = "terraform-state-mediacodex"
    key            = "website.tfstate"
    region         = "eu-central-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
    role_arn       = "arn:aws:iam::939514526661:role/remotestate/website"
    session_name = "terraform"
  }
}

variable "deploy_aws_roles" {
  type = map(string)
  default = {
    dev  = "arn:aws:iam::949257948165:role/deploy-website"
    prod = "arn:aws:iam::000000000000:role/deploy-website"
  }
}

variable "deploy_aws_accounts" {
  type = map(list(string))
  default = {
    dev  = ["949257948165"]
    prod = ["000000000000"]
  }
}

provider "aws" {
  version             = "~> 2.0"
  region              = "eu-central-1"
  allowed_account_ids = var.deploy_aws_accounts[local.environment]
  assume_role {
    role_arn = var.deploy_aws_roles[local.environment]
  }
}
