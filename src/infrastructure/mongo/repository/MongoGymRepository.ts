import User from '../../../domain/entity/User'
import GymRepository from '../../../domain/repository/GymRepository'
import gym from '../Gym.model'
import MongoUserRepository from './MongoUserRepository'

class MongoGymRepository extends MongoUserRepository implements GymRepository {
  private readonly _Gym = gym
  async save(body: User): Promise<User> {
    const newGym = new this._Gym(body)
    const gymSaved = await newGym.save()
    return gymSaved
  }

  async updateById(userId: string, update: object): Promise<User | null> {
    const userUpdated: User | null = await this._Gym.findByIdAndUpdate(
      userId,
      update
    )
    return userUpdated
  }
}

export default MongoGymRepository
