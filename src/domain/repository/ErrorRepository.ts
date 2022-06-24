import Error from '../entity/Error'

interface ErrorRepository {
  badRequest: (message: string) => Error
  forbidden: (message: string) => Error
  unauthorized: (message: string) => Error
  internalError: (message: string) => Error
}
export default ErrorRepository
