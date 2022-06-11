import Session from '../entity/Session'

interface SessionRepository {
  createNew: (session: Session) => Promise<Session>
  findById: (id: string) => Promise<Session | null>
  deleteById: (id: string) => Promise<Session | null>
}
export default SessionRepository
