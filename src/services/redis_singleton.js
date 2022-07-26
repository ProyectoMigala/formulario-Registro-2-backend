'use strict'
const redis = require('redis')

const client = redis.createClient({ url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` })

client.on('error', (err) => {
  console.log('Redis Client Error', err)
})

exports.getInstance = async () => {
  if (client.isOpen === false) {
    await client.connect()
  }

  return client
}
