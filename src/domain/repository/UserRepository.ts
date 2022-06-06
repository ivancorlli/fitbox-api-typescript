import User from '../entity/User'
interface UserRepository {
  save: (user: User) => Promise<User>
  findByEmail: (email: string) => Promise<User | null>
  findById: (email: string) => Promise<User | null>
}

export default UserRepository
