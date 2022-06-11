import Session from '../../../domain/entity/Session'
import SessionRepository from '../../../domain/repository/SessionRepository'
import SessionModel from '../Session.model'

class MongoSessionRepository implements SessionRepository {
  private readonly _Session = SessionModel
  async createNew(body: Session): Promise<Session> {
    const newSession = new this._Session(body)
    const sessionSaved: Session = await newSession.save()
    return sessionSaved
  }

  async findById(id: string): Promise<Session | null> {
    const sessionFound: Session | null = await this._Session.findById(id)
    return sessionFound
  }
}
export default MongoSessionRepository
