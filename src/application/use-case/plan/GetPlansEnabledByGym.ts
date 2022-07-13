import Plan from '../../../domain/entity/Plan'
import PlanStatus from '../../../domain/object-value/PlanStatus'
import PlanRepository from '../../../domain/repository/PlanRepository'
import ValidatePlan from '../../validation/ValidatePlan'

class GetPlansEnableByGym {
  private readonly P: PlanRepository
  constructor(planRepository: PlanRepository) {
    this.P = planRepository
  }

  // ? Este metodo es publico
  async start(gymId: string): Promise<Array<Plan> | null> {
    // Validamos datos
    gymId = ValidatePlan.validateGymOwner(gymId)
    // Buscamos todos los planes disponibles de un gimnasio
    const plansFound = await this.P.filterMany({
      gym: gymId,
      status: PlanStatus.Enable
    })
    return plansFound
  }
}
export default GetPlansEnableByGym
