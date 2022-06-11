import UserRepository from '../../../domain/repository/UserRepository'

class VerifyUser {
  private readonly _UserRepository: UserRepository
  constructor(userRepository: UserRepository) {
    this._UserRepository = userRepository
  }

  async start(id: string, verified: boolean) {
    try {
      // Verificamos que exista un usuario con ese id
      const userMatch = await this._UserRepository.findById(id)
      // Actualizamos al usuario
      const userUpdated = await this._UserRepository.updateById(userMatch._id, {
        verified
      })
      return userUpdated
    } catch (err) {
      if (err) throw err
    }
  }
}
export default VerifyUser
