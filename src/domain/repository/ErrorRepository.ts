import Error from '../entity/Error'

interface ErrorRepository {
  badRequest: () => Error
  internalError: () => Error
}
export default ErrorRepository
