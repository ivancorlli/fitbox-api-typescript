import CustomError from '../../../domain/exception/CustomError'
import HashRepository from '../../../domain/repository/HashRepository'
import UserRepository from '../../../domain/repository/UserRepository'

class ChangeOldPassword {
  private readonly _UserRepository: UserRepository
  private readonly _HashRepository: HashRepository
  constructor(userRepository: UserRepository, hashRepository: HashRepository) {
    this._UserRepository = userRepository
    this._HashRepository = hashRepository
  }

  async start(id: string, oldPassword: string, newPassword: string) {
    // Requerimos id
    if (!id) {
      throw CustomError('Error al cambiar contraseña').internalError()
    }
    // Requerimos vieja contrasenia
    if (!oldPassword) {
      throw CustomError('Es ncesario enviar contraseña anterior').badRequest()
    }
    // Requerimos nueva contrasenia
    if (!newPassword) {
      throw CustomError('Es ncesario enviar nueva contraseña').badRequest()
    }
    // Buscamos el usuario por id
    const userFound = await this._UserRepository.getById(id)
    // Sanitizamos password
    oldPassword = oldPassword.trim()
    newPassword = newPassword.trim()
    // Comparamos las contraseñas
    const comparedHash = await this._HashRepository.compareHash(
      // Envaida por el usuario para confirmar identidad
      oldPassword,
      // Guardada en base de datos
      userFound!.password!
    )
    // Si las contrasenias no son iguales arrojamos un error

    if (!comparedHash) {
      throw CustomError('La contraseña es incorrecta').badRequest()
    }
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
export default ChangeOldPassword
