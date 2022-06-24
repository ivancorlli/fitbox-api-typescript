import { UserStatus } from '../../../domain/object-value/UserStatus'
import UserRepository from '../../../domain/repository/UserRepository'

class UpdateStatus {
  private readonly _UserRepository: UserRepository
  constructor(userRepository: UserRepository) {
    this._UserRepository = userRepository
  }

  async start(id: string, status: UserStatus) {
    const userUpdated = await this._UserRepository.updateById(id, {
      status
    })
    return userUpdated
  }
}
export default UpdateStatus
