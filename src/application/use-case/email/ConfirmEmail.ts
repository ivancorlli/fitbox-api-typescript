import { EmailConfig } from '../../../config/config'
import CustomError from '../../../domain/exception/CustomError'
import EmailRepository from '../../../domain/repository/EmailRepository'

class ConfirmEmail {
  private readonly E: EmailRepository
  constructor(emailRepository: EmailRepository) {
    this.E = emailRepository
  }

  async start(userEmail: string, code: number, link: string) {
    // Arrojamos error si no recibimos el email
    if (!userEmail) {
      throw CustomError.internalError('Email de confirmacion requerido')
    }
    // Arrojamos error si no recibimos el codigo de verificacion
    if (!code) {
      throw CustomError.internalError('Codigo de verificaion requerido')
    }
    // Si el coigo es menor a 6 digitos arrojamos error
    if (code < 100000) {
      throw CustomError.internalError('Codigo menor a 6 digitos')
    }
    // Si no recibimos el link de verificacion arrojamos error
    if (!link) {
      throw CustomError.internalError('Link de verificacion requerido')
    }
    const newEmail = await this.E.send({
      from: `Confirmar Registro <${EmailConfig.user}>`,
      to: userEmail,
      subject: 'Codigo de confirmacion',
      html: `<b>Tu codigo de verificacion es :${code} </b> </n>
             <b>El link de registro es : ${link}</b>
      `
    })
    return newEmail
  }
}
export default ConfirmEmail
