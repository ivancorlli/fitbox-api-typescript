import Email from '../entity/Email'

interface EmailRepository {
  sendNew: (email: Email) => Promise<string | undefined>
}

export default EmailRepository
