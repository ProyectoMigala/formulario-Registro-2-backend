'use strict'
/**
 @fileOverview El componente para manejar el formulario.
 @module components/form
 */

const router = require('express').Router()
const dal = require('./dal')
const logic = require('./logic')

/**
 * Retorna una lista de todos los registros de una tabla (sheet)
 * 
 * Necesitas el nombre de la tabla, se pasa por url como parametro
 * {{url}}?tableName=example_table
 * @function GET /api/v1/form/
 * @example
 * curl -X GET http://localhost:3000/api/v1/form?tableName=example_table
 * 
 *  HTTP/1.1 200 OK
 *  {
 *    "result": [
 *      { 
 *        "name": "example",
 *        "lastName": "example",
 *        "phone": "31231231"
 *      },
 *      {
 *        "name": "example2",
 *        "lastName": "example2",
 *        "phone": "3123123122"
 *      },
 *      {
 *        "name": "example",
 *        "lastName": "example",
 *        "phone": "31231231"
 *      }
 *    ]
 *  }
 * 
 *  HTTP/1.1 404 Not Found
 *  {
 *    "msg": "Not found"
 *  }
 * 
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "msg": "Haz una query de busqueda: {{url}}?tableName=something"
 *  }
 */
router.get('/', async (req, res) => {

  const obj = {
    tableName: req.query.tableName
  }

  if (obj.tableName === undefined || obj.tableName === '') {
    res.status(400).json({ msg: 'Haz una query de busqueda: {{url}}?tableName=something' })
    return
  }

  res.json({ msg: "nice try! this should work" })
  return

  const result = await dal.getAll(obj)

  if (result === undefined) {
    res.status(404).json({ msg: 'Not found' })
    return
  }

  res.json({ result })
})

/**
 * Guarda los registros mandados en el post en una tabla (sheet) y regresa los registros guardados, tambien manda email al usuario
 * procura usar estos campos { email, name } (esto puede cambiar, es solo de momento)
 * 
 * Necesitas el nombre de la tabla, y los registros a guardar, se pasan en el body del POST, ejemplo:
 * @function POST /api/v1/form/
 * @example
 * curl -X POST http://localhost:3000/api/v1/form
 *  -H 'Content-Type: application/json'
 *  -d '{"tableName":"example_table","rows":[{"name":"example","email":"example@email.com","phone":"31231231"}]}'
 * 
 *  HTTP/1.1 200 OK
 *  {
 *    "result": [
 *      {
 *        "name": "example",
 *        "email": "example@email.com",
 *        "phone": "31231231"
 *      }
 *    ]
 *  }
 * 
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "msg": "Empty <something>"
 *  }
 */
router.post('/', async (req, res) => {

  const obj = {
    tableName: req.body.tableName,
    rows: req.body.rows
  }

  if (obj.tableName === undefined || obj.tableName === '') {
    res.status(400).json({ msg: 'Empty tableName' })
    return
  }

  if (obj.rows === undefined || obj.rows.length <= 0) {
    res.status(400).json({ msg: 'Empty rows' })
    return
  }

  const result = await dal.save(obj)

  if (result === undefined || result === null) {
    res.status(500).json({ msg: 'Internal Server Error' })
    return
  }

  // create PMID, save PMID, send email
  console.log('iniciando proceso de creacion de PMID')
  logic.logic(result)

  console.log('response')
  res.json({ result })
})

module.exports = router
