import Plan from '../../../domain/entity/Plan'
import { PlanStatus } from '../../../domain/object-value/PlanStatus'
import PlanRepository from '../../../domain/repository/PlanRepository'
import ValidatePlan from '../../validation/ValidatePlan'

class GetPlanEnableById {
  private readonly PlanRepository: PlanRepository
  constructor(planRepository: PlanRepository) {
    this.PlanRepository = planRepository
  }

  async start(planId: string): Promise<Plan> {
    // Validamos datos
    planId = ValidatePlan.validateId(planId)
    // Buscamos plan en base de datos
    let planFound = await this.PlanRepository.filterOne({
      _id: planId,
      status: PlanStatus.Enable
    })
    // Arrojamos error si no existe un plan con el id
    planFound = ValidatePlan.validatePlanExistence(planFound!)
    return planFound
  }
}
export default GetPlanEnableById
