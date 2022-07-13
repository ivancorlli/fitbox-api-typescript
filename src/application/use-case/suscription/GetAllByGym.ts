import Suscription from '../../../domain/entity/Suscription'
import SuscriptionRepository from '../../../domain/repository/SuscriptionRepository'
import ValidateSuscription from '../../validation/ValidateSuscription'

class GetAllByGym {
  private readonly S: SuscriptionRepository
  constructor(sucriptionRepo: SuscriptionRepository) {
    this.S = sucriptionRepo
  }

  async start(gymId: string): Promise<Array<Suscription> | null> {
    // Validamos id del gimnasio
    ValidateSuscription.validateGym(gymId)
    // Buscamos todas las suscripciones del gimnasio
    const suscriptionsFound = await this.S.filterMany(
      {
        gym: gymId
      },
      ['customer', 'gym', 'plan']
    )
    return suscriptionsFound
  }
}
export default GetAllByGym
