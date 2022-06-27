import Plan from '../../../domain/entity/Plan'
import CustomError from '../../../domain/exception/CustomError'
import PlanRepository from '../../../domain/repository/PlanRepository'

class GetPlansByGymId {
  private readonly PlanRepository: PlanRepository
  constructor(planRepository: PlanRepository) {
    this.PlanRepository = planRepository
  }

  async start(gymId: string): Promise<Array<Plan> | null> {
    // Arrojar error si no enviamos el gym ID
    if (!gymId) {
      throw CustomError(
        'Se produjo un error al encontrar los planes'
      ).badRequest()
    }
    const plansFound = await this.PlanRepository.filterMany({ gym: gymId })
    return plansFound
  }
}
export default GetPlansByGymId
