locals {
  firebase_env = lookup(var.firebase_environments, local.environment)
}

variable "firebase_environments" {
  type = map
  default = {
    dev  = "development"
    prod = "production"
  }
}

/*
 * These are outputs used for the CI to build the vuejs app
 */
output "nuxt" {
  description = "Env config for nuxt build in CI"
  value = templatefile("${path.module}/nuxt.tpl", { env = {
    DOMAIN_NAME = local.domain,
    FIRE_ENV    = local.firebase_env
  } })
}