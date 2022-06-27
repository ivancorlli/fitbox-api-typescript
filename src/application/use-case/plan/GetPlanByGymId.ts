import Plan from '../../../domain/entity/Plan'
import CustomError from '../../../domain/exception/CustomError'
import PlanRepository from '../../../domain/repository/PlanRepository'

class GetPlanByGymId {
  private readonly PlanRepository: PlanRepository
  constructor(planRepository: PlanRepository) {
    this.PlanRepository = planRepository
  }

  async start(gymId: string, planId: string): Promise<Plan | null> {
    // Arrojar error si no enviamos el gym ID
    if (!gymId) {
      throw CustomError(
        'Se produjo un error al encontrar los planes'
      ).badRequest()
    }
    const planFound = await this.PlanRepository.filterOne({
      _id: planId,
      gym: gymId
    })
    // Arrojamos error si no encontramos un plan con ese id
    if (!planFound) {
      throw CustomError('No existe el plan solicitado').badRequest()
    }
    console.log(typeof planFound?.gym)
    // Si el id del gimnasio que solicita el plan no coincide con el que se guardo al crear el plan se aroja un error
    if (planFound?.gym !== gymId) {
      throw CustomError('No puedes acceder a este contenido').unauthorized()
    }
    return planFound
  }
}
export default GetPlanByGymId
