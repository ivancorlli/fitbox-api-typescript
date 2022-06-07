import User from '../entity/User'
interface UserRepository {
  save: (user: User) => Promise<User>
  findByEmail: (email: string) => Promise<User | null>
  findById: (id: string) => Promise<User | null>
  updateById: (id: string, update: object) => Promise<User | null>
}

export default UserRepository
