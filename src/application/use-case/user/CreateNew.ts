import User from '../../../domain/entity/User'
import CustomError from '../../../domain/exception/CustomError'
import HashRepository from '../../../domain/repository/HashRepository'
import UserRepository from '../../../domain/repository/UserRepository'

class CreateNew {
  private readonly UserRepository: UserRepository
  private readonly HashRepository: HashRepository
  constructor(userRepository: UserRepository, hashRepository: HashRepository) {
    this.UserRepository = userRepository
    this.HashRepository = hashRepository
  }

  async start(user: User) {
    // Verificamos que envia el id
    if (!user._id) {
      throw CustomError('Error al crear el usuario').internalError()
    }
    // Verificamos que envia email
    if (!user.email) {
      throw CustomError('Es necesario enviar un email').badRequest()
    }
    // Verificamos que envia constrasenia
    if (!user.password) {
      throw CustomError('Es necesario enviar una contraseña').badRequest()
    }
    // Sanitizamos los datos ingresados
    user.email = user.email.toLowerCase().trim()
    user.password = user.password.trim()
    // Hasheamos contrasenia para guardar en DDBB
    const hashPassword = await this.HashRepository.createHash(user.password)
    user.password = hashPassword
    // Creamos el usuario
    const newUser = await this.UserRepository.save(user)
    return newUser
  }
}
export default CreateNew
