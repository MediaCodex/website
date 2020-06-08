locals {
  environment = "${lookup(var.environments, terraform.workspace, "dev")}"
  domain      = lookup(var.domains, local.environment)
}

/*
 * Vars to keep configuration in-line with normal TF
 */
variable "environments" {
  type = map(string)
  default = {
    development = "dev"
    production  = "prod"
  }
}
variable "domains" {
  type = map
  default = {
    dev  = "mediacodex.dev"
    prod = "mediacodex.net"
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

/*
 * Provider
 */
provider "aws" {
  version             = "~> 2.0"
  region              = "eu-central-1"
  allowed_account_ids = var.deploy_aws_accounts[local.environment]
  assume_role {
    role_arn = var.deploy_aws_roles[local.environment]
  }
}

/*
 * Sync files
 */
resource "aws_s3_bucket_object" "dist" {
  for_each = fileset("dist", "**")
  bucket = replace(local.domain, ".", "-")
  key    = each.value
  source = "dist/${each.value}"
  etag   = filemd5("dist/${each.value}") // ensires that all changes are updated
}