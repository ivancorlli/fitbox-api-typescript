import Gym from '../../../domain/entity/Gym'
import GymRepository from '../../../domain/repository/GymRepository'
import ValidateGym from '../../validation/ValidateGym'

class GetData {
  private readonly G: GymRepository
  constructor(gymRepository: GymRepository) {
    this.G = gymRepository
  }

  async start(gymId: string): Promise<Gym> {
    // Validamos los datos
    gymId = ValidateGym.validateId(gymId)
    let gymFound = await this.G.getById(gymId)
    // Arrojamos error si no existe un plan con el id
    gymFound = ValidateGym.validateUserExistence(gymFound!)
    return gymFound
  }
}
export default GetData
