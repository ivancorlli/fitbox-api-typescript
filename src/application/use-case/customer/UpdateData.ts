import CustomerRepository from '../../../domain/repository/CustomerRepository'
import ValidateCustomer from '../../validation/ValidateCustomer'

class UpdateData {
  private readonly C: CustomerRepository
  constructor(customerRepo: CustomerRepository) {
    this.C = customerRepo
  }

  async start(
    customerId: string,
    name: string,
    surname: string,
    gender: string,
    birth: string,
    country: string,
    city: string,
    state: string,
    postalCode: number,
    areaCode: number,
    phoneNumber: number
  ) {
    // Validamos datos
    customerId = ValidateCustomer.validateId(customerId)
    if (name) {
      name = ValidateCustomer.validateName(name)
    }
    if (surname) {
      surname = ValidateCustomer.validateSurname(surname)
    }
    if (gender) {
      gender = ValidateCustomer.validateGender(gender)
    }
    if (country) {
      country = ValidateCustomer.validateCountry(country)
    }
    if (city) {
      city = ValidateCustomer.validateCity(city)
    }
    if (state) {
      state = ValidateCustomer.validateState(state)
    }
    // Actualizamos al usuario
    let customerUpdated = await this.C.updateById(
      customerId,
      {
        'profile.name': name,
        'profile.surname': surname,
        'profile.gender': gender,
        'profile.birth': birth,
        'direction.country': country,
        'direction.city': city,
        'direction.state': state,
        'direction.postalCode': postalCode,
        'phone.areaCode': areaCode,
        'phone.phoneNumber': phoneNumber
      },
      {
        new: true,
        omitUndefined: true
      }
    )
    // Validar existencia del usuario
    customerUpdated = ValidateCustomer.validateUserExistence(customerUpdated!)
    return customerUpdated
  }
}
export default UpdateData
