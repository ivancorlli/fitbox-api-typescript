import Plan from '../../../domain/entity/Plan'
import PlanRepository from '../../../domain/repository/PlanRepository'
import ValidatePlan from '../../validation/ValidatePlan'

class CreateNew {
  private readonly PlanRepository: PlanRepository
  constructor(planRepository: PlanRepository) {
    this.PlanRepository = planRepository
  }

  async start(plan: Plan): Promise<Plan> {
    // Validamos los datos
    plan._id = ValidatePlan.validateId(plan._id)
    plan.name = ValidatePlan.validateName(plan.name)
    plan.price = ValidatePlan.validatePrice(plan.price)
    plan.weekDays = ValidatePlan.validateWeekDays(plan.weekDays)
    plan.gymOwner = ValidatePlan.validateGymOwner(plan.gymOwner)
    // Creamos un nuevo plam
    const newPlan = await this.PlanRepository.create(plan)
    return newPlan
  }
}
export default CreateNew
