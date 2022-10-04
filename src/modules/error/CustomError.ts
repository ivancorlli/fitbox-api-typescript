import { IError } from '../../shared/utils/CommonTypes'

class CustomError {
  private static code: number
  private static message: string

  static badRequest(message: string): IError {
    CustomError.code = 400
    CustomError.message = message
    return {
      code: CustomError.code,
      message: CustomError.message
    }
  }

  static unauthorized(message: string = 'No estas autorizado'): IError {
    CustomError.code = 401
    CustomError.message = message
    return {
      code: CustomError.code,
      message: CustomError.message
    }
  }

  static forbidden(message: string = 'No puedes realizar esta accion'): IError {
    CustomError.code = 403
    CustomError.message = message
    return {
      code: CustomError.code,
      message: CustomError.message
    }
  }

  static notFound(message: string = 'Recurso inexsistente'): IError {
    CustomError.code = 404
    CustomError.message = message
    return {
      code: CustomError.code,
      message: CustomError.message
    }
  }

  static internalError(message: string = 'Se produjo un error'): IError {
    CustomError.code = 500
    CustomError.message = message
    return {
      code: CustomError.code,
      message: CustomError.message
    }
  }

  static gatewayError(
    message: string = 'Se produjo un error al procesar solicitud'
  ): IError {
    CustomError.code = 502
    CustomError.message = message
    return {
      code: CustomError.code,
      message: CustomError.message
    }
  }
}

export default CustomError
