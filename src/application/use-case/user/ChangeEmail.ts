import CustomError from '../../../domain/exception/CustomError'
import UserRepository from '../../../domain/repository/UserRepository'

class ChangeEmail {
  private readonly _UserRepository: UserRepository
  constructor(userRepository: UserRepository) {
    this._UserRepository = userRepository
  }

  async start(id: string, newEmail: string) {
    try {
      // Requerir id del usuario
      if (!id) {
        throw CustomError.internalError('Error al actualizar email')
      }
      // Requerir nuevo email
      if (!newEmail) {
        throw CustomError.badRequest('Es necesario enviar un email')
      }
      // Verificamos que existe el usuario enviado
      const userFound = await this._UserRepository.getById(id)
      // Si no encontramos usuario arrojamos error
      if (!userFound) {
        throw CustomError.badRequest('Usuario inexistente')
      }
      // Sanitizamos email
      newEmail = newEmail.toLowerCase().trim()
      // Si el correo enviado es igual al anterior enviamos un error
      if (userFound.email === newEmail) {
        throw CustomError.badRequest('El email enviado es igual al actual')
      }
      // Actualizamos el email del usuario
      const userUpdated = await this._UserRepository.updateById(id, {
        email: newEmail
      })
      return userUpdated
    } catch (err) {
      if (err) throw err
    }
  }
}
export default ChangeEmail
