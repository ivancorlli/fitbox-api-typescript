import User from '../entity/User'
interface UserRepository {
  save: (user: User) => Promise<User>
  findByEmail: (email: string) => Promise<User>
  findById: (id: string) => Promise<User>
  emailExists: (email: string) => Promise<null>
  updateById: (id: string, update: object) => Promise<User | null>
}

export default UserRepository
