import Plan from '../../../domain/entity/Plan'
import CustomError from '../../../domain/exception/CustomError'
import { PlanStatus } from '../../../domain/object-value/PlanStatus'
import PlanRepository from '../../../domain/repository/PlanRepository'

class GetPlansEnabledByGymId {
  private readonly PlanRepository: PlanRepository
  constructor(planRepository: PlanRepository) {
    this.PlanRepository = planRepository
  }

  async start(gymId: string): Promise<Array<Plan> | null> {
    // Arrojar error si no enviamos el gym ID
    if (!gymId) {
      throw CustomError.badRequest(
        'Se produjo un error al encontrar los planes'
      )
    }
    const plansFound = await this.PlanRepository.filterMany({
      gym: gymId,
      status: PlanStatus.Enable
    })
    return plansFound
  }
}
export default GetPlansEnabledByGymId
