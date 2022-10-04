import CustomError from '../../error/CustomError'
import IAccess from '../domain/IAccess'
import AccessRepository from '../domain/AccessRepository'
import createId from '../../utils/createId'

class Access {
  private readonly A: AccessRepository
  constructor(AccessRepo: AccessRepository) {
    this.A = AccessRepo
  }

  /**
   * iCorlli: 14-8-2022 ✅ \
   * Crea un nuevo Access de tipo superadmin
   * @param gymId id del gimnasio asociado
   * @returns Nuevo Access
   */
  async createSuperAdmin(gymId: string): Promise<IAccess> {
    // Validamos los datos ingresados
    this.validateGid(gymId)
    // Creamos un nuevo Access
    const today = new Date().getTime()
    const Access: IAccess = {
      uuid: createId(),
      role: 'NATIVE@SUPERADMIN',
      gid: gymId,
      timestamps: {
        created: today,
        updated: today
      }
    }
    // Guardamos Access en base de datos
    const newAccess = await this.A.create(Access)
    return newAccess
  }

  /**
   * iCorlli: 14-8-2022 ✅ \
   * Crea un nuevo Access de tipo manager
   * @param userId id del usuario creador
   * @param gymId id del gimnasio asociado
   * @returns Nuevo Access
   */
  private async createAdministrator(
    userId: string,
    gymId: string
  ): Promise<IAccess> {
    // Validamos los datos ingresados
    this.validateUid(userId)
    this.validateGid(gymId)
    // Creamos un nuevo Access
    const today = new Date().getTime()
    const Access: IAccess = {
      uuid: createId(),
      role: 'NATIVE@ADMINISTRATOR',
      uid: userId,
      gid: gymId,
      timestamps: {
        created: today,
        updated: today
      }
    }
    // Guardamos Access en base de datos
    const newAccess = await this.A.create(Access)
    return newAccess
  }

  /**
   * iCorlli: 22-8-2022 ✅ \
   * Crea un nuevo Access de tipo entrenador
   * @param userId id del usuario creador
   * @param gymId id del gimnasio asociado
   * @returns Nuevo Access
   */
  private async createTrainer(userId: string, gymId: string): Promise<IAccess> {
    // Validamos los datos ingresados
    this.validateUid(userId)
    this.validateGid(gymId)
    // Creamos un nuevo Access
    const today = new Date().getTime()
    const Access: IAccess = {
      uuid: createId(),
      role: 'NATIVE@TRAINER',
      uid: userId,
      gid: gymId,
      timestamps: {
        created: today,
        updated: today
      }
    }
    // Guardamos Access en base de datos
    const newAccess = await this.A.create(Access)
    return newAccess
  }

  /**
   * ICorlli: 1-9-2022 ✅ \
   * Crea un nuevo access basado en el tipo de accesso ingresado
   * @param gimId id del gimnasio
   * @param userId id del usuario
   * @param type tipo de access
   * @returns Nuevo Access
   */
  async createAccess(
    gimId: string,
    userId: string,
    type: string
  ): Promise<IAccess> {
    // validamos datos
    this.validateGid(gimId)
    this.validateUid(userId)

    if (!type || (type !== 'trainer' && type !== 'administrator')) {
      throw CustomError.internalError('Se produjo un error al asignar acceso')
    }
    // creamos un nuevo accesso dependiendo del tipo
    let newAccess: IAccess | null = null
    if (type === 'trainer') {
      newAccess = await this.createTrainer(userId, gimId)
    }
    if (type === 'administrator') {
      newAccess = await this.createAdministrator(userId, gimId)
    }
    return newAccess as IAccess
  }

  /**
   * ICorlli: 1-9-2022 ✅ \
   * Elimina access por su id
   * @param id id del access
   * @param gymId id del gimnasio
   * @returns Accesso eliminado
   */
  async deleteAccess(id: string, gymId: string): Promise<IAccess> {
    this.validateId(id)
    this.validateGid(gymId)
    // Buscamos el accesso
    const accessFound = await this.A.findById(id)
    if (!accessFound) {
      throw CustomError.notFound('Acceso inexistente')
    }
    if (accessFound.gid !== gymId) {
      throw CustomError.internalError('No puedes realizar esta accion')
    }
    // Eliminamos el accesso
    await this.A.deleteById(accessFound.uuid)
    return accessFound
  }

  /**
   * ICorlli: 1-9-2022 ✅ \
   * Actualiza el accesso
   * @param id id del accesso
   * @param gymId id del gimnasio
   * @param type tipo de accesso
   * @returns Access modificado
   */
  async updateAccess(
    id: string,
    gymId: string,
    type: string
  ): Promise<IAccess> {
    // validamos datos
    this.validateId(id)
    this.validateGid(gymId)
    if (!type || (type !== 'trainer' && type !== 'administrator')) {
      throw CustomError.internalError('Se produjo un error al asignar acceso')
    }
    // Bsucamos accesso
    const accessFound = await this.A.findById(id)
    if (!accessFound) {
      throw CustomError.notFound('Acceso inexistente')
    }
    // Validamos la propiedad
    if (accessFound.gid !== gymId) {
      throw CustomError.forbidden('No puedes realizar esta accion')
    }
    // Actualizamos datos
    accessFound.role = defineRole(type!)
    await this.A.save(accessFound)

    function defineRole(type: string) {
      switch (type) {
        case 'administrator':
          return 'NATIVE@ADMINISTRATOR'
        case 'trainer':
          return 'NATIVE@TRAINER'
        default:
          return ''
      }
    }
    return accessFound
  }

  /**
   * iCorlli:14-8-2022 ✅ \
   * Busca solo los access del usuario
   * @param userId id del usuario
   * @param gymId id del gimnasio
   * @returns Access
   */
  async findUserAccesss(
    userId: string,
    gymId: string
  ): Promise<IAccess[] | null> {
    // validamos datos ingresados
    this.validateUid(userId)
    this.validateGid(gymId)
    // Buscamos los Accesss del usuario por gimnasio
    const AccesssFounds = await this.A.filterMany({
      $and: [{ uid: userId }, { gid: gymId }]
    })
    return AccesssFounds
  }

  /**
   * iCorlli:14-8-2022 ✅ \
   * Busca solo el accesso del gimnasio
   * @param gymId id del gimnasio
   * @returns Access
   */
  async findGymAccess(gymId: string): Promise<IAccess[] | null> {
    // validamos datos ingresados
    this.validateGid(gymId)
    // Buscamos los Accesss del usuario por gimnasio
    const AccesssFounds = await this.A.filterMany({
      $and: [{ gid: gymId }, { uid: null }, { name: 'NATIVE@SUPERADMIN' }]
    })
    return AccesssFounds
  }

  /**
   * iCorlli:22-8-2022 ✅ \
   * Busca todos los Accesss del gimnasio, tanto del gimnasio como de los ususario
   * @param gymId id del gimnasio
   * @returns Access
   */
  async findAllGymAccess(gymId: string): Promise<IAccess[] | null> {
    // validamos datos ingresados
    this.validateGid(gymId)
    // Buscamos los Accesss del usuario por gimnasio
    const AccesssFounds = await this.A.filterMany({ gid: gymId }, 'uid')
    return AccesssFounds
  }

  private validateId(id: string) {
    // Arrojamos error si no recibimos id
    if (!id) {
      throw CustomError.internalError(
        'Se produjo un error al crear nuevo acceso'
      )
    }
  }

  private validateUid(id: string) {
    // Arrojamos error si no recibimos id
    if (!id) {
      throw CustomError.internalError(
        'Se produjo un error al crear nuevo acceso'
      )
    }
  }

  private validateGid(id: string) {
    // Arrojamos error si no recibimos id
    if (!id) {
      throw CustomError.internalError(
        'Se produjo un error al crear nuevo acceso'
      )
    }
  }
}
export default Access
