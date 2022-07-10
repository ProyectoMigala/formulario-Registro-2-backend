output "subnet_ids" {
  value       = data.aws_subnets.default.ids
  description = "Subnet ids"
}

output "vpc_id" {
  value       = data.aws_vpc.default.id
  description = "VPC id"
}

output "image_id" {
  value       = data.aws_ami.ubuntu.id
  description = "Image id"
}

output "security_group_id" {
  value       = aws_security_group.migala_formulario_back_sg.id
  description = "Security Groups id"
}

output "route53_hosted_zone_id" {
  value       = aws_route53_zone.primary.zone_id
  description = "Route53 Hosted Zone ID"
}
