import {
  DaysRegExp,
  DescriptionRegExp,
  PriceRegExp,
  TextRegExp
} from '../../../shared/utils/RegExp'
import CustomError from '../../error/CustomError'
import createId from '../../utils/createId'
import IPlan from '../domain/IPlan'
import PlanRepository from '../domain/PlanRepository'
import PlanStatus from '../utils/PlanStatus'
import PlanTypes from '../utils/PlanTypes'

class Plan {
  // Repositorio
  private readonly P: PlanRepository
  constructor(planRepo: PlanRepository) {
    this.P = planRepo
  }

  /*
    ////////////////////////////////////////
    Metodos
    ////////////////////////////////////////
    */

  /**
   * ICorlli: 1-9-2022 ✅ \
   * Crea un nuevo plan
   * @param gymId id del gimnasio
   * @param name nombre
   * @param description descripcion
   * @param price precio
   * @param days cantidad de dias
   * @param type tipo de plan
   * @returns Nuevo plan
   */
  async createNew(
    gymId: string,
    name: string,
    description: string,
    price: number,
    days: number,
    type: string
  ): Promise<IPlan> {
    // Validamos los datos
    this.validateGid(gymId)
    name = this.validateName(name)
    price = this.validatePrice(price)
    days = this.validateDays(days)
    type = this.validateType(type)
    if (description) {
      description = this.validateDescription(description)
    }
    const today = new Date().getTime()
    const plan: IPlan = {
      uuid: createId(),
      gid: gymId,
      name,
      description,
      price,
      days,
      type,
      status: PlanStatus.Active,
      timestamps: {
        created: today,
        updated: today
      }
    }
    // Creamos un nuevo plam
    const newPlan = await this.P.create(plan)
    return newPlan
  }

  /**
   * ICorlli: 1-9-2022 ✅ \
   * Actualiza los datos del plan
   * @param id id del plan
   * @param gymId id del gimnasio
   * @param name nombre
   * @param description descripcion
   * @param price precio
   * @param days cantidad de dias
   * @param type tipo de plan
   * @returns Plan modificado
   */
  async updateData(
    id: string,
    gymId: string,
    name: string,
    description: string,
    price: number,
    days: number,
    type: string
  ): Promise<IPlan> {
    // Validamos datos
    this.validateId(id)
    this.validateGid(gymId)
    if (name) {
      name = this.validateName(name)
    }
    if (description) {
      description = this.validateDescription(description)
    }
    if (price) {
      price = this.validatePrice(price)
    }
    if (days) {
      days = this.validateDays(days)
    }
    if (type) {
      type = this.validateType(type)
    }

    // Buscamos el plan a actualizar
    let planFound = await this.P.findById(id)
    // Arrojamos error si no encontramos plan
    planFound = this.validateExistence(planFound!)
    // Validamos la propiedad
    this.validateGymProperty(gymId, planFound.gid)
    // Arrojamos error si el plan esta desabilitado
    if (planFound.status === PlanStatus.Inactive) {
      throw CustomError.badRequest('No puedes modificar un plan inactivo')
    }
    // Actualizamos los datos
    planFound.name = name
    planFound.description = description
    planFound.price = price
    planFound.days = days
    planFound.timestamps.updated = new Date().getDate()

    const planSaved = await this.P.save(planFound)
    return planSaved
  }

  /**
   * ICorlli: 1-9-2022 ✅ \
   * Actualiza el estado del plan
   * @param id id del plan
   * @param gymId id del gimnasio
   * @param status estado del plan
   * @returns Plan actualizado
   */
  async changeStatus(
    id: string,
    gymId: string,
    status: string
  ): Promise<IPlan> {
    // Validamos los datos
    this.validateId(id)
    this.validateGid(gymId)
    status = this.validateStatus(status)
    let planFound = await this.P.findById(id)
    // Arrojamos error si no encotramos el plan solicitado
    planFound = this.validateExistence(planFound!)
    // Validamos la propiedad
    this.validateGymProperty(gymId, planFound.gid)

    if (status === PlanStatus.Inactive) {
      // Arrojamos error si el plan ya esta deshabilitado
      if (planFound.status === PlanStatus.Inactive) {
        throw CustomError.badRequest('El plan esta inactivo')
      }
    } else {
      // Arrojamos error si el plan ya esta habilitado
      if (planFound.status === PlanStatus.Active) {
        throw CustomError.badRequest('El plan esta activo')
      }
    }
    planFound.status = status
    planFound.timestamps.updated = new Date().getTime()
    const planSaved = await this.P.save(planFound)
    return planSaved
  }

  /**
   * ICorlli: 1-9-2022 ✅ \
   * Obtiene informacion de un plan sin tener en cuenta su estado
   * @param id id del plan
   * @param gymId id del gimnasio
   * @returns Informacion de un plan
   */
  async findByGym(id: string, gymId: string): Promise<IPlan> {
    // Validamos datos
    this.validateId(id)
    // Buscamos plan en base de datos
    let planFound = await this.P.filterOne({
      $and: [{ _id: id }, { gid: gymId }]
    })
    // Arrojamos error si no existe un plan con el id
    planFound = this.validateExistence(planFound!)
    return planFound
  }

  /**
   * ICorlli: 1-9-2022 ✅ \
   * Obtiene todos los planes de un gimnasio sin importar su estado
   * @param gymId Id del gimnasio
   * @returns Planes del gimnasio
   */
  async findAllByGym(gymId: string): Promise<Array<IPlan> | null> {
    // Validamos datos
    this.validateGid(gymId)
    // Buscamos todos los planes de un gimnasio
    const plansFound = await this.P.filterMany({ gid: gymId })
    return plansFound
  }

  /**
   * ICorlli: 1-9-2022 ✅
   * Obtiene los datos de un plan
   * @param id id del plan
   * @returns Informacion del plan
   */
  async findActiveById(id: string): Promise<IPlan> {
    // Validamos datos
    this.validateId(id)
    // Buscamos plan en base de datos
    let planFound = await this.P.filterOne({
      $and: [{ _id: id }, { status: PlanStatus.Active }]
    })
    // Arrojamos error si no existe un plan con el id
    planFound = this.validateExistence(planFound!)
    return planFound
  }

  /**
   * ICorlli: 1-9-2022 ✅
   * Obtiene los planes activos de un gimnasio
   * @param gymId id del gimnasio
   * @returns planes activos
   */
  async findAllActivesByGym(gymId: string): Promise<Array<IPlan> | null> {
    // Validamos datos
    this.validateGid(gymId)
    // Buscamos todos los planes disponibles de un gimnasio
    const plansFound = await this.P.filterMany({
      $and: [{ gid: gymId }, { status: PlanStatus.Active }]
    })
    return plansFound
  }

  /**
   * ICorlli: 1-9-2022 ✅ \
   * Elimina el plan por su id y id del gimnasio
   * @param id id del plan
   * @param gymId id del gimnasio
   * @returns plan eliminado
   */
  async deleteById(id: string, gymId: string): Promise<IPlan> {
    // validamos datos
    this.validateId(id)
    this.validateGid(gymId)
    // buscamos el plan
    let planFound = await this.P.findById(id)
    planFound = this.validateExistence(planFound!)
    this.validateGymProperty(gymId, planFound.gid)
    // eleiminamos por su id
    await this.P.deleteById(planFound.uuid)
    return planFound
  }

  /*
    ////////////////////////////////////////
    VALIDACIONES
    ////////////////////////////////////////
    */

  private validateExistence(plan: IPlan): IPlan {
    // Arrojamos error si no recibimos plan
    if (!plan) {
      throw CustomError.notFound('Plan inexistente')
    }
    return plan
  }

  private validateGymProperty(gymId: string, planGid: string) {
    // Arrojamos error si el plan solicitado no coincide con el id del gimnasio que lo creo
    if (planGid !== gymId) {
      throw CustomError.forbidden('No puedes realizar esta accion')
    }
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

  private validateName(name: string) {
    // Arrojar error si no es enviado
    if (!name) {
      throw CustomError.badRequest('Nombre requerido')
    }
    if (typeof name !== 'string') {
      throw CustomError.badRequest('Formato de nombre invalido')
    }
    name = name.toLocaleLowerCase().trim()
    const isValid = TextRegExp.test(name)
    if (!isValid) {
      throw CustomError.badRequest(`${name} no es valido`)
    }

    if (name.length > 100) {
      throw CustomError.badRequest(
        `El nombre no debe tener mas de ${30} caracteres`
      )
    }
    return name
  }

  private validateDescription(description: string) {
    // Arrojar error si no es enviado
    if (!description) {
      throw CustomError.badRequest('Descripcion requerida')
    }
    if (typeof description !== 'string') {
      throw CustomError.internalError('Formato de descripcion invalido')
    }
    description = description.trim()
    const isValid = DescriptionRegExp.test(description)

    if (!isValid) {
      throw CustomError.badRequest(`${description} no es valido`)
    }
    if (description.length > 200) {
      throw CustomError.badRequest(
        `La descripcion no debe tener mas de ${200} caracteres`
      )
    }
    return description
  }

  private validatePrice(price: number) {
    // Arrojar error si no es enviado
    if (!price) {
      throw CustomError.badRequest('Precio requerido')
    }
    if (typeof price !== 'number') {
      throw CustomError.internalError('Formato de id invalido')
    }
    const isValid = PriceRegExp.test(price.toString())

    if (!isValid) {
      throw CustomError.badRequest(`${price} no es valido`)
    }
    return price
  }

  private validateDays(days: number) {
    // Arrojar error si no es enviado
    if (!days) {
      throw CustomError.badRequest('Cantidad de dias requerido')
    }
    if (typeof days !== 'number') {
      throw CustomError.internalError('Formato de dias invalido')
    }

    const isValid = DaysRegExp.test(days.toString())

    if (!isValid) {
      throw CustomError.badRequest(`${days} no es valido`)
    }
    return days
  }

  private validateStatus(status: string) {
    // Si no enviamos status arrojamos error
    if (!status) {
      throw CustomError.badRequest('Estado requerido')
    }
    if (typeof status !== 'string') {
      throw CustomError.internalError('Formato de estado invalido')
    }

    status = status.toLocaleLowerCase().trim()

    // Convertimos los estados en array
    const useStatus = [
      PlanStatus.Active,
      PlanStatus.Inactive,
      PlanStatus.Deleted
    ]
    // Verificamos que el estado enviado exista dentro del array
    const response = useStatus.find((st) => st === status)
    // Si el estado no existe, arrojamos un error
    if (!response) {
      throw CustomError.badRequest('Estado invalido')
    }
    return status
  }

  private validateType(type: string) {
    // Si no enviamos status arrojamos error
    if (!type) {
      throw CustomError.badRequest('Tipo de plan requerido')
    }
    if (typeof type !== 'string') {
      throw CustomError.internalError('Formato de tipo de plan invalido')
    }

    type = type.toLocaleLowerCase().trim()

    // Convertimos los estados en array
    const useStatus = [
      PlanTypes.Annual,
      PlanTypes.Biannual,
      PlanTypes.Bimonthly,
      PlanTypes.Fortnight,
      PlanTypes.Free,
      PlanTypes.Monthly,
      PlanTypes.Quarterly,
      PlanTypes.Unique,
      PlanTypes.Weekly
    ]
    // Verificamos que el estado enviado exista dentro del array
    const response = useStatus.find((st) => st === type)
    // Si el estado no existe, arrojamos un error
    if (!response) {
      throw CustomError.badRequest('tipo de plan invalido')
    }
    return type
  }

  private validateGid(id: string) {
    // Arrojamos error si no recibimos id
    if (!id) {
      throw CustomError.internalError('Id del gimnasio requerido')
    }
    if (typeof id !== 'string') {
      throw CustomError.internalError('Formato de id invalido')
    }
  }
}
export default Plan
