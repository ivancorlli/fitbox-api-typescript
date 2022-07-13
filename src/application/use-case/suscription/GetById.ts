import Suscription from '../../../domain/entity/Suscription'
import CustomError from '../../../domain/exception/CustomError'
import ErrorResponse from '../../../domain/object-value/ErrorResponse'
import SuscriptionRepository from '../../../domain/repository/SuscriptionRepository'
import ValidateSuscription from '../../validation/ValidateSuscription'

class GetById {
  private readonly S: SuscriptionRepository
  constructor(sucriptionRepo: SuscriptionRepository) {
    this.S = sucriptionRepo
  }

  async start(userId: string, suscriptionId: string): Promise<Suscription> {
    // Validamos id del gimnasio
    ValidateSuscription.validateGym(suscriptionId)
    // Si no enviamos el numero de suscripcion traemos todos las suscripciones del gimnasio
    let suscription = await this.S.filterOne({ _id: suscriptionId })
    // Validamos existencia
    suscription = ValidateSuscription.validateExistence(suscription!)
    // Validamos que el usuario que solicita la suscripcion forme parte de la suscripcion
    if (suscription.customer !== userId && suscription.gym !== userId) {
      throw CustomError.forbidden(ErrorResponse.UserNotAllow)
    }
    return suscription
  }
}
export default GetById
