import Plan from '../../../domain/entity/Plan'
import CustomError from '../../../domain/exception/CustomError'
import ErrorResponse from '../../../domain/object-value/ErrorResponse'
import { PlanStatus } from '../../../domain/object-value/PlanStatus'
import PlanRepository from '../../../domain/repository/PlanRepository'
import ValidatePlan from '../../validation/ValidatePlan'

class DisablePlan {
  private readonly PR: PlanRepository
  constructor(planRepo: PlanRepository) {
    this.PR = planRepo
  }

  async start(planId: string, gymId: string): Promise<Plan> {
    // Validamos los datos
    planId = ValidatePlan.validateId(planId)
    gymId = ValidatePlan.validateGymOwner(gymId)
    let planFound = await this.PR.getById(planId)
    // Arrojamos error si no encotramos el plan solicitado
    planFound = ValidatePlan.validatePlanExistence(planFound!)
    // Arrojamos error si el plan a actualizar no coincide con el id del gimnasio que lo creo
    if (planFound.gymOwner !== gymId) {
      throw CustomError.forbidden(ErrorResponse.UserNotAllow)
    }
    // Arrojamos error si el plan ya esta habilitado
    if (planFound.status === PlanStatus.Disable) {
      throw CustomError.badRequest('El plan ya esta deshabilitado')
    }
    let planUpdated = await this.PR.updateById(planId, {
      status: PlanStatus.Disable
    })
    // Arrojamos error si no encotramos el plan solicitado
    planUpdated = ValidatePlan.validatePlanExistence(planUpdated!)
    return planUpdated
  }
}
export default DisablePlan
