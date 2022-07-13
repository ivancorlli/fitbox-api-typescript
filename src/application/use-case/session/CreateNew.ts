import Session from '../../../domain/entity/Session'
import SessionRepository from '../../../domain/repository/SessionRepository'

class CreateNew {
  private readonly S: SessionRepository
  constructor(sessionRepository: SessionRepository) {
    this.S = sessionRepository
  }

  async start(session: Session): Promise<Session> {
    // creamos una nueva session
    const newSession = await this.S.create(session)

    return newSession
  }
}
export default CreateNew
