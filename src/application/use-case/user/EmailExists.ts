import CustomError from '../../../domain/exception/CustomError'
import UserRepository from '../../../domain/repository/UserRepository'
import ValidateUser from '../../validation/ValidateUser'

class EmailExists {
  private readonly U: UserRepository
  constructor(userRepository: UserRepository) {
    this.U = userRepository
  }

  async start(email: string) {
    // Validamos los datos enviados
    email = ValidateUser.validateEmail(email)
    // Buscamos el email
    const emailFound = await this.U.filterOne({ email })
    // Si encuentra email arrojamos error
    if (emailFound) {
      throw CustomError.badRequest(`El email ${email} ya ha sido registrado`)
    }
    return emailFound
  }
}
export default EmailExists
