import CustomError from '../../error/CustomError'
import {
  EmailRegExp,
  TextRegExp,
  PhoneNumberRegExp,
  UsernameRegExp,
  NamesRegExp
} from '../../../shared/utils/RegExp'
import UserRepository from '../domain/UserRpository'
import HashRepository from '../utils/HashRepository'
import UserStatus from '../utils/UserStatus'
import Provincias from '../../../shared/utils/Provincias'
import IUserBase from '../domain/IUser'
import IUser from '../domain/IPerson'

class User<T extends IUserBase | IUser> {
  protected readonly U: UserRepository<T>
  protected readonly H?: HashRepository
  private readonly O?: UserRepository<IUserBase>
  constructor(
    userRepo: UserRepository<T>,
    hashRepo?: HashRepository,
    otherRepo?: UserRepository<IUserBase>
  ) {
    this.U = userRepo
    this.H = hashRepo
    this.O = otherRepo
  }
  /*
  ////////////////////////////////////////
  Metodos
  ////////////////////////////////////////
  */

  /**
   * iCorlli: 13-8-2022 ✅
   * Busca al usuario por su nombre de usuario o su email
   * @param {string} email email del usuario a buscar
   * @param {string} username username del usuario a buscar
   */
  async emailUsernameExists(email: string, username: string): Promise<void> {
    // Validamos los datos enviados
    if (this.O) {
      if (email) {
        email = this.validateEmail(email)
      }
      if (username) {
        username = this.validateUsername(username)
      }
      // Buscamos el email o el nombre de usuario
      const userFound = await this.O.filterOne({
        $or: [{ 'account.email': email }, { 'account.username': username }]
      })
      // Si encuentra email arrojamos error
      if (userFound) {
        let result: string
        if (userFound.account.email === email) {
          result = userFound.account.email
          throw CustomError.badRequest(`${result!} ya esta en uso`)
        }
        if (userFound.account.username === username) {
          result = userFound.account.username
          throw CustomError.badRequest(`${result!} ya esta en uso`)
        } else {
          throw CustomError.badRequest(
            'Ya existe un usuario con ese email o username'
          )
        }
      }
    } else {
      throw CustomError.internalError(
        'No se encunetra base de datos de usuario'
      )
    }
  }

  /**
   * iCorlli: 13-8-2022 ✅
   * Busca usuarios por su email
   * @param email email del usuario a buscar
   * @returns Nuevo usario si encuentra usuario sino null
   */
  async findByEmail(email: string): Promise<T> {
    // Validamos los datos
    email = this.validateEmail(email)
    // Buscamos el usuario por su email
    let userFound: T | null = await this.U.filterOne({
      'account.email': email
    })
    // Si no encotramos usuario arrojamos un error
    userFound = this.validateExistence(userFound!)
    return userFound
  }

  /**
   * iCorlli: 13-8-2022 ✅
   * Busca usuarios por su username
   * @param username email del usuario a buscar
   * @returns Nuevo usario si encuentra usuario sino null
   */
  async findByUsername(username: string): Promise<T> {
    // Validamos los datos
    username = this.validateUsername(username)
    // Buscamos el usuario por su email
    let userFound: T | null = await this.U.filterOne({
      'account.username': username
    })
    // Si no encotramos usuario arrojamos un error
    userFound = this.validateExistence(userFound!)
    return userFound
  }

  /**
   * iCorlli: 14-8-2022 ✅ \
   * Verifica la cuenta del usuario
   * @param id id del usuario a verificar
   * @param code codigo de verificacion enviado por el usuario
   * @param decrypted codigo desencriptado del token
   * @returns Usuario verificado
   */
  async verifyAccount(id: string, code: number, decrypted: number): Promise<T> {
    // Validamos datos
    this.validateId(id)
    // Verificamos el codigo encriptado con el cargado por el usuario
    if (typeof code !== 'number') {
      throw CustomError.badRequest('Formato de codigo invalido')
    }
    if (code !== decrypted) {
      throw CustomError.badRequest('El codigo enviado es invalido')
    }
    // Actualizamos al usuario
    let userFound: T | null = await this.U.updateById(id, {
      'account.verified': true,
      'timestamps.updated': new Date().getTime()
    })
    // Arrojamos error si no enctramos usuario
    userFound = this.validateExistence(userFound!)
    return userFound
  }

  /**
   * iCorlli: 14-8-2022 ✅ \
   * Actualizamos el estado del usuario
   * @param id id del usuario a actualizar
   * @param status el estado que vamos a actualizar
   * @returns Usuario con estado actualizado
   */
  async updateStatus(id: string, status: string): Promise<T> {
    // Validamos los datos
    this.validateId(id)
    status = this.validateStatus(status)
    // Actualizamos el estado del usuario
    let userUpdated: T | null = await this.U.updateById(id, {
      'account.status': status,
      'timestamps.updated': new Date().getTime()
    })
    // Arrojamos error si no encontramos usuario
    userUpdated = this.validateExistence(userUpdated!)
    return userUpdated
  }

  /**
   * iCorlli: 14-8-22 ✅ /
   * Cambiamos el email del usuario
   * @param id id del usuario
   * @param email nuevo email
   * @returns Usuario con nuevo email
   */
  async changeEmail(id: string, email: string): Promise<T> {
    // Validamos los datos
    this.validateId(id)
    email = this.validateEmail(email)
    // Validamos que el email no este en uso
    // Verificamos que existe el usuario enviado
    let userFound: T | null = await this.U.findById(id)
    // Si no encontramos usuario arrojamos error
    userFound = this.validateExistence(userFound!)
    // Si el correo enviado es igual al anterior enviamos un error
    if (userFound.account.email === email) {
      throw CustomError.badRequest('El email enviado es igual al actual')
    }
    await this.emailUsernameExists(email, '')
    userFound.account.email = email
    userFound.account.verified = false
    userFound.timestamps.updated = new Date().getTime()
    // Actualizamos el email del usuario
    await this.U.save(userFound)
    // Si no encontramos usuario arrojamos error
    return userFound
  }

  async changeUsername(id: string, username: string): Promise<T> {
    // validamos datos
    this.validateId(id)
    username = this.validateUsername(username)
    // Validamos que no este en uso
    // Verificamos que existe el usuario enviado
    let userFound: T | null = await this.U.findById(id)
    // Si no encontramos usuario arrojamos error
    userFound = this.validateExistence(userFound!)
    // Si el correo enviado es igual al anterior enviamos un error
    if (userFound.account.username === username) {
      throw CustomError.badRequest('El username enviado es igual al actual')
    }
    await this.emailUsernameExists('', username)
    userFound.account.username = username
    userFound.timestamps.updated = new Date().getTime()
    // Actualizamos el username del usuario
    await this.U.save(userFound)
    // Si no encontramos usuario arrojamos error
    return userFound
  }

  /**
   * iCorlli" 14-8-2022 ✅ \
   * Require HashRepository ❗ \
   * Recupera la contrasenia en caso de olvidarla
   * @param id id del usuario
   * @param password nueva contrasenia
   * @returns Usuario
   */
  async recoverPassword(id: string, password: string): Promise<T> {
    // Validamos los datos
    this.validateId(id)
    password = this.validatePassword(password)
    // Buscamos el usuario por id
    let userFound: T | null = await this.U.findById(id)
    // Arrojamos error si no encontramos usuario
    userFound = this.validateExistence(userFound!)
    // Creamos un nuevo hash para la nueva cotrasenia
    const newHash = await this.H!.createHash(password)
    userFound.account.password = newHash
    userFound.timestamps.updated = new Date().getTime()
    // Guardamos nueva contrasenia en base de datos
    this.U.save(userFound)
    return userFound
  }

  /**
   * iCorlli: 13-8-2022 ✅ \
   * Require HashRepository ❗ \
   * Cambiar vieja contrasenia
   * @param id id del ususario
   * @param password contrasenia actual
   * @param newPassword nueva contrasena
   * @returns Usuario
   */
  async createNewPassword(
    id: string,
    password: string,
    newPassword: string
  ): Promise<T> {
    // Validamos los datos
    this.validateId(id)
    password = this.validatePassword(password)
    if (!newPassword) {
      throw CustomError.badRequest('Nueva contraseña requerida')
    }
    newPassword = newPassword.trim()
    if (newPassword.length < 6) {
      throw CustomError.badRequest(
        `La contraseña debe tener mas de ${6} caracteres`
      )
    }
    if (newPassword.length > 20) {
      throw CustomError.badRequest(
        `La contraseña no debe tener mas de ${20} caracteres`
      )
    }
    // Buscamos el usuario por id
    let userFound: T | null = await this.U.findById(id)
    // Arrojamos error si no encontramos un usuario
    userFound = this.validateExistence(userFound!)
    // Comparamos las contraseñas
    const comparedHash = await this.H!.compareHash(
      password,
      userFound.account.password as string
    )
    // Si las contrasenias no son iguales arrojamos un error
    if (!comparedHash) {
      throw CustomError.badRequest('Contraseña incorrecta')
    }
    // Creamos un nuevo hash para la nueva cotrasenia
    const newHash = await this.H!.createHash(newPassword)
    userFound.account.password = newHash
    userFound.timestamps.updated = new Date().getTime()
    // Guardamos nueva contrasenia en base de datos
    this.U.save(userFound)
    return userFound
  }

  /**
   * iCorlli: 13-8-2022 ✅ \
   * Require HashRepository ❗ \
   * Busca al usuario por email o username y valida que la contrasenia ingresada coincida con la guardad en base de datos
   * @param accessName username | email
   * @param password conteasenia del usuario
   * @returns Usuario
   */
  async login(accessName: string, password: string): Promise<T> {
    // Validamos los datos
    if (!accessName) {
      throw CustomError.badRequest('Debe ingresar su username o su email')
    }
    password = this.validatePassword(password)
    // Buscamos el usuario por su email
    let userFound: T | null = await this.U.filterOne({
      'account.username': accessName.toLowerCase().trim()
    })
    // Arrojamos error si no encontramos un usuario
    userFound = this.validateExistence(userFound!)
    // Si no esta verificado no le permitimos ingresar
    if (!userFound.account.verified) {
      throw CustomError.unauthorized('Su cuenta no ha sido verificada')
    }
    // Si la cuenta esta suspendida no le permitimos ingresar
    if (userFound.account.status === UserStatus.Suspended) {
      throw CustomError.unauthorized('Su cuenta esta suspendida')
    }
    // Si la cuenta esta inactiva no le permitimos ingresar
    if (userFound.account.status === UserStatus.Inactive) {
      throw CustomError.unauthorized('Su cuenta esta inactiva')
    }
    if (userFound.account.status === UserStatus.Deleted) {
      throw CustomError.notFound('Su cuenta ha sido eliminada')
    }
    // Si existe el usuairo comparamos contrasenia con el hash guardado
    const hashCompared = await this.H!.compareHash(
      password,
      userFound.account.password as string
    )
    // Verificamos que las contrasenias sean iguales
    if (!hashCompared) {
      throw CustomError.badRequest('Contraseña incorrecta')
    }
    // Retornamos el usuario encontrado
    userFound.account.password = undefined
    return userFound
  }

  /**
   * iCorlli: 15-8-2022 ✅ \
   * Obtiene todos los datos del usuario
   * @param id id del usuario
   * @returns Usuario
   */
  async getData(id: string): Promise<T> {
    // validamos datos
    this.validateId(id)
    // Buscamos usuario por id
    let userFound: T | null = await this.U.findById(id)
    userFound = this.validateExistence(userFound!)
    userFound.account.password = undefined
    return userFound
  }

  /**
   * iCorlli: 22-8-2022 ✅ \
   * Si no se envia el tipo de usuario busca en Usuarios y en Gimnasios \
   * Busca al usuario por nombre de usuario, email o nombre de perfil
   * @param name usrname | email | nombre
   * @param type 'User' | 'Gym'
   * @returns Usuario | null
   */
  async filterByEmailUsername(
    name: string,
    type?: 'Gym' | 'Person'
  ): Promise<T[] | null> {
    let userFound: T[] | null = null
    if (name) {
      name = name.toLowerCase().trim()
      // Buscamos el usuario
      userFound = await this.U.filterMany(
        type
          ? {
              type,
              'account.verified': true
            }
          : { 'account.verified': true },
        undefined,
        'account.username',
        {
          $or: [
            { 'account.username': name },
            { 'account.email': name },
            { 'profile.name': name }
          ]
        }
      )
    } else {
      userFound = await this.U.filterMany(
        type
          ? {
              type,
              'account.verified': true
            }
          : { 'account.verified': true },
        undefined,
        'account.username',
        ''
      )
    }

    return userFound
  }

  /*
  ////////////////////////////////////////
  VALIDACIONES
  ////////////////////////////////////////
  */
  validateExistence(user: T): T {
    // Arrojamos error si no recibimos plan
    if (!user) {
      throw CustomError.notFound('No exite el usuario')
    }
    return user
  }

  protected validateId(id: string) {
    // Arrojar error si no recibimos id
    if (!id) {
      throw CustomError.internalError('Id requerido')
    }
    if (typeof id !== 'string') {
      throw CustomError.internalError('Formato de id invalido')
    }
  }

  protected validateEmail(email: string) {
    // Arrojar error si no recibimos email
    if (!email) {
      throw CustomError.badRequest('Email requerido')
    }
    if (typeof email !== 'string') {
      throw CustomError.badRequest('Formato de email invalido')
    }
    email = email.toLocaleLowerCase().trim()
    const isValid = EmailRegExp.test(email)
    if (!isValid) {
      throw CustomError.badRequest(`${email} no es valido`)
    }
    if (email.length > 100) {
      throw CustomError.badRequest(
        `El email no debe tener mas de ${100} caracteres`
      )
    }
    return email
  }

  protected validateUsername(username: string) {
    // Arrojar error si no recibimos username
    if (!username) {
      throw CustomError.badRequest('Nombre de usuario requerido')
    }
    if (typeof username !== 'string') {
      throw CustomError.badRequest('Formato de username invalido')
    }
    username = username.toLocaleLowerCase().trim()
    const isValid = UsernameRegExp.test(username)
    if (!isValid) {
      throw CustomError.badRequest(`${username} no es valido`)
    }
    if (username.length > 15) {
      throw CustomError.badRequest(
        `El username no debe tener mas de ${15} caracteres`
      )
    }
    return username
  }

  protected validatePassword(password: string) {
    // Arrojar error si no recibimos password
    if (!password) {
      throw CustomError.badRequest('Contraseña requerida')
    }
    if (typeof password !== 'string') {
      throw CustomError.badRequest('Formato de contraseña invalido')
    }
    password = password.trim()
    if (password.length < 6) {
      throw CustomError.badRequest(
        `La contraseña debe tener mas de ${6} caracteres`
      )
    }
    if (password.length > 20) {
      throw CustomError.badRequest(
        `La contraseña no debe tener mas de ${20} caracteres`
      )
    }
    return password
  }

  protected validateStatus(status: string) {
    // Si no enviamos status arrojamos error
    if (!status) {
      throw CustomError.badRequest('Estado requerido')
    }

    status = status.toLocaleLowerCase().trim()

    // Convertimos los estados en array
    const useStatus = [
      UserStatus.Active,
      UserStatus.Inactive,
      UserStatus.Suspended,
      UserStatus.Deleted
    ]
    // Verificamos que el estado enviado exista dentro del array
    const response = useStatus.find((st) => st === status)
    // Si el estado no existe, arrojamos un error
    if (!response) {
      throw CustomError.badRequest('Estado invalido')
    }
    return status
  }

  protected validateCountry(country: string) {
    // Arrojar error si no es enviado
    if (!country) {
      throw CustomError.badRequest('Pais requerido')
    }

    if (typeof country !== 'string') {
      throw CustomError.badRequest('Formato de pais invalido')
    }
    country = country.toLocaleLowerCase().trim()
    const isValid = NamesRegExp.test(country)
    if (!isValid) {
      throw CustomError.badRequest(`${country} no es valido`)
    }
    if (country.length > 12) {
      throw CustomError.badRequest(
        `El pais no debe tener mas de ${12} caracteres`
      )
    }
    return country
  }

  protected validateCity(city: string) {
    // Arrojar error si no es enviado
    if (!city) {
      throw CustomError.badRequest('Provincia requerida')
    }
    if (typeof city !== 'string') {
      throw CustomError.badRequest('Formato de provincia invalido')
    }
    city = city.toLocaleLowerCase().trim()
    const isValid = TextRegExp.test(city)
    if (!isValid) {
      throw CustomError.badRequest(`${city} no es valido`)
    }

    if (city.length > 12) {
      throw CustomError.badRequest(
        `La provincia no debe tener mas de ${12} caracteres`
      )
    }
    return city
  }

  protected validateState(state: string) {
    // Arrojar error si no es enviado
    if (!state) {
      throw CustomError.badRequest('Localidad requerida')
    }
    if (typeof state !== 'string') {
      throw CustomError.badRequest('Formato de localidad invalido')
    }
    state = state.toLocaleLowerCase().trim()
    const isValid = TextRegExp.test(state)
    if (!isValid) {
      throw CustomError.badRequest(`${state} no es valido`)
    }
    if (state.length > 12) {
      throw CustomError.badRequest(
        `La localidad no debe tener mas de ${12} caracteres`
      )
    }
    return state
  }

  protected validatePostalCode(postalCode: string, city: string): string {
    // Arrojar error si no es enviado
    if (!postalCode) {
      throw CustomError.badRequest('Codigo postal requerido')
    }
    if (typeof postalCode !== 'string') {
      throw CustomError.badRequest('Formato de codigo postal invalido')
    }

    if (postalCode.toString().length > 5) {
      throw CustomError.badRequest(
        `El codigo postal no debe tener mas de ${5} digitos`
      )
    }
    city = this.validateCity(city)
    Provincias.forEach((provincia) => {
      if (provincia.nombre === city) {
        postalCode = provincia.code + postalCode
      }
    })
    return postalCode
  }

  protected validateAreaCode(areaCode: number) {
    // Arrojar error si no es enviado
    if (!areaCode) {
      throw CustomError.badRequest('Codigo de area requerido')
    }
    if (typeof areaCode !== 'number') {
      throw CustomError.badRequest('Formato de codigo postal invalido')
    }

    if (areaCode.toString().length > 5) {
      throw CustomError.badRequest(
        `El codigo de area no debe tener mas de ${5} digitos`
      )
    }
    return areaCode
  }

  protected validatePhoneNumber(phoneNumber: number) {
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
export default User
