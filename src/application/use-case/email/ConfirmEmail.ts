import { EmailConfig } from '../../../config/config'
import EmailRepository from '../../../domain/repository/EmailRepository'

class ConfirmEmail {
  private readonly E: EmailRepository
  constructor(emailRepository: EmailRepository) {
    this.E = emailRepository
  }

  async start(userEmail: string, code: number, link: string) {
    const newEmail = await this.E.send({
      from: `Confirmar Registro <${EmailConfig.user}>`,
      to: userEmail,
      subject: 'Codigo de confirmacion',
      html: `<b>Tu codigo de verificacion es :${code} </b>
             <b>El link de registro es : ${link}</b>
      `
    })
    return newEmail
  }
}
export default ConfirmEmail
