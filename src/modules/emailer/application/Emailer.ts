import { EmailConfig } from '../../../config/config'
import CustomError from '../../error/CustomError'
import EmailRepository from '../domain/EmailRepository'

class Emailer {
  private readonly from: string
  private readonly E: EmailRepository
  constructor(emailRepository: EmailRepository) {
    this.E = emailRepository
    this.from = EmailConfig.user!
  }

  /*
  ////////////////////////////////////////
  Metodos
  ////////////////////////////////////////
  */

  /**
   * iCorlli: 15-8-2022 ✅ \
   * Envia un email de confirmacion
   * @param email email del usuario
   * @param code codigo de confirmacion
   * @param link link de recuperacion
   * @returns Email del usuario
   */
  async confirm(email: string, code: number, link: string) {
    // Arrojamos error si no recibimos el email
    if (!email) {
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
      from: `Confirmar Registro <${this.from}>`,
      to: email,
      subject: 'Codigo de confirmacion',
      html: `<b>Tu codigo de verificacion es :${code} </b> </n>
             <b>El link de registro es : ${link}</b>
      `
    })
    return newEmail
  }

  async welcome(email: string) {
    // Arrojamos error si no recibimos el email del usuario
    if (!email) {
      throw CustomError.internalError('Email del usuario requerido')
    }
    const newEmail = await this.E.send({
      from: `Bienvenido a Fitmanager <${this.from}>`,
      to: email,
      subject: 'Bienvenido',
      html: '<b>Te damos la bienvenida</b>'
    })
    return newEmail
  }

  async recoverPassword(email: string, link: string) {
    // Arrojamos error si no recibimos emial del usuario
    if (!email) {
      throw CustomError.internalError('Email del destinatario requerido')
    }
    // Arrojamos erros si no recibimos link de recuoeracion
    if (!link) {
      throw CustomError.internalError('Link de verificaion requerido')
    }
    // Enviamos email de recuperacion
    const newEmail = await this.E.send({
      from: `Recuperar contraseña <${this.from}>`,
      to: email,
      subject: 'Recuperar contraseña',
      html: `<b>Tu codigo de recuperacion es :${link} </b> </n>`
    })
    return newEmail
  }
}
export default Emailer
