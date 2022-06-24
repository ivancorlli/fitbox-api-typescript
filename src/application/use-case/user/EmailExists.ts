import CustomError from '../../../domain/exception/CustomError'
import UserRepository from '../../../domain/repository/UserRepository'

class EmailExists {
  private readonly UserRepository: UserRepository
  constructor(userRepository: UserRepository) {
    this.UserRepository = userRepository
  }

  async start(email: string) {
    // Arrojar error si no viene el email
    if (!email) throw CustomError('Es necesario enviar un email').badRequest()
    // Sanitizamos email
    email = email.toLowerCase().trim()
    // Buscamos el email
    const emailFound = await this.UserRepository.getByEmail(email)
    // Si encuentra email arrojamos error
    if (emailFound) {
      throw CustomError(`El email ${email} ya ha sido registrado`).badRequest()
    }
    return emailFound
  }
}
export default EmailExists
