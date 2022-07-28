'use strict'

const nodemailer = require('../../../services/nodemailer')
const parser = require('../../../utils/parser')
const dal = require('./dal')
const crypto = require('crypto')

exports.logic = async (list) => {

  const rows = list.map((row) => {
    const PMID = parser.createPMID({ curp: row.curp })
    return {
      PMID: PMID,
      curp: row.curp,
      name: row.name,
      email: row.email,
      status: 'Pending'
    }
  })

  const PMIDobj = {
    tableName: 'PMIDs',
    rows: rows
  }

  try {
    console.log('guardando PMID')
    await dal.savePMID(PMIDobj)
  } catch (err) {
    console.log('Error al guardar PMID en Google Sheets')
    console.log(err)
  }

  console.log('iniciando promesa email')
  Promise.all(rows.map(async (row) => {

    const key = crypto.randomUUID()
    const payload = {
      key,
      body: {
        PMID: row.PMID,
        name: row.name,
        email: row.email
      }
    }

    console.log('guardando en redis')
    const redis_response = await dal.savePMIDRedis(payload)

    if (redis_response !== 'OK') {
      console.log('Error al guardar el codigo')
      console.log(`curp: ${curp}`)
      console.log(`PMID: ${PMID}`)
      return
    }

    console.log('enviando email')
    nodemailer.sendWelcomeEmail({
      to: row.email,
      context: {
        name: row.name,
        url: `${process.env.HTTP_PROTOCOL}://${process.env.DOMAIN_NAME}/api/v1/code/${key}`
      }
    })
  }))
}
