import Customer from '../../../domain/entity/Customer'
import Gym from '../../../domain/entity/Gym'
import User from '../../../domain/entity/User'
import CustomError from '../../../domain/exception/CustomError'
import ErrorResponse from '../../../domain/object-value/ErrorResponse'
import UserStatus from '../../../domain/object-value/UserStatus'
import HashRepository from '../../../domain/repository/HashRepository'
import UserRepository from '../../../domain/repository/UserRepository'
import ValidateUser from '../../validation/ValidateUser'

class Login {
  private readonly U: UserRepository
  private readonly H: HashRepository
  constructor(userRepository: UserRepository, hashRepository: HashRepository) {
    this.U = userRepository
    this.H = hashRepository
  }

  async start(email: string, password: string): Promise<User | Gym | Customer> {
    // Validamos los datos
    email = ValidateUser.validateEmail(email)
    password = ValidateUser.validatePassword(password)
    // Buscamos el usuario por su email
    let userFound = await this.U.filterOne({ email })
    // Arrojamos error si no encontramos un usuario
    userFound = ValidateUser.validateUserExistence(userFound!)
    // Si no esta verificado no le permitimos ingresar
    if (!userFound.verified) {
      throw CustomError.forbidden(ErrorResponse.UserNotVerified)
    }
    // Si la cuenta esta suspendida no le permitimos ingresar
    if (userFound.status === UserStatus.Suspended) {
      throw CustomError.forbidden(ErrorResponse.UserSuspended)
    }
    // Si existe el usuairo comparamos contrasenia con el hash guardado
    const hashCompared = await this.H.compareHash(password, userFound.password!)
    // Verificamos que las contrasenias sean iguales
    if (!hashCompared) {
      throw CustomError.badRequest(ErrorResponse.IncorrectPassword)
    }
    // Retornamos el usuario encontrado
    userFound.password = undefined
    return userFound
  }
}
export default Login
