resource "aws_cloudfront_origin_access_identity" "default" {}

resource "aws_cloudfront_distribution" "default" {
  origin {
    domain_name = aws_s3_bucket.default.bucket_regional_domain_name
    origin_id   = "s3_${local.domain}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.default.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = [local.domain]

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "s3_${local.domain}"

    forwarded_values {
      query_string = true

      cookies {
        forward = "all"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = data.terraform_remote_state.core.outputs.website_cert
    ssl_support_method  = "sni-only"
  }

  tags = var.default_tags
}

output "cloudfront_domain" {
  description = "Cloudfront origin hostname"
  value       = aws_cloudfront_distribution.default.domain_name
}
