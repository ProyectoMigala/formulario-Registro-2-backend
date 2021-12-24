# Migala Form
Este es el Backend para el proyecto [formulario-Registro-2](https://github.com/ProyectoMigalaOficial/formulario-Registro-2) 

## Pre-Requisitos Configuraciones
- Crear un [Service Account](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication) de Google para Google Sheets
- Guardar el `json` en la carpeta `keys`
- Crear un Google Sheet y compartirlo con el Service Account que acabas de crear
- Configura tu email, si no tienes alguno disponible y es solo para desarrollo, puedes usar [https://ethereal.email/](https://ethereal.email/)
- Renombra `.env.example` a `.env` y actualiza las variables con tus datos

## Pre-Requsitos Ejecucion
- Tener Docker (Docker version 20.10.10, build b485636) y/o docker-compose (docker-compose version 1.29.2, build 5becea4c)

o

- nodejs (v16.13.1)

## Instalar Dependencias

Use the package manager [npm](https://nodejs.org/en/) to install the dependencies.

```bash
npm install 
```

## Comandos de uso

```bash
# iniciar el server
npm run start 

# iniciar el server de desarrollo
npm run dev

# crear documentacion
npm run docs
```

## Docker

Puedes usar [Docker](https://docs.docker.com/get-docker/) y/o [docker-compose](https://docs.docker.com/compose/install/) para correr el proyecto.

### Desarrollo con docker compose

Con `docker-compose` (docker-compose es una herramienta dependiente de Docker). En la raíz del proyecto puedes correr:

```sh
docker-compose up
```

con Docker. En la raíz del proyecto puedes correr:

```sh
docker build -t migala-form-back -f Dockerfile .
```

## Documentation
Checka la documentacion en la ruta `/doc` y/o en [postman](https://documenter.getpostman.com/view/2442145/UVJk9shC#691573b6-d763-4852-bef8-ffddea31a556)

## Estructura del proyecto
```text
.
|-- Dockerfile
|-- README.md
|-- app.js
|-- bin
|   \-- www
|-- docker-compose.yml
|-- documentation
|   |-- documents
|   \-- www - `GENERADO AUTOMATICAMENTE CON 'npm run docs'`
|-- jsdoc.json
|-- keys
|   \-- service_account_json.json.example
|-- node_modules
|-- package-lock.json
|-- package.json
|-- public
|   \-- index.html
\-- src
    |-- components
    |   |-- v1
    |   |   |-- form
    |   |   |   |-- controller.js
    |   |   |   |-- dal.js
    |   |   |   \-- index.js
    |   |   \-- index.js
    |   \-- v2
    |-- services
    |   \-- google_sheet.js
    \-- utils
        \-- utils.js
```

