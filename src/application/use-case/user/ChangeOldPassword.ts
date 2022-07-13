import Customer from '../../../domain/entity/Customer'
import Gym from '../../../domain/entity/Gym'
import User from '../../../domain/entity/User'
import CustomError from '../../../domain/exception/CustomError'
import ErrorResponse from '../../../domain/object-value/ErrorResponse'
import HashRepository from '../../../domain/repository/HashRepository'
import UserRepository from '../../../domain/repository/UserRepository'
import ValidateUser from '../../validation/ValidateUser'

class ChangeOldPassword {
  private readonly U: UserRepository
  private readonly H: HashRepository
  constructor(userRepository: UserRepository, hashRepository: HashRepository) {
    this.U = userRepository
    this.H = hashRepository
  }

  async start(
    id: string,
    oldPassword: string,
    newPassword: string
  ): Promise<User | Gym | Customer> {
    // Validamos los datos
    id = ValidateUser.validateId(id)
    oldPassword = ValidateUser.validatePassword(oldPassword)
    newPassword = ValidateUser.validatePassword(newPassword)
    // Buscamos el usuario por id
    let userFound = await this.U.getById(id)
    // Arrojamos error si no encontramos un usuario
    userFound = ValidateUser.validateUserExistence(userFound!)
    // Comparamos las contraseñas
    const comparedHash = await this.H.compareHash(
      oldPassword,
      userFound.password!
    )
    // Si las contrasenias no son iguales arrojamos un error
    if (!comparedHash) {
      throw CustomError.badRequest(ErrorResponse.IncorrectPassword)
    }
    // Creamos un nuevo hash para la nueva cotrasenia
    const newHash = await this.H.createHash(newPassword)
    // Guardamos nueva contrasenia en base de datos
    let userModified = await this.U.updateById(userFound._id, {
      password: newHash
    })
    // Arrojamos error si no encontramos un usuario
    userModified = ValidateUser.validateUserExistence(userModified!)
    return userModified
  }
}
export default ChangeOldPassword
