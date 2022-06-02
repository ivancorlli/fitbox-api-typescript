import User from '../entity/User'
interface UserRepository {
  save: (user: User) => Promise<User>
}

export default UserRepository
