import Session from '../entity/Session'

interface SessionRepository {
  createNew: (session: Session) => Promise<Session>
  findById: (uid: string) => Promise<Session | null>
}
export default SessionRepository
