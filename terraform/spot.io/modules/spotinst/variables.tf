variable "key_name" {
  description = "Key Pair Name"
}

variable "aws_region" {
  description = "Region on AWS to Deploy"
}

variable "instance_name" {
  description = "Instance Name"
}

variable "subnet_ids" {
  description = "Subnet ids"
}

variable "vpc_id" {
  description = "VPC id"
}

variable "image_id" {
  description = "Image id"
}

variable "security_group_id" {
  description = "Security Groups id"
}

variable "route53_hosted_zone_id" {
  description = "Route53 Hosted Zone ID"
}

variable "route53_records" {
  description = "Route53 Records"
}
