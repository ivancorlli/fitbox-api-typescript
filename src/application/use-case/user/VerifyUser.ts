import CustomError from '../../../domain/exception/CustomError'
import UserRepository from '../../../domain/repository/UserRepository'

class VerifyUser {
  private readonly _UserRepository: UserRepository
  constructor(userRepository: UserRepository) {
    this._UserRepository = userRepository
  }

  async start(id: string, verified: boolean) {
    // Requerimos id
    if (!id) {
      throw CustomError('Error al verificar').internalError()
    }
    // Actualizamos al usuario
    const userUpdated = await this._UserRepository.updateById(id, {
      verified
    })
    return userUpdated
  }
}
export default VerifyUser
