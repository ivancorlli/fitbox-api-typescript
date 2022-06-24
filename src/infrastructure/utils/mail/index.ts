import nodemailer from 'nodemailer'
import { EmailConfig } from '../../../config/config'
import Email from '../../../domain/entity/Email'
import EmailRepository from '../../../domain/repository/EmailRepository'

const transporter = nodemailer.createTransport({
  // @ts-ignore
  host: EmailConfig.host,
  port: EmailConfig.port,
  secure: true, // true for 465, false for other ports
  auth: {
    user: EmailConfig.user, // generated ethereal user
    pass: EmailConfig.pass // generated ethereal password
  }
})

class Emailer implements EmailRepository {
  private readonly _Transporter = transporter
  async sendNew(email: Email) {
    try {
      const newEmail = await this._Transporter.sendMail({
        from: email.from,
        to: email.to,
        subject: email.subject,
        html: email.html
      })
      return newEmail.accepted.toString()
    } catch (err) {
      console.log(err)
    }
  }
}

export default Emailer
