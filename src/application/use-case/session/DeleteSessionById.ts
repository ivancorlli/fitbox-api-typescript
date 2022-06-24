import CustomError from '../../../domain/exception/CustomError'
import SessionRepository from '../../../domain/repository/SessionRepository'

class DeleteSessionById {
  private readonly _SessionRepository: SessionRepository
  constructor(sessionRepository: SessionRepository) {
    this._SessionRepository = sessionRepository
  }

  async start(sid: string) {
    // Eliminamos la session por su id
    const sessionDeleted = await this._SessionRepository.deleteById(sid)
    // si no hay sesion, arrojamos error
    if (!sessionDeleted) {
      throw CustomError('Error al eliminar session').internalError()
    }
    return sessionDeleted
  }
}

export default DeleteSessionById
