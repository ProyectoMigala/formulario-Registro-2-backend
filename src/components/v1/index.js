'use strict'
/**
 @fileOverview El Index de la v1, aqui se encuentran todas las rutas de la api v1
 @module components
 */
const router = require('express').Router()

/**
 * Importando las rutas de la version 1 y la montamos en su respectiva ruta
 */
const form = require('./form')
router.use('/form', form.controller)

/**
 * Importando las rutas de la version 1 y la montamos en su respectiva ruta
 */
const code = require('./code')
router.use('/code', code.controller)

/**
 * Exportamos el router que usamos en app.js
 */
module.exports = router
