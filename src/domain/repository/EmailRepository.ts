import Email from '../entity/Email'

interface EmailRepository {
  send: (email: Email) => Promise<string | undefined>
}

export default EmailRepository
