data "aws_ssm_parameter" "cloudflare_zone" {
  name = "/cloudflare-zones/main"
}

/**
 * DNS
 */
resource "cloudflare_record" "website" {
  zone_id = data.aws_ssm_parameter.cloudflare_zone.value
  name    = "@"
  type    = "CNAME"
  value   = aws_cloudfront_distribution.default.domain_name
  proxied = true
}

resource "cloudflare_record" "website_www" {
  zone_id = data.aws_ssm_parameter.cloudflare_zone.value
  name    = "www"
  type    = "CNAME"
  value   = cloudflare_record.website.hostname
  proxied = true
}

/**
 * Origin Cert
 */
resource "aws_acm_certificate" "website" {
  domain_name       = local.domain
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = var.default_tags
}

resource "cloudflare_record" "website_cert" {
  for_each = {
    for dvo in aws_acm_certificate.website.domain_validation_options : dvo.domain_name => {
      resource_record_name  = dvo.resource_record_name
      resource_record_value = dvo.resource_record_value
      resource_record_type  = dvo.resource_record_type
    }
  }

  zone_id = data.aws_ssm_parameter.cloudflare_zone.value
  proxied = false

  name  = each.value.resource_record_name
  type  = each.value.resource_record_type
  value = trimsuffix(each.value.resource_record_value, ".")
}

resource "aws_acm_certificate_validation" "website" {
  certificate_arn         = aws_acm_certificate.website.arn
  validation_record_fqdns = [for record in cloudflare_record.website_cert : record.hostname]
}