import CommandNames from '../../domain/object-value/CommandNames'
import EmailRepository from '../../domain/repository/EmailRepository'
import RecoverPassword from '../use-case/email/RecoverPassword'

class ForgotPassword {
  name = CommandNames.ForgotPassword
  private readonly f
  constructor(emailRepo: EmailRepository) {
    this.f = new RecoverPassword(emailRepo)
  }

  async handler(userEmail: string, link: string) {
    await this.f.start(userEmail, link)
  }
}
export default ForgotPassword
