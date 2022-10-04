import CustomError from '../../error/CustomError'
import {
  DateRegExp,
  TextRegExp,
  DescriptionRegExp,
  NamesRegExp
} from '../../../shared/utils/RegExp'
import IUser from '../domain/IPerson'
import UserGender from '../utils/UserGender'
import UserStatus from '../utils/UserStatus'
import Base from './User'
import createId from '../../utils/createId'

class Person extends Base<IUser> {
  /*
  ////////////////////////////////////////
  Metodos
  ////////////////////////////////////////
  */

  /**
   * iCorlli: 13-8-2022 ✅ \
   * Requiere HashRepository❗ \
   * Crea un nuevo usuario
   * @param {string} email nuevo email
   * @param {string} username nuevo nombre de usuario
   * @param {string} password nueva contrasenia
   * @returns {IUser} Nuevo usuario
   */
  async createNew(
    email: string,
    username: string,
    password: string
  ): Promise<IUser> {
    // Validamos los datos ingresados
    email = this.validateEmail(email)
    username = this.validateUsername(username)
    password = this.validatePassword(password)

    const today = new Date().getTime()
    // Creamos un nuevo usuario
    const user: IUser = {
      uuid: createId(),
      account: {
        email,
        username,
        password,
        status: UserStatus.Active,
        verified: false
      },
      profile: {
        name: null,
        surname: null,
        gender: null,
        birth: null,
        biograpgy: null
      },
      direction: {
        country: null,
        city: null,
        state: null,
        postalCode: null
      },
      contact: {
        areaCode: null,
        phoneNumber: null
      },
      medical: {
        allergies: null,
        disabilities: null,
        aptitude: null
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
    user.account.password = hashPassword
    // Verificamos que el nombre de usuario o el email no hayan sido utilizados
    await this.emailUsernameExists(email, username)
    // Guarda13mos en base de datos
    const newUser = await this.U.create(user)
    return newUser
  }

  /**
   * iCorlli: 15-8-2022 ✅\
   * Actualiza los datos del usuario
   * @param id id del usuario
   * @param name nombre de usuario
   * @param surname apellido de usuario
   * @param gender genero de usuario
   * @param birth fecha de nacimiento
   * @param biography biografia del usuario
   * @param country pais de residencia
   * @param city ciudad de residencia
   * @param state localidad de recidencia
   * @param postalCode codigo postal
   * @param areaCode codigo de area
   * @param allergies alergias
   * @param disabilities discapacidades
   * @returns Usuario Actualizado
   */
  async updateProfile(
    id: string,
    name: string,
    surname: string,
    gender: string,
    birth: string,
    biography: string,
    country: string,
    city: string,
    state: string,
    postalCode: string,
    areaCode: number,
    phoneNumber: number,
    allergies: string,
    disabilities: string
  ): Promise<IUser> {
    // Validamos datos
    this.validateId(id)
    if (name) {
      name = this.validateName(name)
    }
    if (surname) {
      surname = this.validateSurname(surname)
    }
    if (gender) {
      gender = this.validateGender(gender)
    }
    if (birth) {
      console.log(birth)
      birth = this.validateBirth(birth)
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
    if (allergies) {
      allergies = this.validateAllergies(allergies)
    }
    if (disabilities) {
      disabilities = this.validateDisabilities(disabilities)
    }
    // Actualizamos al usuario
    let userUpdated: IUser | null = await this.U.updateById(
      id,
      {
        uuid: id,
        'profile.name': name,
        'profile.surname': surname,
        'profile.gender': gender,
        'profile.birth': birth,
        'profile.biography': biography,
        'direction.country': country,
        'direction.city': city,
        'direction.state': state,
        'direction.postalCode': postalCode,
        'contact.areaCode': areaCode,
        'contact.phoneNumber': phoneNumber,
        'medical.allergies': allergies,
        'medical.disabilities': disabilities,
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

  /*
  ////////////////////////////////////////
  VALIDACIONES
  ////////////////////////////////////////
  */

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

  private validateSurname(surname: string) {
    // Arrojar error si no es enviado
    if (!surname) {
      throw CustomError.badRequest('Apellido requerido')
    }
    if (typeof surname !== 'string') {
      throw CustomError.badRequest('Formato de apellido invalido')
    }
    surname = surname.toLocaleLowerCase().trim()
    const isValid = NamesRegExp.test(surname)
    if (!isValid) {
      throw CustomError.badRequest(`${surname} no es valido`)
    }
    if (surname.length > 12) {
      throw CustomError.badRequest(
        `El apellido no debe tener mas de ${12} caracteres`
      )
    }
    return surname
  }

  private validateGender(gender: string) {
    // Arrojar error si no es enviado
    if (!gender) {
      throw CustomError.badRequest('Genero requerido')
    }
    gender = gender.toLocaleLowerCase().trim()
    // Convertimos los generos en array
    const userGender = [UserGender.Female, UserGender.Male]
    // Verificamos que el estado enviado exista dentro del array
    const response = userGender.find((st) => st === gender)
    // Si el estado no existe, arrojamos un error
    if (!response) {
      throw CustomError.badRequest('Genero invalido')
    }
    return gender
  }

  private validateBirth(birth: string) {
    // Arrojar error si no es enviado

    if (!birth) {
      throw CustomError.badRequest('Fecha de nacimiento requerida')
    }
    birth = birth.trim()
    const isValid = DateRegExp.test(birth)

    if (!isValid) {
      throw CustomError.badRequest(`${birth} no es valido`)
    }
    return birth
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
    if (biography.length > 200) {
      throw CustomError.badRequest(
        `La biografia no debe tener mas de ${200} caracteres`
      )
    }
    return biography
  }

  private validateAllergies(allergies: string) {
    // Arrojar error si no es enviado
    if (!allergies) {
      throw CustomError.badRequest('Alergias requeridas')
    }
    if (typeof allergies !== 'string') {
      throw CustomError.badRequest('Formato de alergias invalido')
    }
    allergies = allergies.toLocaleLowerCase().trim()
    const isValid = TextRegExp.test(allergies)
    if (!isValid) {
      throw CustomError.badRequest(`${allergies} no es valido`)
    }

    if (allergies.length > 100) {
      throw CustomError.badRequest(
        `Las alergias no debe tener mas de ${100} caracteres`
      )
    }
    return allergies
  }

  private validateDisabilities(disabilities: string) {
    // Arrojar error si no es enviado
    if (!disabilities) {
      throw CustomError.badRequest('Enfermedades/incapacidades requerida')
    }
    if (typeof disabilities !== 'string') {
      throw CustomError.badRequest(
        'Formato de enfermedades/incapacidades invalido'
      )
    }
    disabilities = disabilities.toLocaleLowerCase().trim()
    const isValid = TextRegExp.test(disabilities)
    if (!isValid) {
      throw CustomError.badRequest(`${disabilities} no es valido`)
    }

    if (disabilities.length > 100) {
      throw CustomError.badRequest(
        `Las enfermedades/incapacidades no debe tener mas de ${100} caracteres`
      )
    }
    return disabilities
  }
}
export default Person
