'use strict'
const redis_singleton = require('../../../services/redis_singleton')

exports.getCode = async (obj) => {
  const redis = await redis_singleton.getInstance()
  return await redis.get(obj.key)
}

exports.saveCode = async (obj) => {
  const redis = await redis_singleton.getInstance()
  return await redis.set(obj.key, JSON.stringify(obj.body))
}
