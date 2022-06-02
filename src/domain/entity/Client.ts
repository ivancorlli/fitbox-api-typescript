import User from './User'

interface Client extends User {
  role: string
  profile: {
    name: string
  }
}
export default Client
