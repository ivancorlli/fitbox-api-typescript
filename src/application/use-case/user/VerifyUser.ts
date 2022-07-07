import Customer from '../../../domain/entity/Customer'
import Gym from '../../../domain/entity/Gym'
import User from '../../../domain/entity/User'
import CustomError from '../../../domain/exception/CustomError'
import UserRepository from '../../../domain/repository/UserRepository'
import ValidateUser from '../../validation/ValidateUser'

class VerifyUser {
  private readonly U: UserRepository
  constructor(userRepository: UserRepository) {
    this.U = userRepository
  }

  async start(
    id: string,
    code: number,
    decrypted: number
  ): Promise<User | Gym | Customer> {
    // Validamos datos
    id = ValidateUser.validateId(id)
    // Verificamos el codigo encriptado con el cargado por el usuario
    if (code !== decrypted) {
      throw CustomError.badRequest('El codigo enviado es invalido')
    }
    // Actualizamos al usuario
    let userFound = await this.U.updateById(id, { verified: true })
    // Arrojamos error si no enctramos usuario
    userFound = ValidateUser.validateUserExistence(userFound!)
    return userFound
  }
}
export default VerifyUser
