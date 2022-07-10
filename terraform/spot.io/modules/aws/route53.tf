resource "aws_route53_zone" "primary" {
  name = var.route53_name
}

resource "aws_route53_record" "records" {
  for_each = toset(var.route53_records)
  zone_id = aws_route53_zone.primary.zone_id
  name    = each.key
  type    = "A"
  ttl     = "300"
  records = ["0.0.0.0"]
}
