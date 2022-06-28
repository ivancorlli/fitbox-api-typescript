import CustomError from '../../../domain/exception/CustomError'
import UserRepository from '../../../domain/repository/UserRepository'

class EmailExists {
  private readonly UserRepository: UserRepository
  constructor(userRepository: UserRepository) {
    this.UserRepository = userRepository
  }

  async start(email: string) {
    try {
      // Arrojar error si no viene el email
      if (!email) throw CustomError.badRequest('Es necesario enviar un email')
      // Sanitizamos email
      email = email.toLowerCase().trim()
      // Buscamos el email
      const emailFound = await this.UserRepository.getByEmail(email)
      // Si encuentra email arrojamos error
      if (emailFound) {
        throw CustomError.badRequest(`El email ${email} ya ha sido registrado`)
      }
      return emailFound
    } catch (err) {
      if (err) throw err
    }
  }
}
export default EmailExists
