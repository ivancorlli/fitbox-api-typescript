import Error from '../entity/Error'

class CustomError {
  private static code: number
  private static message: string

  static badRequest(message: string): Error {
    CustomError.code = 400
    CustomError.message = message
    return {
      code: CustomError.code,
      message: CustomError.message
    }
  }

  static unauthorized(message: string = 'No estas autorizado'): Error {
    CustomError.code = 401
    CustomError.message = message
    return {
      code: CustomError.code,
      message: CustomError.message
    }
  }

  static forbidden(message: string = 'No puedes realizar esta accion'): Error {
    CustomError.code = 403
    CustomError.message = message
    return {
      code: CustomError.code,
      message: CustomError.message
    }
  }

  static internalError(message: string = 'Se produjo un error'): Error {
    CustomError.code = 500
    CustomError.message = message
    return {
      code: CustomError.code,
      message: CustomError.message
    }
  }
}

export default CustomError
