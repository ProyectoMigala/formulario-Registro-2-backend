'use strict'
/**
 @fileOverview El componente para manejar el formulario.
 @module components/form
 */
const doc = require('../../../services/google_sheet')

/**
 * Regresa la lista de registros de una tabla (sheet)
 * Necesita el nombre de la tabla, este valor se pasa en el argumento obj, usa el formato del ejemplo
 * 
 * Lo que hara es regresar un arreglo de objetos, cada objeto es un registro de la tabla `example_table`
 * @async
 * @function getAll
 * @param {obj} obj - Es el objeto que contiene las opciones/argumentos
 * @param {*} obj.tableName - Es el nombre de la tabla
 * @returns {Array} Regresa un arreglo de objetos, cada objeto es un registro de la tabla `example_table`
 * @example
 * const result = await getAll({ tableName: 'example_table' })
 */
exports.getAll = async (obj) => {
  const title = obj.tableName

  const google_doc = await doc.getInstance({ refresh: true })

  const sheet = google_doc.sheetsByTitle[title]
  if (sheet === undefined) {
    return undefined
  }

  return getRows(sheet)
}

/**
 * Guarda un registro en una tabla (sheet)
 * Necesita el nombre de la tabla y los objetos que se quieren guardar en la tabla, estos valores se pasan en el argumento obj, usar el formato del ejemplo
 * 
 * Lo que hara es guardar los registros en la tabla `example_table` y regresar un Arreglo de objetos con los objetos que se guardaron
 * @async
 * @function save
 * @param {obj} obj - Es el objeto que contiene las opciones/argumentos
 * @param {*} obj.tableName - Es el nombre de la tabla
 * @param {*} obj.rows - Son los registros que se quieren guardar en la tabla
 * @returns {Array} Regresa un arreglo de objetos con los objetos que se guardaron
 * @example
 * let obj ={
 *    tableName: 'example_table',
 *    rows: [
 *      { name: 'example_name', age: 'example_age' },
 *      { name: 'example_name2', age: 'example_age2' }
 *    ]
 * }
 * const result = await dal.save(obj)
 */
exports.save = async (obj) => {
  const title = obj.tableName
  const rows = obj.rows

  const headerValues = Object.getOwnPropertyNames(rows[0])

  const google_doc = await doc.getInstance({ refresh: true })

  let sheet = undefined
  if (google_doc.sheetsByTitle[title] === undefined) {
    sheet = await google_doc.addSheet({ title, headerValues, gridProperties: { rowCount: rows.length, columnCount: headerValues.length } })
  } else {
    sheet = google_doc.sheetsByTitle[title]
  }

  await sheet.addRows(rows)

  return getNewRows(sheet, rows.length)
}

/**
 * Regresa todos los registros de una tabla (sheet)
 * @async
 * @function getRows
 * @param {GoogleSpreadsheetWorksheet} sheet - Es la tabla de donde se quiere obtener los registros
 * @returns {Array} Regresa un arreglo de objetos, cada objeto es un registro de la tabla sheet
 * @example
 * const google_doc = await doc.getInstance({ refresh: true })
 *
 * const sheet = google_doc.sheetsByTitle[title]
 * if (sheet === undefined) {
 *   return undefined
 * }
 *
 * const response = await getRows(sheet)
 * 
 */
async function getRows(sheet) {
  const rows = await sheet.getRows()

  let response = []
  for (let i = 0; i < rows.length; i++) {
    let row = {}

    sheet.headerValues.forEach((value) => {
      row[value] = rows[i][value]
    })

    response.push(row)
  }

  return response
}

/**
 * Regresa todos los ultimos `n` registros de una tabla (sheet)
 * @async
 * @function getNewRows
 * @param {GoogleSpreadsheetWorksheet} sheet - Es la tabla de donde se quiere obtener los registros
 * @param {int} size - Es el numero de los ultimos `n` registros que se quieren obtener
 * @returns {Array} Regresa un arreglo de objetos, cada objeto es un registro de la tabla sheet
 * @example
 * await sheet.addRows(rows)
 * const response = await getNewRows(sheet, rows.length)
 */
async function getNewRows(sheet, size) {
  const rows = await sheet.getRows()

  let response = []
  for (let i = (rows.length - size); i < rows.length; i++) {
    let row = {}

    sheet.headerValues.forEach((value) => {
      row[value] = rows[i][value]
    })

    response.push(row)
  }

  return response
}
