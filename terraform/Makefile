# DEFAUL VALUES

# Switch to different TF image version
tf_versions ?= 1.2.4

# Choose the AWS region to use
aws_region ?= us-east-1

# Choose in case you have multiple profiles on your workstation
aws_profile ?= default

# Select platform
platform ?= spot.io


# Terraform container
TERRAFORM := docker run -i --rm -t \
		-v `pwd`:/terraform/ \
		-v ~/.spotinst:/root/.spotinst \
		-v ~/.aws:/root/.aws \
		-w /terraform/$(platform) hashicorp/terraform:$(tf_versions)

# Terraform with sh entrypoint
TERRAFORMBASH := docker run -i --rm -t \
		-v `pwd`:/terraform/ \
		-v ~/.spotinst:/root/.spotinst \
		-v ~/.aws:/root/.aws \
		--entrypoint=/bin/sh \
        --env AWS_PROFILE="${aws_profile}" \
		-w /terraform hashicorp/terraform:$(tf_versions)

# Format files
.PHONY: fmt
fmt:
	$(TERRAFORM) fmt --recursive

# Terraform sh
.PHONY: bash
bash:
	$(TERRAFORMBASH)

# Terraform Init
.PHONY: init
init:
	$(TERRAFORM) init

# Terraform plan
.PHONY: plan
plan:
	$(TERRAFORM) plan -var 'aws_profile=$(aws_profile)' -var 'aws_region=${aws_region}'

# Terraform apply
.PHONY: apply
apply:
	$(TERRAFORM) apply -var 'aws_profile=$(aws_profile)' -var 'aws_region=${aws_region}'

# Terraform destroy
.PHONY: destroy
destroy:
	$(TERRAFORM) destroy -var 'aws_profile=$(aws_profile)' -var 'aws_region=${aws_region}'

# Terraform providers
.PHONY: providers
providers:
	$(TERRAFORM) providers
