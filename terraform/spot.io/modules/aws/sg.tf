resource "aws_security_group" "migala_formulario_back_sg" {
  name        = var.sg_name
  description = "Created by Terraform - MigalaFormularioBackend"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "SSH Just My IP"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["${chomp(data.http.myip.body)}/32"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = var.sg_name
  }
}
