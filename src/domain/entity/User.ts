import UserStatus from '../object-value/UserStatus'

interface User {
  _id: string
  email: string
  password?: string
  status?: UserStatus
  verified?: boolean
  role?: string
}

export default User
