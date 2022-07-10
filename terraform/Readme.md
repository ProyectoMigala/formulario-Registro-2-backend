# Deploy de Infraestructura con Terraform

Esta es la infraestructura utilizada para el proyecto

## Pre-Requisitos

- Tener Docker en tu computadora
- Tener un Personal API Access Token de [spot.io](https://spot.io/) y configurar las credenciales `~/.spotinst/credentials`, [Documentation](https://github.com/spotinst/spotctl)
- Tener tus Credenciales de `AWS` Configuradas `~/.aws/credentials`

ejemplo
```bash
cat ~/.aws/credentials
[default_user]
aws_access_key_id=xxxxxx
aws_secret_access_key=xxxxx
```

```bash
cat ~/.spotinst/credentials
[default]
token   = <spotinst_token>
account = <spotinst_account>
```

## Como se ejecuta
Se necesita correr el comando make de esta manera
```bash
# Con esto inicializas terraform
make init aws_profile=default_user platform=spot.io

# Con esto ves el plan
make plan aws_profile=default_user platform=spot.io

# Con esto Aplicas el Plan
make apply aws_profile=default_user platform=spot.io

# En este punto ya tienes la infraestructura arriba


# Con esto Destruyes la infraestructura (tienes que tener el tfstate de terraform)
make destroy aws_profile=default_user platform=spot.io


# Inicia un contenedor Terraform con bash como entry point, tu decides que hacer dentro
make bash

# Formatea todos los archivos Terraform en la carpeta de la plataforma
make fmt platform=spot.io

# Muestra los providers
make providers platform=spot.io
```

## Despues de haber levantado toda la infraestructura

Al tener la infraestructura, puedes conectarte con `ssh`, el archivo `MigalaFormularioBackend.pem` esta dentro de la carpeta `spot.io`, la `ip` de la instancia la tienes que conseguir de `aws` o `spot.io` (ip publica)

```bash

ssh -i ./spot.io/MigalaFormularioBackend.pem ubuntu@public_ip

```

# Cosas por hacer:
- tienes que actualizar los `dns` de tu dominio con los nuevos de `route53`
- asegurate que en los `records` de `route53` solo esta la `ip publica` de tu instancia
- hacer [`Pre-Requisitos Configuraciones`](https://github.com/ProyectoMigala/formulario-Registro-2-backend#pre-requisitos-configuraciones) dentro del servidor, configurar el `.env`, las `keys` de drive

