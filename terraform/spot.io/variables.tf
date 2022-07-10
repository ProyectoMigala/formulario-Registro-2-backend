# aws
variable "sg_name" {
  description = "Security Group Name"
}

variable "aws_profile" {
  description = "AWS Profile"
}

variable "route53_name" {
  description = "Route53 Zone Name"
}

# aws and spotinst
variable "key_name" {
  description = "Key Pair Name"
}

variable "route53_records" {
  description = "Route53 Records"
}

# spotinst
variable "aws_region" {
  description = "Region on AWS to Deploy"
}

variable "instance_name" {
  description = "Instance Name"
}
