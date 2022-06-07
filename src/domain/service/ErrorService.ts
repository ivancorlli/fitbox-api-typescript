import Error from '../entity/Error'
import ErrorRepository from '../repository/ErrorRepository'

class CustomError implements ErrorRepository {
  private code: number
  private message: string
  constructor(message: string) {
    this.message = message
    this.code = 0
  }

  badRequest(): Error {
    this.code = 400
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

export default CustomError
