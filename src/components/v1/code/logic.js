'use strict'

const nodemailer = require('../../../services/nodemailer')
const dal = require('./dal')

exports.logicBackground = async (obj) => {

  const payload = obj.payload

  dal.deleteRedisPMID(payload)

  const redis_body = obj.redis_body

  dal.updateStatusPMID({
    PMID: redis_body.PMID,
  })

  nodemailer.sendPMID({
    to: redis_body.email,
    context: {
      PMID: redis_body.PMID,
      name: redis_body.name
    }
  })
}
