import Plan from '../../../domain/entity/Plan'
import CustomError from '../../../domain/exception/CustomError'
import ErrorResponse from '../../../domain/object-value/ErrorResponse'
import PlanStatus from '../../../domain/object-value/PlanStatus'
import PlanRepository from '../../../domain/repository/PlanRepository'
import ValidatePlan from '../../validation/ValidatePlan'

class EnablePlan {
  private readonly P: PlanRepository
  constructor(planRepo: PlanRepository) {
    this.P = planRepo
  }

  async start(planId: string, gymId: string): Promise<Plan> {
    // Validamos Datos
    planId = ValidatePlan.validateId(planId)
    gymId = ValidatePlan.validateGymOwner(gymId)
    let planFound = await this.P.getById(planId)
    // Arrojamos error si no encotramos el plan solicitado
    planFound = ValidatePlan.validatePlanExistence(planFound!)
    // Arrojamos error si el plan a actualizar no coincide con el id del gimnasio que lo creo
    if (planFound.gymOwner !== gymId) {
      throw CustomError.forbidden(ErrorResponse.UserNotAllow)
    }
    // Arrojamos error si el plan ya esta habilitado
    if (planFound.status === PlanStatus.Enable) {
      throw CustomError.badRequest('El plan ya esta habilitado')
    }
    let planUpdated = await this.P.updateById(planId, {
      status: PlanStatus.Enable
    })
    planUpdated = ValidatePlan.validatePlanExistence(planUpdated!)
    return planUpdated
  }
}
export default EnablePlan
