import IEmail from './IEmail'

interface EmailRepository {
  // Guardar en base de datos
  send: (email: IEmail) => Promise<string | undefined>
}

export default EmailRepository
