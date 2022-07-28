'use strict'

function returnTwoDigits(str) {
  if (str.length === 1) {
    return `0${str}`
  }

  return str
}

function getRandomLetter() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const random = Math.floor(Math.random() * letters.length)
  return letters[random]
}

exports.createPMID = (obj) => {
  const curp = obj.curp
  const today = new Date()

  let result = ''

  result = `${result}${today.getUTCFullYear()}`
  result = `${result}${curp.substring(0, 4)}`
  result = `${result}${returnTwoDigits((today.getUTCMonth() + 1).toString())}`
  result = `${result}${returnTwoDigits(today.getUTCDate())}`
  result = `${result}${getRandomLetter()}${getRandomLetter()}${getRandomLetter()}${getRandomLetter()}`
  
  return result
}
