'use strict'
/**
 @fileOverview Es el archivo principal del servicio de google sheet.
 @module services/google
 */
const { GoogleSpreadsheet } = require('google-spreadsheet')

/**
 * Es la ruta del certificado de google para la autenticación
 */
const creds = require(`${process.cwd()}${process.env.SERVICE_ACCOUNT_JSON_PATH}`)

/**
 * Crea una instancia de GoogleSpreadsheet con el ID de la hoja de cálculo de google
 */
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID)

/**
 * Variable que se usa para evitar que se haga una nueva autenticación. Solo se hara una vez
 */
let login_ServiceAccountAuth = true

/**
 * Esta función se encarga de autenticar el servicio de google y 
 * regresa la instancia de GoogleSpreadsheet completamente validada.
 * 
 * Puede recibir un objeto con el siguiente formato de manera opcional:
 * @async
 * @function getInstance
 * @param {opts} opts -  Es el objeto que contiene las opciones/argumentos
 * @param {*} opts.login - Si el login es true, se hara una nueva autenticación.
 * @param {*} opts.refresh - Si el refresh es true, se refrescará la informacion del doc.
 * @returns {GoogleSpreadsheet} Retorna la instancia de GoogleSpreadsheet
 * @example
 * const google_doc = await doc.getInstance({ refresh: true })
 */
exports.getInstance = async (opts) => {
  if (login_ServiceAccountAuth) {
    await doc.useServiceAccountAuth(creds)
    await doc.loadInfo()
    login_ServiceAccountAuth = false
  }

  if (opts?.login) {
    await doc.useServiceAccountAuth(creds)
  }

  if (opts?.refresh) {
    await doc.loadInfo()
  }

  return doc
}
