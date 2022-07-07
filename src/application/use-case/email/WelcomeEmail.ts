import { EmailConfig } from '../../../config/config'
import CustomError from '../../../domain/exception/CustomError'
import EmailRepository from '../../../domain/repository/EmailRepository'

class WelcomeEmail {
  private readonly E: EmailRepository
  constructor(emailRepository: EmailRepository) {
    this.E = emailRepository
  }

  async start(userEmail: string) {
    // Arrojamos error si no recibimos el email del usuario
    if (!userEmail) {
      throw CustomError.internalError('Email del usuario requerido')
    }
    const newEmail = await this.E.send({
      from: `Bienvenido a Fitmanager <${EmailConfig.user}>`,
      to: userEmail,
      subject: 'Bienvenido',
      html: '<b>Te damos la bienvenida</b>'
    })
    return newEmail
  }
}
export default WelcomeEmail
