import nodemailer from 'nodemailer'
import { EmailConfig } from '../../../config/config'
import EmailRepository from '../domain/EmailRepository'
import IEmail from '../domain/IEmail'
import CustomError from '../../error/CustomError'

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

class EmailSchema implements EmailRepository {
  private readonly _Transporter = transporter
  async send(email: IEmail) {
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

export default EmailSchema
