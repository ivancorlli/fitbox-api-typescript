import { DescriptionRegExp, NamesRegExp } from '../../../shared/utils/RegExp'
import CustomError from '../../error/CustomError'
import GymStatus from '../utils/GymStatus'
import IGym from '../domain/IGym'
import Base from './User'
import createId from '../../utils/createId'

class Gym extends Base<IGym> {
  /*
  ////////////////////////////////////////
  Metodos
  ////////////////////////////////////////
  */

  /**
   * iCorlli: 14-8-2022 ✅ \
   * Requiere HashRepository❗ \
   * Crea un nuevo gimnasio
   * @param email email del gimnasi
   * @param username username del gimnasio
   * @param password contrasenia del gimnasio
   * @returns Nuevo Gimnasio
   */
  async createNew(
    email: string,
    username: string,
    password: string
  ): Promise<IGym> {
    // Validamos los datos ingresados
    email = this.validateEmail(email)
    username = this.validateUsername(username)
    password = this.validatePassword(password)
    // Verificamos que el username no este en uso
    await this.emailUsernameExists(email, username)

    const today = new Date().getTime()
    // creamos un nuevo gimnasio
    const gym: IGym = {
      uuid: createId(),
      account: {
        email,
        username,
        password,
        status: GymStatus.Active,
        verified: false
      },
      profile: {
        name: null,
        trainings: [],
        biography: null
      },
      direction: {
        country: null,
        city: null,
        state: null,
        street: null,
        streetNumber: null,
        postalCode: null
      },
      contact: {
        areaCode: null,
        phoneNumber: null
      },
      images: {
        profile: null,
        frontPage: null
      },
      timestamps: {
        created: today,
        updated: today
      }
    }
    // Hasheamos contrasenia para guardar en DDBB
    const hashPassword = await this.H!.createHash(password)
    gym.account.password = hashPassword
    // Guarda13mos en base de datos
    const newUser = await this.U.create(gym)
    return newUser
  }

  async updateProfile(
    id: string,
    name: string,
    trainings: string[],
    biography: string,
    country: string,
    city: string,
    state: string,
    postalCode: string,
    areaCode: number,
    phoneNumber: number
  ): Promise<IGym> {
    // Validamos datos
    this.validateId(id)
    if (name) {
      name = this.validateName(name)
    }
    if (trainings) {
      trainings = this.validateTrainings(trainings)
    }
    if (biography) {
      biography = this.validateBiography(biography)
    }
    if (country) {
      country = this.validateCountry(country)
    }
    if (city) {
      city = this.validateCity(city)
    }
    if (state) {
      state = this.validateState(state)
    }
    if (postalCode) {
      postalCode = this.validatePostalCode(postalCode, city)
    }
    if (areaCode) {
      areaCode = this.validateAreaCode(areaCode)
    }
    if (phoneNumber) {
      phoneNumber = this.validatePhoneNumber(phoneNumber)
    }
    // Actualizamos al usuario
    let userUpdated = await this.U.updateById(
      id,
      {
        'profile.name': name,
        'profile.trainings': trainings,
        'profile.biography': biography,
        'direction.country': country,
        'direction.city': city,
        'direction.state': state,
        'direction.postalCode': postalCode,
        'contact.areaCode': areaCode,
        'contact.phoneNumber': phoneNumber,
        'timestamps.updated': new Date().getTime()
      },
      {
        new: true,
        omitUndefined: true
      }
    )
    // Validar existencia del usuario
    userUpdated = this.validateExistence(userUpdated!)
    return userUpdated
  }

  private validateName(name: string) {
    // Arrojar error si no es enviado
    if (!name) {
      throw CustomError.badRequest('Nombre requerido')
    }
    if (typeof name !== 'string') {
      throw CustomError.badRequest('Formato de nombre invalido')
    }
    name = name.toLocaleLowerCase().trim()
    const isValid = NamesRegExp.test(name)
    if (!isValid) {
      throw CustomError.badRequest(`${name} no es valido`)
    }
    if (name.length > 12) {
      throw CustomError.badRequest(
        `El nombre no debe tener mas de ${12} caracteres`
      )
    }
    return name
  }

  private validateTrainings(trainings: string[]) {
    // Arrojar error si no es enviado

    if (!trainings) {
      throw CustomError.badRequest('Entrenamientos requeridos')
    }

    if (trainings.length > 0) {
      trainings = trainings.map((training) => {
        const el = training.toUpperCase().trim()
        const isValid = NamesRegExp.test(el)
        if (!isValid) {
          throw CustomError.badRequest(`${el} no es valido`)
        } else {
          return el
        }
      })
    }

    if (trainings.length > 15) {
      throw CustomError.badRequest(
        '15 es el numero maximo de entrenamientos asignables'
      )
    }

    return trainings
  }

  private validateBiography(biography: string) {
    // Arrojar error si no es enviado

    if (!biography) {
      throw CustomError.badRequest('Biografia requerida')
    }
    biography = biography.trim()
    const isValid = DescriptionRegExp.test(biography)

    if (!isValid) {
      throw CustomError.badRequest(`${biography} no es valido`)
    }
    if (biography.length > 250) {
      throw CustomError.badRequest(
        `La biografia no debe tener mas de ${250} caracteres`
      )
    }
    return biography
  }
}
export default Gym
