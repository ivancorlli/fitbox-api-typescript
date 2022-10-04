import Emailer from './EmailSchema'
import EmailRepository from '../domain/EmailRepository'
import IEmail from '../domain/IEmail'

class DbEmail implements EmailRepository {
  private readonly _Email = new Emailer()

  async send(email: IEmail): Promise<string | undefined> {
    // Creamos email
    const newEmail = await this._Email.send(email)
    return newEmail
  }
}
export default DbEmail
