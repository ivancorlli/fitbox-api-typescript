import Plan from '../../../domain/entity/Plan'
import PlanRepository from '../../../domain/repository/PlanRepository'
import ValidatePlan from '../../validation/ValidatePlan'

class GetPlansByGymId {
  private readonly PlanRepository: PlanRepository
  constructor(planRepository: PlanRepository) {
    this.PlanRepository = planRepository
  }

  async start(gymId: string): Promise<Array<Plan> | null> {
    // Validamos datos
    gymId = ValidatePlan.validateGymOwner(gymId)
    // Buscamos todos los planes de un gimnasio
    const plansFound = await this.PlanRepository.filterMany({ gym: gymId })
    return plansFound
  }
}
export default GetPlansByGymId
