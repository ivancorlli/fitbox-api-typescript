import Suscription from '../../../domain/entity/Suscription'
import SuscriptionRepository from '../../../domain/repository/SuscriptionRepository'
import ValidateSuscription from '../../validation/ValidateSuscription'

class CreateNew {
  private readonly S: SuscriptionRepository
  constructor(suscriptionRepo: SuscriptionRepository) {
    this.S = suscriptionRepo
  }

  async start(suscription: Suscription): Promise<Suscription> {
    // Validamos los datos
    ValidateSuscription.validateId(suscription._id)
    ValidateSuscription.validateNumber(suscription.suscriptionNumber)
    ValidateSuscription.validateInitDate(suscription.initDate as number)
    ValidateSuscription.validateFinishDate(suscription.finishDate as number)
    ValidateSuscription.validatenPaymentType(suscription.paymentType)
    ValidateSuscription.validatePaymentTotal(suscription.paymentTotal)
    ValidateSuscription.validateCustomer(suscription.customer)
    ValidateSuscription.validateGym(suscription.gym)
    ValidateSuscription.validatePlan(suscription.plan)
    // creamos nueva suscripcion
    const newSuscription = await this.S.create(suscription)
    return newSuscription
  }
}
export default CreateNew
