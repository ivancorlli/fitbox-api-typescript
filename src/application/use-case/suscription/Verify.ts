import Suscription from '../../../domain/entity/Suscription'
import CustomError from '../../../domain/exception/CustomError'
import ErrorResponse from '../../../domain/object-value/ErrorResponse'
import SuscriptionRepository from '../../../domain/repository/SuscriptionRepository'
import ValidateSuscription from '../../validation/ValidateSuscription'

class Verify {
  private readonly S: SuscriptionRepository
  constructor(sucriptionRepo: SuscriptionRepository) {
    this.S = sucriptionRepo
  }

  async start(suscriptionId: string, userId: string): Promise<Suscription> {
    ValidateSuscription.validateId(suscriptionId)
    // Buscamos suscripcion
    let suscriptionFound = await this.S.getById(suscriptionId)
    console.log(suscriptionFound)
    // Verificamos que exista
    suscriptionFound = ValidateSuscription.validateExistence(suscriptionFound!)
    // Verificamos que el usuario que solicita la suscripcion sea el propietario
    if (
      suscriptionFound.gym === userId ||
      suscriptionFound.customer === userId
    ) {
      return suscriptionFound
    }
    throw CustomError.forbidden(ErrorResponse.UserNotAllow)
  }
}
export default Verify
