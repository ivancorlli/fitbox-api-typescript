import Plan from '../../../domain/entity/Plan'
import { PlanStatus } from '../../../domain/object-value/PlanStatus'
import PlanRepository from '../../../domain/repository/PlanRepository'
import ValidatePlan from '../../validation/ValidatePlan'

class GetPlansEnabledByGymId {
  private readonly PlanRepository: PlanRepository
  constructor(planRepository: PlanRepository) {
    this.PlanRepository = planRepository
  }

  async start(gymId: string): Promise<Array<Plan> | null> {
    // Validamos datos
    gymId = ValidatePlan.validateGymOwner(gymId)
    // Buscamos todos los planes disponibles de un gimnasio
    const plansFound = await this.PlanRepository.filterMany({
      gym: gymId,
      status: PlanStatus.Enable
    })
    return plansFound
  }
}
export default GetPlansEnabledByGymId
