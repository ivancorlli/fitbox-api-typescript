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
      throw CustomError.badRequest(
        'Se produjo un error al encontrar los planes'
      )
    }
    const planFound = await this.PlanRepository.filterOne({
      _id: planId,
      gym: gymId
    })
    // Arrojamos error si no encontramos un plan con ese id
    if (!planFound) {
      throw CustomError.badRequest('No existe el plan solicitado')
    }
    console.log(typeof planFound?.gym)
    // Si el id del gimnasio que solicita el plan no coincide con el que se guardo al crear el plan se aroja un error
    if (planFound?.gym !== gymId) {
      throw CustomError.unauthorized('No puedes acceder a este contenido')
    }
    return planFound
  }
}
export default GetPlanByGymId
