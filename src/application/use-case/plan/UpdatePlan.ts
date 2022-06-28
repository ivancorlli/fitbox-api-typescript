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
      throw CustomError.internalError('Error al actualizar plan')
    }
    // Arrojamos error si no recibimos id del gimnasio
    if (!gymId) {
      throw CustomError.internalError('Error al actualizar plan')
    }
    // Buscamos el plan a actualizar
    const planFound = await this.PlanRepository.getById(planId)
    // Arrojamos error si no encontramos ninungo
    if (!planFound) {
      throw CustomError.badRequest('No existe el plan solicitado')
    }
    // Arrojamos error si el plan a actualizar no coincide con el id del gimnasio que lo creo
    if (planFound.gym !== gymId) {
      throw CustomError.forbidden('No puedes realizar esta accion')
    }
    // Arrojamos error si el plan esta desabilitado
    if (planFound.status === PlanStatus.Disable) {
      throw CustomError.badRequest(
        'El plan no esta disponible para ser modificado, primero debe ser habilitado'
      )
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
