import Suscription from '../../domain/entity/Suscription'
import CustomError from '../../domain/exception/CustomError'
import ErrorResponse from '../../domain/object-value/ErrorResponse'
import PaymentType from '../../domain/object-value/PaymentType'
import SuscriptionStatus from '../../domain/object-value/SuscriptionStatus'

class ValidateSuscription {
  static validateId(Id: string) {
    if (!Id) {
      throw CustomError.internalError('Id requerido')
    }
    if (typeof Id !== 'string') {
      throw CustomError.internalError('Formato de id invalido')
    }
  }

  static validateNumber(Number: number) {
    if (!Number) {
      throw CustomError.internalError('Numero de suscripcion requerida')
    }
    if (typeof Number !== 'number') {
      throw CustomError.internalError('Formato de suscripcion invalido')
    }
  }

  static validateInitDate(initDate: number) {
    if (!initDate) {
      throw CustomError.internalError('Fecha de inicio requerida')
    }
  }

  static validateFinishDate(finishDate: number) {
    if (!finishDate) {
      throw CustomError.internalError('Fecha de finalizacion requerida')
    }
  }

  static validateStatus(status: SuscriptionStatus): SuscriptionStatus {
    if (!status) {
      throw CustomError.internalError('Estado requerido')
    }
    const useStatus = [
      SuscriptionStatus.Approved,
      SuscriptionStatus.Canceled,
      SuscriptionStatus.Expired,
      SuscriptionStatus.InProgress
    ]
    const response = useStatus.map((el) => el === status)
    if (!response) {
      throw CustomError.badRequest('Formato de estado invalido')
    }
    return status
  }

  static validatenPaymentType(paymentType: PaymentType): PaymentType {
    if (!paymentType) {
      throw CustomError.badRequest('Tipo de pago requerido')
    }
    const usePaymentTypes = [PaymentType.Cash, PaymentType.MercadoPago]
    const response = usePaymentTypes.filter((el) => el === paymentType)
    if (!response) {
      throw CustomError.badRequest('Formato invalido en tipo de pago')
    }
    return paymentType
  }

  static validatePaymentTotal(paymentTotal: number) {
    if (!paymentTotal) {
      throw CustomError.internalError('Pago total requerido')
    }
    if (typeof paymentTotal !== 'number') {
      throw CustomError.internalError('Formato invalido en pago total')
    }
  }

  static validateGym(Id: string) {
    if (!Id) {
      throw CustomError.internalError('Gym requerido')
    }
    if (typeof Id !== 'string') {
      throw CustomError.internalError('Formato de id invalido')
    }
  }

  static validateCustomer(Id: string) {
    if (!Id) {
      throw CustomError.internalError('Cliente requerido')
    }
    if (typeof Id !== 'string') {
      throw CustomError.internalError('Formato de id invalido')
    }
  }

  static validatePlan(Id: string) {
    if (!Id) {
      throw CustomError.internalError('Plan requerido')
    }
    if (typeof Id !== 'string') {
      throw CustomError.internalError('Formato de id invalido')
    }
  }

  static validateExistence(Suscription: Suscription): Suscription {
    // Arrojamos error si no recibimos plan
    if (!Suscription) {
      throw CustomError.badRequest(ErrorResponse.SuscriptionNotFound)
    }
    return Suscription
  }
}
export default ValidateSuscription
