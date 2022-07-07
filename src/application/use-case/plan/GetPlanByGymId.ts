import Plan from '../../../domain/entity/Plan'
import CustomError from '../../../domain/exception/CustomError'
import ErrorResponse from '../../../domain/object-value/ErrorResponse'
import PlanRepository from '../../../domain/repository/PlanRepository'
import ValidatePlan from '../../validation/ValidatePlan'

class GetPlanByGymId {
  private readonly PlanRepository: PlanRepository
  constructor(planRepository: PlanRepository) {
    this.PlanRepository = planRepository
  }

  async start(gymId: string, planId: string): Promise<Plan> {
    // Validamos datos
    gymId = ValidatePlan.validateGymOwner(gymId)
    planId = ValidatePlan.validateId(planId)
    // Buscamos el plan en base de datos
    let planFound = await this.PlanRepository.filterOne({
      _id: planId,
      gym: gymId
    })
    // Arrojamos error si no encontramos un plan con ese id
    planFound = ValidatePlan.validatePlanExistence(planFound!)
    // Si el id del gimnasio que solicita el plan no coincide con el que se guardo al crear el plan se aroja un error
    if (planFound.gymOwner !== gymId) {
      throw CustomError.unauthorized(ErrorResponse.UserNotAllow)
    }
    return planFound
  }
}
export default GetPlanByGymId
