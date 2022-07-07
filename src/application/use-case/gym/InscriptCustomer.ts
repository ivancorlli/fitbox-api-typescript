import GymRepository from '../../../domain/repository/GymRepository'
import ValidateGym from '../../validation/ValidateGym'

class InscriptCustomer {
  private readonly G: GymRepository
  constructor(gymRepo: GymRepository) {
    this.G = gymRepo
  }

  async start(gymId: string, customerId: string, date?: number | string) {
    // Validamos datos
    gymId = ValidateGym.validateId(gymId)
    customerId = ValidateGym.validateCustomerId(customerId)
    // Inscribimos al cliente en el gimnasio
    const gymUpdated = await this.G.updateById(gymId, {
      $addToSet: {
        registeredCustomers: {
          date,
          customerId
        }
      }
    })
    return gymUpdated
  }
}

export default InscriptCustomer
