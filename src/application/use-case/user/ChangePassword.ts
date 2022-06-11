import HashRepository from '../../../domain/repository/HashRepository'
import UserRepository from '../../../domain/repository/UserRepository'
import CustomError from '../../../domain/service/ErrorService'

class ChangePassword {
  private readonly _UserRepository: UserRepository
  private readonly _HashRepository: HashRepository
  constructor(userRepository: UserRepository, hashRepository: HashRepository) {
    this._UserRepository = userRepository
    this._HashRepository = hashRepository
  }

  async start(id: string, oldPassword: string, newPassword: string) {
    try {
      // Buscamos el usuario por id
      const userFound = await this._UserRepository.findById(id)
      // Comparamos las contraseñas
      const comparedHash = await this._HashRepository.compareHash(
        // Envaida por el usuario para confirmar identidad
        oldPassword,
        // Guardada en base de datos
        userFound!.password!
      )
      // Si las contrasenias no son iguales arrojamos un error
      const error = new CustomError('La contraseña es incorrecta')
      if (!comparedHash) throw error.badRequest()
      // Creamos un nuevo hash para la nueva cotrasenia
      const newHash = await this._HashRepository.createHash(newPassword)
      // Guardamos nueva contrasenia en base de datos
      const userModified = await this._UserRepository.updateById(
        userFound!._id,
        { password: newHash }
      )
      // Retornamos el usuario modificado
      return userModified
    } catch (err) {
      if (err) throw err
    }
  }
}
export default ChangePassword
