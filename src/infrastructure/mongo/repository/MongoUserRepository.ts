import User from '../../../domain/entity/User'
import UserModel from '../User.model'

class MongoUserRepository {
  private readonly _User = UserModel
  async findByEmail(email: string): Promise<User | null> {
    const userFound: User | null = await this._User.findOne({ email })
    return userFound
  }

  async findById(userId: String): Promise<User | null> {
    const userFound = await this._User.findById(userId)
    return userFound
  }
}

export default MongoUserRepository
