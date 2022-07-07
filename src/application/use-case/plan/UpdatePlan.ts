import Plan from '../../../domain/entity/Plan'
import CustomError from '../../../domain/exception/CustomError'
import ErrorResponse from '../../../domain/object-value/ErrorResponse'
import { PlanStatus } from '../../../domain/object-value/PlanStatus'
import PlanRepository from '../../../domain/repository/PlanRepository'
import ValidatePlan from '../../validation/ValidatePlan'

class UpdatePlan {
  private readonly PlanRepository: PlanRepository
  constructor(planRepository: PlanRepository) {
    this.PlanRepository = planRepository
  }

  async start(planId: string, gymId: string, update: Plan): Promise<Plan> {
    // Validamos datos
    planId = ValidatePlan.validateId(planId)
    gymId = ValidatePlan.validateGymOwner(gymId)
    // Buscamos el plan a actualizar
    let planFound = await this.PlanRepository.getById(planId)
    // Arrojamos error si no encontramos plan
    planFound = ValidatePlan.validatePlanExistence(planFound!)
    // Arrojamos error si el plan a actualizar no coincide con el id del gimnasio que lo creo
    if (planFound.gymOwner !== gymId) {
      throw CustomError.forbidden(ErrorResponse.UserNotAllow)
    }
    // Arrojamos error si el plan esta desabilitado
    if (planFound.status === PlanStatus.Disable) {
      throw CustomError.badRequest(
        'El plan no esta disponible para ser modificado, primero debe ser habilitado'
      )
    }
    // Sanitizamos los datos a actualizar
    if (update.name) {
      update.name = ValidatePlan.validateName(update.name)
    }
    if (update.description) {
      update.description = ValidatePlan.validateDescription(update.description)
    }
    if (!update.weekDays || update.weekDays.length < 1) {
      update.weekDays = ValidatePlan.validateWeekDays(planFound.weekDays)
    }
    if (update.weekDays && update.weekDays.length > 0) {
      update.weekDays = ValidatePlan.validateWeekDays(update.weekDays)
    }
    let planUpdated = await this.PlanRepository.updateById(
      planFound._id,
      update,
      { ignoreUndefined: true }
    )
    // Arrojamos error si no encontramos plan
    planUpdated = ValidatePlan.validatePlanExistence(planUpdated!)
    return planUpdated
  }
}
export default UpdatePlan
