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
      throw CustomError('Es necesario enviar id').internalError()
    }
    const planFound = await this.GymRepository.getById(gymId)
    // Arrojamos error si no existe un plan con el id
    if (!planFound) {
      throw CustomError('No existe el gimnasio solicitado').badRequest()
    }
    if (planFound.status === UserStatus.Suspended) {
      throw CustomError('Gimnasio suspendido').badRequest()
    }
    return planFound
  }
}
export default GetGymActiveById
