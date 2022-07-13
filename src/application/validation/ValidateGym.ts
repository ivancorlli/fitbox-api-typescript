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

  static validateName(gymName: string): string {
    // Arrojar error si no es enviado
    if (!gymName) {
      throw CustomError.badRequest('Nombre requerido')
    }
    // Aanitizamos los datos
    gymName = gymName.toLowerCase().trim()
    return gymName
  }

  static validateDescription(gymDescription: string): string {
    // Arrojar error si no es enviado
    if (!gymDescription) {
      throw CustomError.badRequest('Descripcion requerida')
    }
    // Aanitizamos los datos
    gymDescription = gymDescription.trim()
    return gymDescription
  }

  static validateTrainings(gymTrainings: string): Array<string> {
    // Arrojar error si no es enviado
    if (!gymTrainings) {
      throw CustomError.badRequest('Entrenamientos requeridos')
    }
    if (gymTrainings.length < 1) {
      throw CustomError.badRequest('Entrenamientos requeridos')
    }
    let trainings = gymTrainings.split(',')
    trainings = trainings.map((el: string) => el.toLocaleLowerCase().trim())
    return trainings
  }

  static validateCountry(gymCountry: string): string {
    // Arrojar error si no es enviado
    if (!gymCountry) {
      throw CustomError.badRequest('Pais requerido')
    }
    // Aanitizamos los datos
    gymCountry = gymCountry.toLowerCase().trim()
    return gymCountry
  }

  static validateCity(gymCity: string): string {
    // Arrojar error si no es enviado
    if (!gymCity) {
      throw CustomError.badRequest('Provincia requerida')
    }
    // Aanitizamos los datos
    gymCity = gymCity.toLowerCase().trim()
    return gymCity
  }

  static validateState(gymState: string): string {
    // Arrojar error si no es enviado
    if (!gymState) {
      throw CustomError.badRequest('Localidad requerida')
    }
    // Aanitizamos los datos
    gymState = gymState.toLowerCase().trim()
    return gymState
  }

  static validateStreet(gymStreet: string): string {
    // Arrojar error si no es enviado
    if (!gymStreet) {
      throw CustomError.badRequest('Calle requerida')
    }
    // Aanitizamos los datos
    gymStreet = gymStreet.toLowerCase().trim()
    return gymStreet
  }
}
export default ValidateGym
