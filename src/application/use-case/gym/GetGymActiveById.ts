import Gym from '../../../domain/entity/Gym'
import CustomError from '../../../domain/exception/CustomError'
import ErrorResponse from '../../../domain/object-value/ErrorResponse'
import { UserStatus } from '../../../domain/object-value/UserStatus'
import GymRepository from '../../../domain/repository/GymRepository'
import ValidateGym from '../../validation/ValidateGym'

class GetGymActiveById {
  private readonly GymRepository: GymRepository
  constructor(gymRepository: GymRepository) {
    this.GymRepository = gymRepository
  }

  async start(gymId: string): Promise<Gym> {
    // Validamos datos
    gymId = ValidateGym.validateId(gymId)
    // Buscamos en base dedatos el gimnasio
    let gymFound = await this.GymRepository.getById(gymId)
    // Arrojamos error si no existe un plan con el id
    gymFound = ValidateGym.validateUserExistence(gymFound!)
    // Arrojamos error si el gimansio esta suspendido
    if (gymFound.status === UserStatus.Suspended) {
      throw CustomError.badRequest(ErrorResponse.UserSuspended)
    }
    return gymFound
  }
}
export default GetGymActiveById
