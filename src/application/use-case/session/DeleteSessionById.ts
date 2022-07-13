import CustomError from '../../../domain/exception/CustomError'
import SessionRepository from '../../../domain/repository/SessionRepository'

class DeleteSessionById {
  private readonly S: SessionRepository
  constructor(sessionRepository: SessionRepository) {
    this.S = sessionRepository
  }

  async start(sid: string) {
    // Eliminamos la session por su id
    const sessionDeleted = await this.S.deleteById(sid)
    // si no hay sesion, arrojamos error
    if (!sessionDeleted) {
      throw CustomError.internalError('Error al cerrar session')
    }
    return sessionDeleted
  }
}

export default DeleteSessionById
