import UserRepository from '../../../domain/repository/UserRepository'
import CustomError from '../../../domain/service/ErrorService'

class ChangeEmail {
  private readonly _UserRepository: UserRepository
  constructor(userRepository: UserRepository) {
    this._UserRepository = userRepository
  }

  async start(id: string, newEmail: string) {
    try {
      // Verificamos que existe el usuario enviado
      const userFound = await this._UserRepository.findById(id)
      // Si el correo enviado es igual al anterior enviamos un error
      const error = new CustomError('El nuevo correo es igual al actual')
      if (userFound?.email === newEmail) throw error.badRequest()
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
