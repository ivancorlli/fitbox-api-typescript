import User from '../../domain/entity/User'
import CustomError from '../../domain/exception/CustomError'
import ErrorResponse from '../../domain/object-value/ErrorResponse'
import { UserStatus } from '../../domain/object-value/UserStatus'

class ValidateUser {
  static validateId(id: string): string {
    // Arrojar error si no recibimos id
    if (!id) {
      throw CustomError.internalError('Id requerido')
    }
    return id
  }

  static validateEmail(email: string): string {
    // Arrojar error si no recibimos email
    if (!email) {
      throw CustomError.badRequest('Email requerido')
    }
    // Sanitizamos email
    email = email.toLowerCase().trim()
    return email
  }

  static validatePassword(password: string): string {
    // Arrojar error si no recibimos password
    if (!password) {
      throw CustomError.badRequest('Contraseña requerida')
    }
    // Sanitizamos password
    password = password.trim()
    return password
  }

  static validateStatus(status: UserStatus): UserStatus {
    // Convertimos los estados en array
    const useStatus = [
      UserStatus.Active,
      UserStatus.Inactive,
      UserStatus.Suspended
    ]
    // Verificamos que el estado enviado exista dentro del array
    const response = useStatus.find((st) => st === status)
    // Si el estado no existe, arrojamos un error
    if (!response) {
      throw CustomError.badRequest('Estado invalido')
    }
    return status
  }

  static validateUserExistence(user: User): User {
    // Arrojamos error si no recibimos plan
    if (!user) {
      throw CustomError.badRequest(ErrorResponse.UserNotFound)
    }
    return user
  }
}
export default ValidateUser
