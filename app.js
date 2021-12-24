'use strict'
/**
 @fileOverview Es el archivo principal de la aplicación. aqui se cargan las runas, middlewares y statics.
 @module app
 */

/**
 * Importando dependencias necesarias para crear el proyecto en express
 */
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

/**
 * Importando el hanlder error desde utilerias
 */
const { handleFatalError } = require('./src/utils/utils')

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

/**
 * Configuración de CORS
 */
const allowedOrigins = [process.env.ALLOWED_ORIGIN]
const options = {
  origin: allowedOrigins
}
app.use(cors(options))

/**
 * Aqui va el contendio estatico de la aplicacion
 * / - la aplicacion web, render o el resultante de un building como Angular o React
 * /doc - documentacion de la aplicacion, tanto para desarrolladores como para usuarios
 */
const path = require('path')
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/doc', express.static(path.join(__dirname, 'documentation/www')))

/**
 * Middleware para parsear los datos que llegan por post
 */
app.use(bodyParser.json())

/**
 * Importando las rutas de la aplicacion de la version 1 y la montamos en la ruta /api/v1
 */
const restV1 = require('./src/components/v1')
app.use(`/api/v1`, restV1)

/**
 * Exportamos la app de express del servidor web
 * De esta manera si podemos agregar unit test a los endpoints con supertest o algo similar
 */
module.exports = app
