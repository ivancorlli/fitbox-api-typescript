import Customer from '../../domain/entity/Customer'
import CustomError from '../../domain/exception/CustomError'
import ErrorResponse from '../../domain/object-value/ErrorResponse'
import Gender from '../../domain/object-value/Gender'
import ValidateUser from './ValidateUser'

class ValidateCustomer extends ValidateUser {
  static validateUserExistence(user: Customer): Customer {
    // Arrojamos error si no recibimos plan
    if (!user) {
      throw CustomError.badRequest(ErrorResponse.UserNotFound)
    }
    return user
  }

  static validateCustomRegistered(ctrId: string): string {
    // Arrojamos error si no recibimos el id del cliente
    if (!ctrId) {
      throw CustomError.badRequest('Gimnasio requerido')
    }
    return ctrId
  }

  static validateName(CustomName: string): string {
    // Arrojar error si no es enviado
    if (!CustomName) {
      throw CustomError.badRequest('Nombre requerido')
    }
    // Aanitizamos los datos
    CustomName = CustomName.toLowerCase().trim()
    return CustomName
  }

  static validateSurname(CustomSurname: string): string {
    // Arrojar error si no es enviado
    if (!CustomSurname) {
      throw CustomError.badRequest('Apellido requerido')
    }
    // Aanitizamos los datos
    CustomSurname = CustomSurname.toLowerCase().trim()
    return CustomSurname
  }

  static validateGender(CustomGender: string): string {
    // Arrojar error si no es enviado
    if (!CustomGender) {
      throw CustomError.badRequest('Genero Requerido')
    }
    const useGenders = [Gender.Female, Gender.Male]
    const response = useGenders.filter((gender) => gender === CustomGender)
    if (!response) {
      throw CustomError.badRequest(`${CustomGender} no es un valor valido`)
    }
    return CustomGender
  }

  static validateCountry(CustomCountry: string): string {
    // Arrojar error si no es enviado
    if (!CustomCountry) {
      throw CustomError.badRequest('Pais requerido')
    }
    // Aanitizamos los datos
    CustomCountry = CustomCountry.toLowerCase().trim()
    return CustomCountry
  }

  static validateCity(CustomCity: string): string {
    // Arrojar error si no es enviado
    if (!CustomCity) {
      throw CustomError.badRequest('Ciudad requerida')
    }
    // Aanitizamos los datos
    CustomCity = CustomCity.toLowerCase().trim()
    return CustomCity
  }

  static validateState(CustomState: string): string {
    // Arrojar error si no es enviado
    if (!CustomState) {
      throw CustomError.badRequest('Localidad requerida')
    }
    // Aanitizamos los datos
    CustomState = CustomState.toLowerCase().trim()
    return CustomState
  }

  static validateStreet(CustomStreet: string): string {
    // Arrojar error si no es enviado
    if (!CustomStreet) {
      throw CustomError.badRequest('Calle requerida')
    }
    // Aanitizamos los datos
    CustomStreet = CustomStreet.toLowerCase().trim()
    return CustomStreet
  }
}
export default ValidateCustomer
