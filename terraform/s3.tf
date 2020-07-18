resource "aws_s3_bucket" "default" {
  bucket = local.domain
  acl    = "public-read"

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  tags = var.default_tags
}

resource "aws_s3_bucket_policy" "cloudfront" {
  bucket = aws_s3_bucket.default.id
  policy = data.aws_iam_policy_document.cloudfront.json
}

data "aws_iam_policy_document" "cloudfront" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.default.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.default.iam_arn}"]
    }
  }

  statement {
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.default.arn]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.default.iam_arn}"]
    }
  }
}
