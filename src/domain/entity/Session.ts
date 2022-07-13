import User from './User'

interface Session {
  _id: string
  uid: string | User
}
export default Session
