terraform {
  backend "remote" {
    hostname = "app.terraform.io"
    organization = "MediaCodex"

    workspaces {
      prefix = "website-"
    }
  }
}

data "terraform_remote_state" "core" {
  backend   = "remote"
  config = {
    organization = "MediaCodex"
    workspaces = {
      name = "service-core-${local.environment}"
    }
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
  region              = "eu-central-1"
  allowed_account_ids = var.deploy_aws_accounts[local.environment]
  assume_role {
    role_arn = var.deploy_aws_roles[local.environment]
  }
}
