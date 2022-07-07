import Gym from '../../domain/entity/Gym'
import CustomError from '../../domain/exception/CustomError'
import ErrorResponse from '../../domain/object-value/ErrorResponse'
import ValidateUser from './ValidateUser'

class ValidateGym extends ValidateUser {
  static validateUserExistence(user: Gym): Gym {
    // Arrojamos error si no recibimos plan
    if (!user) {
      throw CustomError.badRequest(ErrorResponse.GymNotFound)
    }
    return user
  }

  static validateCustomerId(ctrId: string): string {
    // Arrojamos error si no recibimos el id del cliente
    if (!ctrId) {
      throw CustomError.badRequest('Cliente requerido')
    }
    return ctrId
  }
}
export default ValidateGym
