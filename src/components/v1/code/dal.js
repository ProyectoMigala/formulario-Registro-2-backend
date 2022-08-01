'use strict'
const redis_singleton = require('../../../services/redis_singleton')
const doc_code = require('../../../services/google_sheet_code')

exports.getPMID = async (obj) => {
  const redis = await redis_singleton.getInstance()
  return await redis.get(obj.key)
}

exports.deleteRedisPMID = async (obj) => {
  const redis = await redis_singleton.getInstance()
  return await redis.del(obj.key)
}

exports.updateStatusPMID = async (obj) => {
  const title = 'PMIDs'

  const google_doc = await doc_code.getInstance({ refresh: true })

  const sheet = google_doc.sheetsByTitle[title]
  if (sheet === undefined) {
    return undefined
  }

  const obj_row = {
    sheet: sheet,
    PMID: obj.PMID,
  }

  const row = await getRow(obj_row)

  if (row === undefined) {
    return undefined
  }

  row.status = 'Verified'
  await row.save()
}

async function getRow(obj) {
  const sheet = obj.sheet
  const rows = await sheet.getRows()

  let row = rows.find((row) => {
    return row.PMID === obj.PMID
  })

  return row
}
