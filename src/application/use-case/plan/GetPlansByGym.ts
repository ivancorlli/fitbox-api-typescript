import Plan from '../../../domain/entity/Plan'
import PlanRepository from '../../../domain/repository/PlanRepository'
import ValidatePlan from '../../validation/ValidatePlan'

class GetPlansByGym {
  private readonly P: PlanRepository
  constructor(planRepository: PlanRepository) {
    this.P = planRepository
  }

  async start(gymId: string): Promise<Array<Plan> | null> {
    // Validamos datos
    gymId = ValidatePlan.validateGymOwner(gymId)
    // Buscamos todos los planes de un gimnasio
    const plansFound = await this.P.filterMany({ gym: gymId })
    return plansFound
  }
}
export default GetPlansByGym
