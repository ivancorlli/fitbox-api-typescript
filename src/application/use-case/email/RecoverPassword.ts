import { EmailConfig } from '../../../config/config'
import CustomError from '../../../domain/exception/CustomError'
import EmailRepository from '../../../domain/repository/EmailRepository'

class RecoverPassword {
  private readonly E: EmailRepository
  constructor(emailRepository: EmailRepository) {
    this.E = emailRepository
  }

  async start(userEmail: string, link: string) {
    // Arrojamos error si no recibimos emial del usuario
    if (!userEmail) {
      throw CustomError.internalError('Email del usuario requerido')
    }
    // Arrojamos erros si no recibimos link de recuoeracion
    if (!link) {
      throw CustomError.internalError('Link de verificaion requerido')
    }
    // Enviamos email de recuperacion
    const newEmail = await this.E.send({
      from: `Recuperar contraseña <${EmailConfig.user}>`,
      to: userEmail,
      subject: 'Recuperar contraseña',
      html: `<b>Tu codigo de recuperacion es :${link} </b> </n>`
    })
    return newEmail
  }
}
export default RecoverPassword
