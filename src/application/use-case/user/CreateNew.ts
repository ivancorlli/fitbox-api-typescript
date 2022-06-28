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
    try {
      // Verificamos que envia el id
      if (!user._id) {
        throw CustomError.internalError('Error al crear el usuario')
      }
      // Verificamos que envia email
      if (!user.email) {
        throw CustomError.badRequest('Es necesario enviar un email')
      }
      // Verificamos que envia constrasenia
      if (!user.password) {
        throw CustomError.badRequest('Es necesario enviar una contraseña')
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
    } catch (err) {
      if (err) throw err
    }
  }
}
export default CreateNew
