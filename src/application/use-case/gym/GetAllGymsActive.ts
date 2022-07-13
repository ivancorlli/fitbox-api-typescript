import Gym from '../../../domain/entity/Gym'
import UserStatus from '../../../domain/object-value/UserStatus'
import GymRepository from '../../../domain/repository/GymRepository'

class GetAllGymsActive {
  private readonly G: GymRepository
  constructor(gymRepository: GymRepository) {
    this.G = gymRepository
  }

  // ? Este metodo es publico
  async start(): Promise<Array<Gym> | null> {
    // Buscar todos los gimnasios activos
    const gymsFound = await this.G.filterMany({
      status: UserStatus.Active
    })
    return gymsFound
  }
}
export default GetAllGymsActive
