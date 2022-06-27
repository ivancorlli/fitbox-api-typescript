import Plan from '../../../domain/entity/Plan'
import CustomError from '../../../domain/exception/CustomError'
import { PlanStatus } from '../../../domain/object-value/PlanStatus'
import PlanRepository from '../../../domain/repository/PlanRepository'

class GetPlanEnableById {
  private readonly PlanRepository: PlanRepository
  constructor(planRepository: PlanRepository) {
    this.PlanRepository = planRepository
  }

  async start(planId: string): Promise<Plan> {
    // Arrojamos error si no recibimos id
    if (!planId) {
      throw CustomError('Es necesario enviar id').internalError()
    }
    const planFound = await this.PlanRepository.filterOne({
      _id: planId,
      status: PlanStatus.Enable
    })
    // Arrojamos error si no existe un plan con el id
    if (!planFound) {
      throw CustomError('No existe el plan solicitado').badRequest()
    }
    return planFound
  }
}
export default GetPlanEnableById
