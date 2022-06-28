import nodemailer from 'nodemailer'
import { EmailConfig } from '../../../config/config'
import Email from '../../../domain/entity/Email'
import CustomError from '../../../domain/exception/CustomError'
import EmailRepository from '../../../domain/repository/EmailRepository'

const transporter = nodemailer.createTransport({
  // @ts-ignore
  host: EmailConfig.host?.toString(),
  port: EmailConfig.port,
  secure: true, // true for 465, false for other ports
  auth: {
    user: EmailConfig.user, // generated ethereal user
    pass: EmailConfig.pass // generated ethereal password
  }
})

class Emailer implements EmailRepository {
  private readonly _Transporter = transporter
  async send(email: Email) {
    try {
      const newEmail = await this._Transporter.sendMail({
        from: email.from,
        to: email.to,
        subject: email.subject,
        html: email.html
      })
      return newEmail.accepted.toString()
    } catch (err) {
      if (err) {
        throw CustomError.internalError()
      }
    }
  }
}

export default Emailer
