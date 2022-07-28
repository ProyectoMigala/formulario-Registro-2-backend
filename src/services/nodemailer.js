'use strict'
/**
 @fileOverview Es el archivo principal para mandar emails.
 @module services/nodemailer
 */
const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')

/**
 * Inicializa el servicio de nodemailer
 */
let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

/**
 * Cargamos la ruta de los templates
 */
const handlebarOptions = {
  viewEngine: {
    partialsDir: `${process.cwd()}/templates/emails`,
    defaultLayout: false,
  },
  viewPath: `${process.cwd()}/templates/emails`,
}

/**
 * Agregamos el handlebars al compile de nodemailer
 */
transporter.use('compile', hbs(handlebarOptions))

/**
 * Funcion privada para mandar emails
 * @async
 * @function sendEmail
 * @param {opts} opts -  Es el objeto que contiene las opciones/argumentos
 * @example
 *  const mailOptions = {
 *    from: '"Migala" <no-reply@migala.mx>',
 *    to: 'example@email.com',
 *    subject: 'Bienvenido!',
 *    template: 'email',
 *    context: {
 *      name: 'Example',
 *      company: 'Company Name'
 *    }
 *  }
 *  sendEmail(mailOptions)
 */
async function sendEmail(opts) {
  const mailOptions = {
    from: opts.from,
    to: opts.to,
    subject: opts.subject,
    template: opts.template,
    context: opts.context
  }

  let info = undefined
  try {
    info = await transporter.sendMail(mailOptions)
  } catch (error) {
    console.log(error)
    return
  }

  console.log("Message sent: %s", info.messageId)
}

/**
 * Funcion publica para mandar emails con el template de Bienvenida
 * @async
 * @function sendWelcomeEmail
 * @param {opts} opts -  Es el objeto que contiene las opciones/argumentos
 * @example
 *  const mailOptions = {
 *    to: 'example@email.com',
 *    context: {
 *      name: 'Example',
 *      company: 'Migala'
 *    }
 *  }
 *  sendEmail(mailOptions)
 */
exports.sendWelcomeEmail = async (opts) => {
  const mailOptions = {
    from: '"Migala" <no-reply@migala.mx>',
    to: opts.to,
    subject: 'Bienvenido!',
    template: 'email',
    context: opts.context
  }

  sendEmail(mailOptions)
}

exports.sendPMID = async (opts) => {
  const mailOptions = {
    from: '"Migala" <no-reply@migala.mx>',
    to: opts.to,
    subject: 'Tu ID del ProyectoMigala!',
    template: 'confirmation',
    context: opts.context
  }

  sendEmail(mailOptions)
}
