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
      throw CustomError('Es necesario enviar id').internalError()
    }
    const gymFound = await this.GymRepository.getById(gymId)
    // Arrojamos error si no existe un plan con el id
    if (!gymFound) {
      throw CustomError('No existe el gimnasio solicitado').badRequest()
    }
    return gymFound
  }
}
export default GetGym
