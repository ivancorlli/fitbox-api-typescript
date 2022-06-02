// import Gym from '../../../domain/entity/Gym'
import User from '../../../domain/entity/User'
import GymRepository from '../../../domain/repository/GymRepository'

class CreateNew {
  private readonly _GymRepository: GymRepository
  constructor(gymRepository: GymRepository) {
    this._GymRepository = gymRepository
  }

  async start(body: User) {
    const newGym: User = await this._GymRepository.save(body)
    return newGym
  }
}

export default CreateNew
