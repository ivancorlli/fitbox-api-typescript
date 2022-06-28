import CustomError from '../../../domain/exception/CustomError'
import UserRepository from '../../../domain/repository/UserRepository'

class VerifyUser {
  private readonly _UserRepository: UserRepository
  constructor(userRepository: UserRepository) {
    this._UserRepository = userRepository
  }

  async start(id: string, verified: boolean) {
    try {
      // Requerimos id
      if (!id) {
        throw CustomError.internalError()
      }
      // Actualizamos al usuario
      const userUpdated = await this._UserRepository.updateById(id, {
        verified
      })
      return userUpdated
    } catch (err) {
      if (err) throw err
    }
  }
}
export default VerifyUser
