import Error from '../entity/Error'
import ErrorRepository from '../repository/ErrorRepository'

class CustomError implements ErrorRepository {
  /* eslint-disable */
  private static _instance: CustomError
  /* eslint-enable */
  private code: number
  private message: string
  private constructor(message: string) {
    this.message = message
    this.code = 0
  }

  static setInstance(message: string) {
    if (!CustomError._instance) {
      CustomError._instance = new CustomError(message)
    }
    return CustomError._instance
  }

  badRequest(): Error {
    this.code = 400
    return {
      code: this.code,
      message: this.message
    }
  }

  unauthorized(): Error {
    this.code = 401
    return {
      code: this.code,
      message: this.message
    }
  }

  forbidden(): Error {
    this.code = 403
    return {
      code: this.code,
      message: this.message
    }
  }

  internalError(): Error {
    this.code = 500
    return {
      code: this.code,
      message: this.message
    }
  }
}

export default CustomError.setInstance
