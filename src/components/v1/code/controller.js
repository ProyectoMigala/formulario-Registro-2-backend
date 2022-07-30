'use strict'

const router = require('express').Router()
const dal = require('./dal')
const nodemailer = require('../../../services/nodemailer')

router.get('/:uid', async (req, res) => {

  let payload = {
    key: req.params.uid
  }

  const redis_raw_body = await dal.getPMID(payload)

  if (redis_raw_body === undefined || redis_raw_body === null) {
    res.status(404).json({ msg: 'Not found' })
    return
  }

  const redis_body = JSON.parse(redis_raw_body)

  res.json({ PMID: redis_body.PMID })

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
})

module.exports = router
