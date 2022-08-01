'use strict'

const router = require('express').Router()
const dal = require('./dal')
const logic = require('./logic')

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

  // response to client
  res.json({ PMID: redis_body.PMID })

  let obj = {
    redis_body,
    payload
  }

  // delete Redis data, update to validated PMID, send email
  logic.logicBackground(obj)
})

module.exports = router
