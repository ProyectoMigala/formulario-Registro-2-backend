'use strict'
/**
 @fileOverview Es el archivo donde estan las utilerias genericas de la aplicacion
 @module utils
 */
const chalk = require('chalk')

/**
 * Es un handler error
 * En esta funcion se detiene el proceso de la aplicacion he impime el error, 
 * esta diseñado para los errores fatales de los cuales la app no se puede recuperar
 * @function handleFatalError
 * @param {ERROR} err - Es el error generado en la excepcion
 */
exports.handleFatalError = (err) => {
  console.error(`${chalk.red('[FATAL ERROR]')} ${err}`)
  console.error(err.stack)
  process.exit(1)
}

/**
 * Es un handler error
 * Esta funcion sno detiene el proceso de la aplicacion, pero si impime el error, 
 * esta diseñado para los errores de los cuales la app puede recuperarse, error en validaciones, en respuesta de una peticion, etc
 * @function handleError
 * @param {ERROR} err - Es el error generado en la excepcion
 */
exports.handleError = (err) => {
  console.error(`${chalk.red('[ERROR]')} ${err}`)
  console.error(err.stack)
}
