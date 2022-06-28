import Gym from '../../../domain/entity/Gym'
import CustomError from '../../../domain/exception/CustomError'
import GymRepository from '../../../domain/repository/GymRepository'

class GetGym {
  private readonly GymRepository: GymRepository
  constructor(gymRepository: GymRepository) {
    this.GymRepository = gymRepository
  }

  async start(gymId: string): Promise<Gym> {
    // Arrojamos error si no recibimos id
    if (!gymId) {
      throw CustomError.internalError('Es necesario enviar id')
    }
    const gymFound = await this.GymRepository.getById(gymId)
    // Arrojamos error si no existe un plan con el id
    if (!gymFound) {
      throw CustomError.badRequest('No existe el gimnasio solicitado')
    }
    return gymFound
  }
}
export default GetGym
