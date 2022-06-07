import User from '../../../domain/entity/User'
import UserModel from '../User.model'

class MongoUserRepository {
  private readonly _User = UserModel
  async save(user: User): Promise<User> {
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const userFound: User | null = await this._User.findOne({ email })
    return userFound
  }

  async findById(userId: string): Promise<User | null> {
    const userFound: User | null = await this._User.findById(userId)
    return userFound
  }

  async updateById(userId: string, update: object): Promise<User | null> {
    const userUpdated: User | null = await this._User.findByIdAndUpdate(
      userId,
      update
    )
    return userUpdated
  }
}

export default MongoUserRepository
