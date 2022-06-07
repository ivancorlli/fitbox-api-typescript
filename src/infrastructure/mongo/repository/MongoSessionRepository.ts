import Session from '../../../domain/entity/Session'
import SessionRepository from '../../../domain/repository/SessionRepository'
import SessionModel from '../Session.model'

class MongoSessionRepository implements SessionRepository {
  private readonly _Session = SessionModel
  async createNew(body: Session) {
    const newSession = new this._Session(body)
    const sessionSaved = await newSession.save()
    return sessionSaved
  }

  async findById(uid: string) {
    const sessionFound = await this._Session.findById(uid)
    return sessionFound
  }
}
export default MongoSessionRepository
