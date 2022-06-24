import CustomError from '../../../domain/exception/CustomError'
import UserRepository from '../../../domain/repository/UserRepository'

class ChangeEmail {
  private readonly _UserRepository: UserRepository
  constructor(userRepository: UserRepository) {
    this._UserRepository = userRepository
  }

  async start(id: string, newEmail: string) {
    // Requerir id del usuario
    if (!id) {
      throw CustomError('Error al actualizar email').internalError()
    }
    // Requerir nuevo email
    if (!newEmail) {
      throw CustomError('Es necesario enviar un email').badRequest()
    }
    // Verificamos que existe el usuario enviado
    const userFound = await this._UserRepository.getById(id)
    // Si no encontramos usuario arrojamos error
    if (!userFound) {
      throw CustomError('Usuario inexistente').badRequest()
    }
    // Sanitizamos email
    newEmail = newEmail.toLowerCase().trim()
    // Si el correo enviado es igual al anterior enviamos un error
    if (userFound.email === newEmail) {
      throw CustomError('El email enviado es igual al actual').badRequest()
    }
    // Actualizamos el email del usuario
    const userUpdated = await this._UserRepository.updateById(id, {
      email: newEmail
    })
    return userUpdated
  }
}
export default ChangeEmail
