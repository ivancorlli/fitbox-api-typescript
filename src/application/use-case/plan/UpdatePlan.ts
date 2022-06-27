import Plan from '../../../domain/entity/Plan'
import CustomError from '../../../domain/exception/CustomError'
import { PlanStatus } from '../../../domain/object-value/PlanStatus'
import PlanRepository from '../../../domain/repository/PlanRepository'

class UpdatePlan {
  private readonly PlanRepository: PlanRepository
  constructor(planRepository: PlanRepository) {
    this.PlanRepository = planRepository
  }

  async start(
    planId: string,
    gymId: string,
    update: Plan
  ): Promise<Plan | null> {
    // Arrojamos error si no recibimos id del plan
    if (!planId) {
      throw CustomError('Error al actualizar plan').internalError()
    }
    // Arrojamos error si no recibimos id del gimnasio
    if (!gymId) {
      throw CustomError('Error al actualizar plan').internalError()
    }
    // Buscamos el plan a actualizar
    const planFound = await this.PlanRepository.getById(planId)
    // Arrojamos error si no encontramos ninungo
    if (!planFound) {
      throw CustomError('No existe el plan solicitado').badRequest()
    }
    // Arrojamos error si el plan a actualizar no coincide con el id del gimnasio que lo creo
    if (planFound.gym !== gymId) {
      throw CustomError('No puedes realizar esta accion').forbidden()
    }
    // Arrojamos error si el plan esta desabilitado
    if (planFound.status === PlanStatus.Disable) {
      throw CustomError(
        'El plan no esta disponible para ser modificado, primero debe ser habilitado'
      ).badRequest()
    }
    // Sanitizamos los datos a actualizar
    if (update.name) {
      update.name = update.name.toLowerCase().trim()
    }
    if (update.description) {
      update.description = update.description.toLowerCase().trim()
    }
    if (!update.weekDays || update.weekDays.length < 1) {
      update.weekDays = planFound.weekDays
    }
    const planUpdated = await this.PlanRepository.updateById(
      planFound._id,
      update,
      { ignoreUndefined: true }
    )
    return planUpdated
  }
}
export default UpdatePlan
