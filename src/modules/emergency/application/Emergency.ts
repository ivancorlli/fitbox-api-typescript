import CustomError from '../../error/CustomError'
import IEmergency from '../domain/IEmergency'
import EmergencyRepository from '../domain/EmergencyRepository'
import Gender from '../utils/Gender'
import Relation from '../utils/Relation'
import { NamesRegExp, PhoneNumberRegExp } from '../../../shared/utils/RegExp'
import createId from '../../utils/createId'

class Emergency {
  private readonly E: EmergencyRepository
  constructor(userRepo: EmergencyRepository) {
    this.E = userRepo
  }
  /*
  ////////////////////////////////////////
  Metodos
  ////////////////////////////////////////
  */

  /**
   * iCorlli: 16-8-2022 ✅ \
   * Crea un nuevo contacto de emergencia
   * @param emergencyOf id del usuario
   * @param name nombre
   * @param surname apellido
   * @param gender genero
   * @param relation relacion
   * @param areaCode codigo de area
   * @param phoneNumber numero de telefono
   * @returns Nuevo Contacto
   */
  async createNew(
    emergencyOf: string,
    name: string,
    surname: string,
    gender: string,
    relation: string,
    areaCode: number,
    phoneNumber: number
  ): Promise<IEmergency> {
    // Validamos los datos ingresados
    name = this.validateName(name)
    surname = this.validateSurname(surname)
    gender = this.validateGender(gender)
    relation = this.validateGender(relation)
    areaCode = this.validateAreaCode(areaCode)
    phoneNumber = this.validatePhoneNumber(phoneNumber)

    const userContacts = await this.E.filterMany({
      emergencyOf
    })

    if (userContacts && userContacts.length > 3) {
      throw CustomError.badRequest('No puedes crear mas de 3 contactos')
    }
    const today = new Date().getTime()
    // Creamos un nuevo usuario
    const emergency: IEmergency = {
      uuid: createId(),
      emergencyOf,
      name,
      surname,
      gender,
      relation,
      areaCode,
      phoneNumber,
      timestamps: {
        created: today,
        updated: today
      }
    }
    // Guardamos en base de datos
    const newUser = await this.E.create(emergency)
    return newUser
  }

  /**
   * iCorlli: 16-8-2022 ✅ \
   * Actualiza los datos del uusario
   * @param id id del contacto
   * @param userId id del usuario
   * @param name nombre de contacto
   * @param surname apellido de contacto
   * @param gender genero de contacto
   * @param relation realcion con el usuraio
   * @param areaCode codigo de area
   * @param phoneNumber numero de telefono
   * @returns Contacto
   */
  async updateContact(
    id: string,
    userId: string,
    name: string,
    surname: string,
    gender: string,
    relation: string,
    areaCode: number,
    phoneNumber: number
  ): Promise<IEmergency> {
    // Validamos datos
    this.validateId(id)
    this.validateEmergencyOf(userId)
    if (name) {
      name = this.validateName(name)
    }
    if (surname) {
      surname = this.validateSurname(surname)
    }
    if (gender) {
      gender = this.validateGender(gender)
    }
    if (relation) {
      relation = this.validateRelation(relation)
    }
    if (areaCode) {
      areaCode = this.validateAreaCode(areaCode)
    }
    if (phoneNumber) {
      phoneNumber = this.validatePhoneNumber(phoneNumber)
    }
    // Actualizamos al usuario
    let userUpdated = await this.E.findById(id)
    // Validar existencia del usuario
    userUpdated = this.validateExistence(userUpdated!)
    // Validamos que el usuario que vaya a realizar una modificacion en el contacto sea su propietario
    if (userUpdated.emergencyOf !== userId) {
      throw CustomError.forbidden('No puedes realziar esta accion')
    }
    if (name) {
      userUpdated.name = name
    }
    if (surname) {
      userUpdated.surname = surname
    }
    if (gender) {
      userUpdated.gender = gender
    }
    if (relation) {
      userUpdated.relation = relation
    }
    if (areaCode) {
      userUpdated.areaCode = areaCode
    }
    if (phoneNumber) {
      userUpdated.phoneNumber = phoneNumber
    }

    userUpdated.timestamps.updated = new Date().getTime()
    return userUpdated
  }

  /**
   *  iCorlli: 16-8-2022 ✅ \
   * Busca todos los contactos de emergencia que coincidan con el id
   * @param userId id del usuario
   * @returns Contactos
   */
  async getUserContacts(userId: string): Promise<IEmergency[] | null> {
    // valiamos datos
    this.validateEmergencyOf(userId)
    // Filtramos contactos por id del usuario
    const contacts = await this.E.filterMany({ emergencyOf: userId })
    return contacts
  }

  /**
   * iCorlli: 16-8-2022 ✅ \
   * Busca contacto por id y valida su propietario
   * @param id id del contacTO
   * @param userId id del usuario
   * @returns Contacto
   */
  async getContact(id: string, userId: string): Promise<IEmergency> {
    // validamso los datos
    this.validateId(id)
    this.validateEmergencyOf(userId)
    // buscamos contacto por id
    let contactFound = await this.E.findById(id)
    contactFound = this.validateExistence(contactFound!)
    // VALIDAMOS LA PROPIEDAD
    if (contactFound.emergencyOf !== userId) {
      throw CustomError.forbidden('No puedes acceder a este recurso')
    }
    return contactFound
  }

  /**
   * iCorlli: 16-8-2022 ✅ \
   * Elimina el contacto por us id
   * @param id id del contacTO
   * @param userId id del usuario
   * @returns Contacto
   */
  async deleteContact(id: string, userId: string): Promise<IEmergency> {
    // validamso los datos
    this.validateId(id)
    this.validateEmergencyOf(userId)
    // buscamos contacto por id
    let contactFound = await this.E.findById(id)
    contactFound = this.validateExistence(contactFound!)
    // VALIDAMOS LA PROPIEDAD
    if (contactFound.emergencyOf !== userId) {
      throw CustomError.forbidden('No puedes realizar esta accion')
    }
    contactFound = await this.E.deleteById(contactFound.uuid)
    return contactFound!
  }

  /*
  ////////////////////////////////////////
  VALIDACIONES
  ////////////////////////////////////////
  */

  validateExistence(contact: IEmergency): IEmergency {
    // Arrojamos error si no recibimos plan
    if (!contact) {
      throw CustomError.notFound('Contacto inexistente')
    }
    return contact
  }

  private validateId(id: string) {
    // Arrojar error si no recibimos id
    if (!id) {
      throw CustomError.internalError('Id requerido')
    }
    if (typeof id !== 'string') {
      throw CustomError.internalError('Formato de id invalido')
    }
  }

  private validateEmergencyOf(id: string) {
    // Arrojar error si no recibimos id
    if (!id) {
      throw CustomError.internalError('Id del usuario requerido')
    }
    if (typeof id !== 'string') {
      throw CustomError.internalError('Formato de id invalido')
    }
  }

  private validateRelation(relation: string) {
    // Si no enviamos relation arrojamos error
    if (!relation) {
      throw CustomError.badRequest('Relacion requerida')
    }

    relation = relation.toLocaleLowerCase().trim()
    // Convertimos los estados en array
    const useRelation = [
      Relation.Aunt,
      Relation.Brother,
      Relation.Cousin,
      Relation.Father,
      Relation.GrandFather,
      Relation.GrandMother,
      Relation.Mother,
      Relation.Sister,
      Relation.Uncle,
      Relation.Wife,
      Relation.Husband
    ]
    // Verificamos que el estado enviado exista dentro del array
    const response = useRelation.filter((st) => st === relation)
    // Si el estado no existe, arrojamos un error
    if (!response) {
      throw CustomError.badRequest('Relacion invalida')
    }
    return relation
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
    const userGender = [Gender.Female, Gender.Male]
    // Verificamos que el estado enviado exista dentro del array
    const response = userGender.filter((st) => st === gender)
    // Si el estado no existe, arrojamos un error
    if (!response) {
      throw CustomError.badRequest('Genero invalido')
    }
    return gender
  }

  private validateAreaCode(areaCode: number) {
    // Arrojar error si no es enviado
    if (!areaCode) {
      throw CustomError.badRequest('Codigo de area requerido')
    }
    if (typeof areaCode !== 'number') {
      throw CustomError.badRequest('Formato de codigo de area invalido')
    }

    if (areaCode.toString().length > 5) {
      throw CustomError.badRequest(
        `El codigo de area no debe tener mas de ${5} digitos`
      )
    }
    return areaCode
  }

  private validatePhoneNumber(phoneNumber: number) {
    // Arrojar error si no es enviado
    if (!phoneNumber) {
      throw CustomError.badRequest('Numero de telefono requerido')
    }
    if (typeof phoneNumber !== 'number') {
      throw CustomError.badRequest('Formato de codigo postal invalido')
    }

    const isValid = PhoneNumberRegExp.test(phoneNumber.toString())
    if (!isValid) {
      throw CustomError.badRequest(`${phoneNumber} no es valido`)
    }
    return phoneNumber
  }
}
export default Emergency
