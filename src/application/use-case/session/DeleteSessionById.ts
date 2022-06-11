import SessionRepository from '../../../domain/repository/SessionRepository'
import CustomError from '../../../domain/service/ErrorService'

class DeleteSessionById {
  private readonly _SessionRepository: SessionRepository
  constructor(sessionRepository: SessionRepository) {
    this._SessionRepository = sessionRepository
  }

  async start(sid: string) {
    try {
      // Eliminamos la session por su id
      const sessionDeleted = await this._SessionRepository.deleteById(sid)
      // si no hay sesion, arrojamos error
      const error = new CustomError('Error al eliminar sesion')
      if (!sessionDeleted) throw error.internalError()
      return sessionDeleted
    } catch (err) {
      if (err) throw err
    }
  }
}

export default DeleteSessionById
