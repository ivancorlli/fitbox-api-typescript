import { UserStatus } from '../../../domain/object-value/UserStatus'
import GymRepository from '../../../domain/repository/GymRepository'

class GetAllGymsActive {
  private readonly GymRepository: GymRepository
  constructor(gymRepository: GymRepository) {
    this.GymRepository = gymRepository
  }

  async start() {
    const gymsFound = await this.GymRepository.filterMany({
      status: UserStatus.Active
    })
    return gymsFound
  }
}
export default GetAllGymsActive
