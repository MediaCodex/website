resource "aws_cloudfront_origin_access_identity" "default" {}

resource "aws_cloudfront_distribution" "default" {
  origin {
    domain_name = aws_s3_bucket.default.website_endpoint
    origin_id   = "s3_${local.domain}"

    # s3_origin_config {
    #   origin_access_identity = aws_cloudfront_origin_access_identity.default.cloudfront_access_identity_path
    # }

    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
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
    acm_certificate_arn      = aws_acm_certificate.website.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2019"
  }

  tags = var.default_tags
}

/**
 * SSM Outputs
 */
resource "aws_ssm_parameter" "hostname" {
  name  = "/website/distribution-domain"
  type  = "String"
  value = aws_cloudfront_distribution.default.domain_name
  tags  = var.default_tags
}

resource "aws_ssm_parameter" "distribution_arn" {
  name  = "/website/distribution-arn"
  type  = "String"
  value = aws_cloudfront_distribution.default.arn
  tags  = var.default_tags
}
