import Plan from '../../domain/entity/Plan'
import CustomError from '../../domain/exception/CustomError'
import ErrorResponse from '../../domain/object-value/ErrorResponse'
import PlanStatus from '../../domain/object-value/PlanStatus'
import WeekDays from '../../domain/object-value/WeekDays'

class ValidatePlan {
  static validateId(id: string): string {
    // Arrojar error si no recibimos id
    if (!id) {
      throw CustomError.internalError('Id requerido')
    }
    return id
  }

  static validateName(name: string): string {
    // Arrojar error si no recibimos name
    if (!name) {
      throw CustomError.badRequest('Nombre requerido')
    }
    // Sanitizamos name
    name = name.toLowerCase().trim()
    return name
  }

  static validatePrice(price: number): number {
    // Arrojar error si no recibimos price
    if (!price) {
      throw CustomError.badRequest('Precio requerido')
    }
    return price
  }

  static validateDescription(Description: string): string {
    // Sanitizamos Description
    Description = Description.trim()
    return Description
  }

  static validateWeekDays(weekDays: Array<WeekDays>): Array<WeekDays> {
    // Arrojamos error si no enviamos los dias
    if (!weekDays || weekDays.length === 0 || weekDays.length < 0) {
      throw CustomError.badRequest(
        'Es necesario enviar los dias activos del plan'
      )
    }
    // Convertimos los dias en array
    const useDays = [
      WeekDays.Monday,
      WeekDays.Tuesday,
      WeekDays.Wednesday,
      WeekDays.Thursday,
      WeekDays.Friday,
      WeekDays.Saturday,
      WeekDays.Sunday
    ]
    // Verificamos que el dia enviado exista dentro del array
    weekDays.forEach((day) => {
      const response = useDays.find((d) => d === day)
      // Si el dia no existe, arrojamos un error
      if (!response) {
        throw CustomError.badRequest(`${day} no es un valor valido`)
      }
    })
    return weekDays
  }

  static validateStatus(status: PlanStatus): PlanStatus {
    // Convertimos los dias en array
    const planStatus = [PlanStatus.Disable, PlanStatus.Enable]
    // Verificamos que el dia enviado exista dentro del array
    const response = planStatus.find((d) => d === status)
    // Si el dia no existe, arrojamos un error
    if (!response) {
      throw CustomError.badRequest('Estado invalido')
    }
    return status
  }

  static validateGymOwner(gymId: string): string {
    // Arrojamos error si no enviamos id
    if (!gymId) {
      throw CustomError.internalError('Gym requerido')
    }
    return gymId
  }

  static validatePlanExistence(plan: Plan): Plan {
    // Arrojamos error si no recibimos plan
    if (!plan) {
      throw CustomError.badRequest(ErrorResponse.PlanNotFound)
    }
    return plan
  }
}
export default ValidatePlan
