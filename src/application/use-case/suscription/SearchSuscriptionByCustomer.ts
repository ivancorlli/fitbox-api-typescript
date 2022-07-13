import Suscription from '../../../domain/entity/Suscription'
import SuscriptionStatus from '../../../domain/object-value/SuscriptionStatus'
import SuscriptionRepository from '../../../domain/repository/SuscriptionRepository'
import ValidateSuscription from '../../validation/ValidateSuscription'

class SearchSuscriptionsByCustomer {
  private readonly S: SuscriptionRepository
  constructor(sucriptionRepo: SuscriptionRepository) {
    this.S = sucriptionRepo
  }

  async start(
    gymId: string,
    number: number
  ): Promise<Array<Suscription> | Suscription | null> {
    // Validamos id del gimnasio
    ValidateSuscription.validateGym(gymId)
    let suscriptionsFound: Array<Suscription> | Suscription | null
    // Si enviamos el numero de suscripcion filtramos la respuesta
    if (number) {
      // Validamos numero de suscripcion
      ValidateSuscription.validateNumber(number)
      suscriptionsFound = await this.S.filterOne(
        {
          gym: gymId,
          suscriptionNumber: number,
          status: SuscriptionStatus.InProgress
        },
        ['customer', 'gym', 'plan']
      )
    } else {
      // Si no enviamos el numero de suscripcion traemos todos las suscripciones del gimnasio
      suscriptionsFound = await this.S.filterMany(
        {
          gym: gymId,
          status: SuscriptionStatus.InProgress
        },
        ['customer', 'gym', 'plan']
      )
    }
    return suscriptionsFound
  }
}
export default SearchSuscriptionsByCustomer
