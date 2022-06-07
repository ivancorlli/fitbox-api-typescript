import Session from '../../../domain/entity/Session'
import SessionRepository from '../../../domain/repository/SessionRepository'

class CreateNew {
  private readonly _SessionRepository: SessionRepository
  constructor(sessionRepository: SessionRepository) {
    this._SessionRepository = sessionRepository
  }

  async start(session: Session) {
    try {
      // creamos una nueva session
      const newSession = await this._SessionRepository.createNew(session)

      return newSession
    } catch (err) {
      if (err) throw err
    }
  }
}
export default CreateNew
