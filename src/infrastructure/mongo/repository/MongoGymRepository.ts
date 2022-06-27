import Gym from '../../../domain/entity/Gym'
import User from '../../../domain/entity/User'
import GymRepository from '../../../domain/repository/GymRepository'
import gym from '../Gym.model'
import MongoUserRepository from './MongoUserRepository'

class MongoGymRepository extends MongoUserRepository implements GymRepository {
  private readonly _Gym = gym
  async save(body: User): Promise<User | Gym> {
    const newGym = new this._Gym(body)
    const gymSaved = await newGym.save()
    return gymSaved
  }

  async updateById(
    userId: string,
    update: object,
    opts?: object
  ): Promise<Gym | null> {
    const userUpdated: Gym | null = await this._Gym.findByIdAndUpdate(
      userId,
      update,
      opts
    )
    return userUpdated
  }

  // *Metodo para buscar todos los ususarios
  async getAll(): Promise<Array<Gym>> {
    // Buscamos todos los usuarios
    const userFound = await this._Gym.find()
    return userFound
  }

  // * Metodo para encontrar al usario por su id
  async getById(userId: string): Promise<Gym | null> {
    // Buscamos el id del usuario
    const userFound: Gym | null = await this._Gym.findById(userId)
    return userFound
  }

  // * Metedo para filtrar usuario por parametros
  async filterOne(filter: object): Promise<Gym | null> {
    // buscamos el usuario por parametros
    const userFound: Gym | null = await this._Gym.findOne(filter)
    return userFound
  }

  // * Metedo para filtrar usuarios por parametros
  async filterMany(filter: object): Promise<Array<Gym> | null> {
    // buscamos el usuario por parametros
    const usersFound = await this._Gym.find(filter)
    return usersFound
  }

  async deleteById(userId: string): Promise<void> {
    await this._Gym.findByIdAndUpdate(userId)
  }
}

export default MongoGymRepository
