import CustomError from '../../../domain/exception/CustomError'
import HashRepository from '../../../domain/repository/HashRepository'
import UserRepository from '../../../domain/repository/UserRepository'

class RecoverPassword {
  private readonly _UserRepository: UserRepository
  private readonly _HashRepository: HashRepository
  constructor(userRepository: UserRepository, hashRepository: HashRepository) {
    this._UserRepository = userRepository
    this._HashRepository = hashRepository
  }

  async start(id: string, newPassword: string) {
    // Requerimos id
    if (!id) {
      throw CustomError('Error al recuperar contraseña').internalError()
    }
    // Requerimos nueva contrasenia
    if (!newPassword) {
      throw CustomError('Es ncesario enviar nueva contraseña').badRequest()
    }
    // Buscamos el usuario por id
    const userFound = await this._UserRepository.getById(id)
    // Sanitizamos password
    newPassword = newPassword.trim()
    // Creamos un nuevo hash para la nueva cotrasenia
    const newHash = await this._HashRepository.createHash(newPassword)
    // Guardamos nueva contrasenia en base de datos
    const userModified = await this._UserRepository.updateById(userFound!._id, {
      password: newHash
    })
    // Retornamos el usuario modificado
    return userModified
  }
}
export default RecoverPassword
