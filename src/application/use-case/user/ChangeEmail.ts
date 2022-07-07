import Customer from '../../../domain/entity/Customer'
import Gym from '../../../domain/entity/Gym'
import User from '../../../domain/entity/User'
import CustomError from '../../../domain/exception/CustomError'
import UserRepository from '../../../domain/repository/UserRepository'
import ValidateUser from '../../validation/ValidateUser'

class ChangeEmail {
  private readonly U: UserRepository
  constructor(userRepository: UserRepository) {
    this.U = userRepository
  }

  async start(id: string, newEmail: string): Promise<User | Gym | Customer> {
    // Validamos los datos
    id = ValidateUser.validateId(id)
    newEmail = ValidateUser.validateEmail(newEmail)
    // Verificamos que existe el usuario enviado
    let userFound = await this.U.getById(id)
    // Si no encontramos usuario arrojamos error
    userFound = ValidateUser.validateUserExistence(userFound!)
    // Si el correo enviado es igual al anterior enviamos un error
    if (userFound.email === newEmail) {
      throw CustomError.badRequest('El email enviado es igual al actual')
    }
    // Actualizamos el email del usuario
    let userUpdated = await this.U.updateById(id, {
      email: newEmail
    })
    // Si no encontramos usuario arrojamos error
    userUpdated = ValidateUser.validateUserExistence(userUpdated!)
    return userUpdated
  }
}
export default ChangeEmail
