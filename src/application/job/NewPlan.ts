import CommandNames from '../../domain/object-value/CommandNames'
import EmailRepository from '../../domain/repository/EmailRepository'
import ConfirmEmail from '../use-case/email/ConfirmEmail'
import WelcomeEmail from '../use-case/email/WelcomeEmail'

class NewPlan {
  name = CommandNames.NewPlan
  private readonly w
  private readonly c
  constructor(emailRepo: EmailRepository) {
    this.w = new WelcomeEmail(emailRepo)
    this.c = new ConfirmEmail(emailRepo)
  }

  async handler(userEmail: string, code: number, link: string) {
    await this.w.start(userEmail)
    await this.c.start(userEmail, code, link)
  }
}
export default NewPlan
