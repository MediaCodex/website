locals {
  environment = contains(var.environments, terraform.workspace) ? terraform.workspace : "dev"
  domain      = lookup(var.domains, local.environment)
}

variable "environments" {
  type = set(string)
  default = ["dev", "prod"]
}

variable "default_tags" {
  type        = map(string)
  description = "Common resource tags for all resources"
  default = {
    Service = "website"
  }
}

variable "domains" {
  type = map
  default = {
    dev  = "mediacodex.dev"
    prod = "mediacodex.net"
  }
}
