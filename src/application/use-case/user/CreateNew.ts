import Customer from '../../../domain/entity/Customer'
import Gym from '../../../domain/entity/Gym'
import User from '../../../domain/entity/User'
import HashRepository from '../../../domain/repository/HashRepository'
import UserRepository from '../../../domain/repository/UserRepository'
import ValidateUser from '../../validation/ValidateUser'

class CreateNew {
  private readonly U: UserRepository
  private readonly H: HashRepository
  constructor(userRepository: UserRepository, hashRepository: HashRepository) {
    this.U = userRepository
    this.H = hashRepository
  }

  async start(user: User): Promise<User | Gym | Customer> {
    // Validamos los datos
    user._id = ValidateUser.validateId(user._id)
    user.email = ValidateUser.validateEmail(user.email)
    user.password = ValidateUser.validatePassword(user.password!)
    // Hasheamos contrasenia para guardar en DDBB
    const hashPassword = await this.H.createHash(user.password)
    user.password = hashPassword
    // Creamos el usuario
    const newUser = await this.U.create(user)
    return newUser
  }
}
export default CreateNew
