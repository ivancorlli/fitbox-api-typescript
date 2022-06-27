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
      throw CustomError('Se produjo un error al crear plan').internalError()
    }
    if (!plan.name) {
      throw CustomError('Es necesario enivar el nombre del plan').badRequest()
    }
    if (!plan.price) {
      throw CustomError('Es necesario enviar el precio del plan').badRequest()
    }
    if (
      !plan.weekDays ||
      plan.weekDays.length === 0 ||
      plan.weekDays.length < 0
    ) {
      throw CustomError(
        'Es necesario enviar los dias activos del plan'
      ).badRequest()
    }
    if (!plan.gym) {
      throw CustomError('Se produjo un error al crear plan').internalError()
    }
    // Sanitizamos los datos enviados
    plan.name = plan.name.toLowerCase().trim()
    // Creamos un nuevo plam
    const newPlan = await this.PlanRepository.create(plan)
    return newPlan
  }
}
export default CreateNew
