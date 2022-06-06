interface User {
  _id: string
  email: string
  password: string
  status?: string
  verified?: boolean
}

export default User
