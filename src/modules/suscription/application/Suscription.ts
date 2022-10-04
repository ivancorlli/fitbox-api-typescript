import { DateRegExp, PriceRegExp } from '../../../shared/utils/RegExp'
import CustomError from '../../error/CustomError'
import createId from '../../utils/createId'
import handleSuscriptionDate from '../utils/handleSuscriptionDate'
import ISuscription from '../domain/ISuscription'
import SuscriptionRepository from '../domain/SuscriptionRepository'
import PaymentType from '../utils/PaymentType'
import SuscriptionStatus from '../utils/SuscriptionStatus'

class Suscription {
  // Repositorio
  private readonly S: SuscriptionRepository
  constructor(suscriptionRepo: SuscriptionRepository) {
    this.S = suscriptionRepo
  }

  /*
  ////////////////////////////////////////
  Metodos
  ////////////////////////////////////////
  */

  /**
   * ICorlli: 1-9-2022 ✅ \
   * Crea una nueva suscripcion
   * @param userId id del usuario
   * @param gymId id del gimnasio
   * @param planId id del plan
   * @param paymentType tipo de pago
   * @param paymentTotal pago total
   * @param planType tipo de plan
   * @returns Nueva suscripcion
   */
  async createNew(
    userId: string,
    gymId: string,
    planId: string,
    paymentType: string,
    paymentTotal: number,
    planType: string
  ): Promise<ISuscription> {
    // Validamos los datos
    paymentType = this.validatePaymentType(paymentType)
    paymentTotal = this.validatePaymentTotal(paymentTotal)
    this.validateUid(userId)
    this.validateGid(gymId)
    this.validatePid(planId)

    const today = new Date().getTime()
    const date = handleSuscriptionDate(planType)
    const start = this.validateDate(date.start)
    const expiration = this.validateDate(date.expiration)
    // creamos nueva suscripcion
    const suscription: ISuscription = {
      uuid: createId(),
      suscriptionNr: Date.now(),
      start,
      expiration,
      status: SuscriptionStatus.InProgress,
      paymentType,
      paymentTotal,
      isNewSuscriber: await this.hasSuscriptions(userId, gymId, planId),
      uid: userId,
      gid: gymId,
      pid: planId,
      timestamps: { created: today, updated: today }
    }
    const newSuscription = await this.S.create(suscription)
    return newSuscription
  }

  /**
   * Verifica si el usuario tiene suscripciones y si puede crear nuevas
   * @param userId id del usuario
   * @param gymId id del gimnasio
   * @param planId id del plan
   * @returns boolean
   */
  private async hasSuscriptions(
    userId: string,
    gymId: string,
    planId: string
  ): Promise<boolean> {
    const suscriptionsExists = await this.S.filterMany({
      uid: userId
    })
    if (suscriptionsExists && suscriptionsExists.length > 0) {
      const today = new Date().getTime()

      const suscriptionsInProgress = suscriptionsExists.filter(
        (s) => s.status === SuscriptionStatus.InProgress
      )
      // verificamos que no tenga mas de 3 suscripciones pendientes en todos los planes
      if (suscriptionsInProgress && suscriptionsInProgress.length > 0) {
        const suscriptions = suscriptionsInProgress.filter(
          (s) =>
            today >= new Date(s.start).getTime() &&
            today <= new Date(s.expiration).getTime()
        )
        if (suscriptions && suscriptions.length >= 3) {
          throw CustomError.badRequest(
            'No puedes tener mas de 3 suscripciones pendientes'
          )
        }
      }

      const planSuscribed = suscriptionsExists.filter(
        (s) =>
          s.gid === gymId &&
          s.pid === planId &&
          (s.status === SuscriptionStatus.Approved ||
            s.status === SuscriptionStatus.InProgress)
      )
      // Verificamos si existen suscripcion aprovada en esta fecha
      if (planSuscribed && planSuscribed.length > 0) {
        const suscriptions = planSuscribed.filter(
          (s) =>
            today >= new Date(s.start).getTime() &&
            today <= new Date(s.expiration).getTime()
        )
        if (suscriptions) {
          throw CustomError.badRequest('Ya estas suscripto a este plan')
        }
      }
      return false
    } else {
      return true
    }
  }

  /**
   * ICorlli: 1-9-2022 ✅ \
   * Apurba la suscripcion
   * @param id id de suscripcion
   * @param gymId id delgimnasio
   * @returns Suscripcion aprobada
   */
  async chargeSuscription(id: string, gymId: string): Promise<ISuscription> {
    // Validamos los datos
    this.validateId(id)
    this.validateGid(gymId)
    // Buscamos la suscripcion
    let found = await this.S.filterOne({
      $and: [{ uuid: id }, { gid: gymId }]
    })
    // Validamos la existencia de la sucricpion
    found = this.validateExistence(found!)
    // Validamos la propiedad
    if (found.gid !== gymId) {
      throw CustomError.forbidden('No puedes cobrar esta suscripcion')
    }
    // Validamos las condiciones para cobrar
    if (found.status !== SuscriptionStatus.InProgress) {
      throw CustomError.badRequest('Esta suscripcion no puede ser cobrada')
    }
    // Aprobamos la suscripcion
    found.status = SuscriptionStatus.Approved
    // Guardamos en base de datos
    await this.S.save(found)
    return found
  }

  /**
   * ICorlli: 1-9-2022 ✅ \
   * Cancela la suscripcion del usuario
   * @param id id de suscripcion
   * @param userId id del usuario
   * @returns Suscripcion cancelada
   */
  async cancelSuscription(id: string, userId: string): Promise<ISuscription> {
    // Validamos los datos
    this.validateId(id)
    this.validateUid(userId)
    // Buscamos la suscripcion
    let found = await this.S.filterOne({
      $and: [{ uuid: id }, { uid: userId }]
    })
    // Validamos la existencia de la sucricpion
    found = this.validateExistence(found!)
    // Validamos la propiedad
    if (found.uid !== userId) {
      throw CustomError.forbidden('No puedes cancelar esta suscripcion')
    }
    // Validamos las condiciones para cambiar el estado
    if (found.status !== SuscriptionStatus.InProgress) {
      throw CustomError.badRequest('Esta suscripcion no puede ser cancelada')
    }
    // Cancelamos la suscripcion
    found.status = SuscriptionStatus.Canceled
    // Guardamos en base de datos
    await this.S.save(found)
    return found
  }

  /**
   * ICorlli: 2-9-2022 ✅ \
   * Busca las suscripciones del usuario a partir de parametros. Por defecto trae todas.
   * @param userId id del usuario
   * @param status estado de suscripcion
   * @param sort ordenamiento
   * @param type tipo de pago
   * @param date fecha a filtrar
   * @returns Suscripciones
   */
  async userSuscriptions(
    userId: string,
    status?: string,
    sort?: string,
    type?: string,
    date?: string
  ): Promise<ISuscription[] | null> {
    // validamos datos
    this.validateUid(userId)
    if (status) {
      status = this.validateStatus(status)
    }
    if (type) {
      type = this.validatePaymentType(type)
    }
    if (date) {
      date = this.validateDate(date)
    }

    // buscamos si existe suscripcion
    const suscriptionExists = await this.S.filterMany(
      {
        $and: [
          { uid: userId },
          status ? { status } : {},
          type ? { paymentType: type } : {}
        ]
      },
      [
        {
          path: 'pid',
          select: 'name'
        },
        {
          path: 'gid',
          select: ['account.username']
        }
      ],
      sort ?? 'suscriptionNr'
    )

    return suscriptionExists
  }

  /**
   * ICorlli: 6-9-2022 ✅ \
   * Busca las suscripciones del gimnasio a partir de parametros. Por defecto trae todas.
   * @param gymId id del gimnasio
   * @param status estado de suscripcion
   * @param sort ordenamiento
   * @param type tipo de pago
   * @param date fecha a filtrar
   * @returns Suscripciones
   */
  async gymSuscriptions(
    gymId: string,
    status?: string,
    sort?: string,
    type?: string,
    date?: string
  ): Promise<ISuscription[] | null> {
    // validamos datos
    this.validateGid(gymId)
    if (status) {
      status = this.validateStatus(status)
    }
    if (type) {
      type = this.validatePaymentType(type)
    }
    if (date) {
      date = this.validateDate(date)
    }

    // buscamos si existe suscripcion
    const suscriptionExists = await this.S.filterMany(
      {
        $and: [
          { gid: gymId },
          status ? { status } : {},
          type ? { paymentType: type } : {}
        ]
      },
      [
        {
          path: 'pid',
          select: 'name'
        },
        {
          path: 'uid',
          select: ['account.username']
        }
      ],
      sort ?? 'suscriptionNr'
    )

    return suscriptionExists
  }

  /**
   * ICorlli: 6-9-2022 ✅ \
   * Obtiene los suscriptores de un gimnasio
   * @param gymId id del gimnasio
   * @returns Suscripciones con usuarios
   */
  async gymSuscribers(gymId: string): Promise<ISuscription[] | null> {
    this.validateGid(gymId)
    // Buscamos suscriptores
    const suscribers = await this.S.filterMany(
      {
        gid: gymId,
        status: SuscriptionStatus.Approved
      },
      [{ path: 'uid', select: 'account.username' }],
      'suscriptionNr'
    )
    return suscribers
  }

  async planSuscribers(
    gymId: string,
    planId: string
  ): Promise<ISuscription[] | null> {
    this.validateGid(gymId)
    this.validatePid(planId)
    // Buscamos suscriptores
    const suscribers = await this.S.filterMany(
      {
        gid: gymId,
        pid: planId,
        status: SuscriptionStatus.Approved
      },
      [
        {
          path: 'uid',
          select: 'account.username'
        }
      ],
      'suscriptionNr'
    )
    return suscribers
  }

  /*
  ////////////////////////////////////////
  VALIDACIONES
  ////////////////////////////////////////
  */

  private validateExistence(suscription: ISuscription): ISuscription {
    // Arrojamos error si no recibimos plan
    if (!suscription) {
      throw CustomError.notFound('Suscripcion inexistente')
    }
    return suscription
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

  private validateDate(date: string) {
    if (!date) {
      throw CustomError.internalError('Fecha requerida')
    }
    if (typeof date !== 'string') {
      throw CustomError.internalError('Formato de fecha invalido')
    }
    const isValid = DateRegExp.test(date)

    if (!isValid) {
      throw CustomError.badRequest(`${date} no es valido`)
    }
    return date
  }

  private validateStatus(status: string) {
    if (!status) {
      throw CustomError.internalError('Estado requerido')
    }
    if (typeof status !== 'string') {
      throw CustomError.internalError('Formato de estado invalido')
    }

    status = status.toLocaleLowerCase().trim()

    // Convertimos los estados en array
    const useStatus = [
      SuscriptionStatus.Approved,
      SuscriptionStatus.Canceled,
      SuscriptionStatus.Deleted,
      SuscriptionStatus.Expired,
      SuscriptionStatus.InProgress
    ]
    // Verificamos que el estado enviado exista dentro del array
    const response = useStatus.find((st) => st === status)
    // Si el estado no existe, arrojamos un error
    if (!response) {
      throw CustomError.badRequest('Estado invalido')
    }
    return status
  }

  private validatePaymentType(paymentType: string) {
    if (!paymentType) {
      throw CustomError.badRequest('Tipo de pago requerido')
    }
    if (typeof paymentType !== 'string') {
      throw CustomError.internalError('Formato de tipo de pago invalido')
    }

    paymentType = paymentType.toLocaleLowerCase().trim()

    // Convertimos los estados en array
    const usePayment = [PaymentType.Cash, PaymentType.MercadoPago]
    // Verificamos que el estado enviado exista dentro del array
    const response = usePayment.find((type) => type === paymentType)
    // Si el estado no existe, arrojamos un error
    if (!response) {
      throw CustomError.badRequest('Tipo de pago invalido')
    }
    return paymentType
  }

  private validatePaymentTotal(paymentTotal: number) {
    // Arrojar error si no es enviado
    if (!paymentTotal) {
      throw CustomError.badRequest('Precio requerido')
    }
    if (typeof paymentTotal !== 'number') {
      throw CustomError.internalError('Formato de id invalido')
    }
    const isValid = PriceRegExp.test(paymentTotal.toString())

    if (!isValid) {
      throw CustomError.badRequest(`${paymentTotal} no es valido`)
    }
    return paymentTotal
  }

  private validateGid(gid: string) {
    // Arrojar error si no recibimos id
    if (!gid) {
      throw CustomError.internalError('Id de gimnasio requerido')
    }
    if (typeof gid !== 'string') {
      throw CustomError.internalError('Formato de id del gimnasio invalido')
    }
  }

  private validateUid(uid: string) {
    // Arrojar error si no recibimos id
    if (!uid) {
      throw CustomError.internalError('Id del usuario requerido')
    }
    if (typeof uid !== 'string') {
      throw CustomError.internalError('Formato de id del usuario invalido')
    }
  }

  private validatePid(pid: string) {
    // Arrojar error si no recibimos id
    if (!pid) {
      throw CustomError.internalError('Id de plan requerido')
    }
    if (typeof pid !== 'string') {
      throw CustomError.internalError('Formato de id del plan invalido')
    }
  }
}
export default Suscription
