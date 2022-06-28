import Plan from '../../../domain/entity/Plan'
import CustomError from '../../../domain/exception/CustomError'
import { PlanStatus } from '../../../domain/object-value/PlanStatus'
import PlanRepository from '../../../domain/repository/PlanRepository'

class EnablePlan {
  private readonly PR: PlanRepository
  constructor(planRepo: PlanRepository) {
    this.PR = planRepo
  }

  async start(planId: string, gymId: string): Promise<Plan | null> {
    // Arrojamos error si no recibimos id del plan
    if (!planId) {
      throw CustomError.internalError('Error al habilitar plan')
    }
    // Arrojamos error si no recibimos id del gimnasio
    if (!gymId) {
      throw CustomError.internalError('Error al habilitar plan')
    }
    const planFound = await this.PR.getById(planId)
    // Arrojamos error si no encotramos el plan solicitado
    if (!planFound) {
      throw CustomError.badRequest('No existe el plan solicitado')
    }
    // Arrojamos error si el plan a actualizar no coincide con el id del gimnasio que lo creo
    if (planFound.gym !== gymId) {
      throw CustomError.forbidden('No puedes realizar esta accion')
    }
    // Arrojamos error si el plan ya esta habilitado
    if (planFound.status === PlanStatus.Enable) {
      throw CustomError.badRequest('El plan ya esta habilitado')
    }
    const planUpdated = await this.PR.updateById(planId, {
      status: PlanStatus.Enable
    })
    return planUpdated
  }
}
export default EnablePlan
