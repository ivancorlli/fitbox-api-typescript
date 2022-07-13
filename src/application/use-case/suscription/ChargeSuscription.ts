import Suscription from '../../../domain/entity/Suscription'
import SuscriptionStatus from '../../../domain/object-value/SuscriptionStatus'
import SuscriptionRepository from '../../../domain/repository/SuscriptionRepository'
import ValidateSuscription from '../../validation/ValidateSuscription'

class ChargeSuscription {
  private readonly S: SuscriptionRepository
  constructor(suscriptionRepo: SuscriptionRepository) {
    this.S = suscriptionRepo
  }

  async start(suscriptionId: string): Promise<Suscription | null> {
    // Validamos los datos
    ValidateSuscription.validateId(suscriptionId)
    // creamos nueva suscripcion
    const suscriptionUpdated = await this.S.updateById(
      suscriptionId,
      {
        status: SuscriptionStatus.Approved
      },
      {
        new: true,
        omitUndefined: true
      }
    )
    return suscriptionUpdated
  }
}
export default ChargeSuscription
