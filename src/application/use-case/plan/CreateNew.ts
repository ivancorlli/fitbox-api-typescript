import Plan from '../../../domain/entity/Plan'
import CustomError from '../../../domain/exception/CustomError'
import PlanRepository from '../../../domain/repository/PlanRepository'

class CreateNew {
  private readonly PlanRepository: PlanRepository
  constructor(planRepository: PlanRepository) {
    this.PlanRepository = planRepository
  }

  async start(plan: Plan) {
    if (!plan._id) {
      throw CustomError.internalError('Se produjo un error al crear plan')
    }
    if (!plan.name) {
      throw CustomError.badRequest('Es necesario enivar el nombre del plan')
    }
    if (!plan.price) {
      throw CustomError.badRequest('Es necesario enviar el precio del plan')
    }
    if (
      !plan.weekDays ||
      plan.weekDays.length === 0 ||
      plan.weekDays.length < 0
    ) {
      throw CustomError.badRequest(
        'Es necesario enviar los dias activos del plan'
      )
    }
    if (!plan.gym) {
      throw CustomError.internalError('Se produjo un error al crear plan')
    }
    // Sanitizamos los datos enviados
    plan.name = plan.name.toLowerCase().trim()
    // Creamos un nuevo plam
    const newPlan = await this.PlanRepository.create(plan)
    return newPlan
  }
}
export default CreateNew
