import Gym from '../../../domain/entity/Gym'
import CustomError from '../../../domain/exception/CustomError'
import { UserStatus } from '../../../domain/object-value/UserStatus'
import GymRepository from '../../../domain/repository/GymRepository'

class GetGymActiveById {
  private readonly GymRepository: GymRepository
  constructor(gymRepository: GymRepository) {
    this.GymRepository = gymRepository
  }

  async start(gymId: string): Promise<Gym> {
    // Arrojamos error si no recibimos id
    if (!gymId) {
      throw CustomError.internalError('Es necesario enviar id')
    }
    const planFound = await this.GymRepository.getById(gymId)
    // Arrojamos error si no existe un plan con el id
    if (!planFound) {
      throw CustomError.badRequest('No existe el gimnasio solicitado')
    }
    if (planFound.status === UserStatus.Suspended) {
      throw CustomError.badRequest('Gimnasio suspendido')
    }
    return planFound
  }
}
export default GetGymActiveById
