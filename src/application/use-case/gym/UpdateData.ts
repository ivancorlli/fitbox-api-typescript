import GymRepository from '../../../domain/repository/GymRepository'
import ValidateGym from '../../validation/ValidateGym'

class UpdateData {
  private readonly G: GymRepository
  constructor(gymRepo: GymRepository) {
    this.G = gymRepo
  }

  async start(
    gymId: string,
    name: string,
    trainings: string | Array<string>,
    description: string,
    country: string,
    city: string,
    state: string,
    street: string,
    streetNumber: number,
    postalCode: number,
    areaCode: number,
    phoneNumber: number
  ) {
    // Validamos datos
    gymId = ValidateGym.validateId(gymId)
    if (name) {
      name = ValidateGym.validateName(name)
    }
    if (trainings) {
      trainings = ValidateGym.validateTrainings(trainings as string)
    }
    if (description) {
      description = ValidateGym.validateDescription(description)
    }
    if (country) {
      country = ValidateGym.validateCountry(country)
    }
    if (city) {
      city = ValidateGym.validateCity(city)
    }
    if (state) {
      state = ValidateGym.validateState(state)
    }
    if (street) {
      street = ValidateGym.validateStreet(street)
    }
    // Actualizamos al usuario
    let gymUpdated = await this.G.updateById(
      gymId,
      {
        'profile.name': name,
        'profile.trainings': trainings,
        'profile.description': description,
        'direction.country': country,
        'direction.city': city,
        'direction.state': state,
        'direction.street': street,
        'direction.streetNumber': streetNumber,
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
    gymUpdated = ValidateGym.validateUserExistence(gymUpdated!)
    return gymUpdated
  }
}
export default UpdateData
