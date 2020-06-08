resource "aws_s3_bucket" "default" {
  bucket = "mediacodex-${local.environment}-website"
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

/*
 * Public Access
 */
resource "aws_s3_bucket_public_access_block" "default" {
  bucket                  = aws_s3_bucket.default.id
  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}

/*
 * Access policy
 */
resource "aws_s3_bucket_policy" "default" {
  depends_on = [aws_s3_bucket.default]
  bucket     = aws_s3_bucket.default.id
  policy     = data.aws_iam_policy_document.public_access.json
}
data "aws_iam_policy_document" "public_access" {
  statement {
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.default.arn}/*"]
  }
}
