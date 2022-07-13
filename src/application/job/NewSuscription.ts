import CommandNames from '../../domain/object-value/CommandNames'
import EmailRepository from '../../domain/repository/EmailRepository'
import ConfirmEmail from '../use-case/email/ConfirmEmail'
import WelcomeEmail from '../use-case/email/WelcomeEmail'

class NewUser {
  name = CommandNames.NewUser
  private readonly w
  private readonly c
  constructor(emailRepo: EmailRepository) {
    this.w = new WelcomeEmail(emailRepo)
    this.c = new ConfirmEmail(emailRepo)
  }

  async handler() {
    // TODO Notificar al gimnasio que tiene un nuevo cliente
    // TODO Enviar un correo de confirmacion al gimnasio de la suscripcion
    // TODO Enviar un correo de confirmacion de suscripcion al cliente
  }
}
export default NewUser
