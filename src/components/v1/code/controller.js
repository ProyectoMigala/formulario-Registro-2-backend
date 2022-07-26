'use strict'

const router = require('express').Router()
const dal = require('./dal')
const nodemailer = require('../../../services/nodemailer')

const crypto = require('crypto')

router.get('/:uid', async (req, res) => {

  let payload = {
    key: req.params.uid
  }

  const redis_raw_body = await dal.getCode(payload)

  if (redis_raw_body === undefined || redis_raw_body === null) {
    res.status(404).json({ msg: 'Not found' })
    return
  }

  const redis_body = JSON.parse(redis_raw_body)

  res.json({ code: redis_body.code })

  nodemailer.sendCode({
    to: redis_body.email,
    context: {
      code: redis_body.code,
      name: redis_body.name
    }
  })
})

router.post('/', async (req, res) => {

  const key = crypto.randomUUID()

  let payload = {
    key,
    body: {
      code: req.body.code,
      name: 'juanito',
      email: 'juanito@gmail.com'
    }
  }

  const response = await dal.saveCode(payload)

  if (response !== 'OK') {
    res.status(500).json({ msg: 'Error' })
    return
  }

  res.json({ key })
})

module.exports = router
