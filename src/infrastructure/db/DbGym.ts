import Client from '../../domain/entity/Customer'
import Gym from '../../domain/entity/Gym'
import User from '../../domain/entity/User'
import GymRepository from '../../domain/repository/GymRepository'
import gym from '../utils/mongo/Gym.model'
import DbUserRepository from './DbUser'

class DbGym extends DbUserRepository implements GymRepository {
  private readonly _Gym = gym

  // Guardar en base de datos
  async save(gym: unknown): Promise<Gym> {
    // @ts-ignore
    const GymSaved: Gym = await gym.save()
    return GymSaved
  }

  // Crear nuevo
  async create(Gym: User | Gym | Client): Promise<Gym> {
    const newGym = new this._Gym(Gym)
    const GymSaved = newGym.save()
    return GymSaved
  }

  // Actualizar uno por su id
  async updateById(
    id: string,
    update: Gym | object,
    opts?: object
  ): Promise<Gym | null> {
    const GymUpdated = await this._Gym.findByIdAndUpdate(id, update, opts)
    return GymUpdated
  }

  // Actualizar uno por parametros
  async update(
    filter: object,
    update: Gym | object,
    opts?: object
  ): Promise<Gym | null> {
    const GymUpdated = await this._Gym.updateOne(filter, update, opts)
    return GymUpdated as Gym
  }

  // Actualizar muchos por parametros
  async updateMany(
    filter: object,
    update: Gym | object,
    opts?: object
  ): Promise<Array<Gym> | null> {
    const GymUpdated = await this._Gym.updateMany(filter, update, opts)
    return GymUpdated as Gym[]
  }

  // Obtener uno por su id
  async getById(id: string, populate?: string): Promise<Gym | null> {
    let GymFound = await this._Gym.findById(id)
    if (populate) {
      GymFound = await this._Gym.findById(id).populate(populate)
    }
    return GymFound
  }

  // Obtener todos
  async getAll(populate?: string): Promise<Array<Gym> | null> {
    let GymsFound = await this._Gym.find({})
    if (populate) {
      GymsFound = await this._Gym.find({}).populate(populate)
    }
    return GymsFound
  }

  // Obtener uno por parametros
  async filterOne(filter: object, populate?: string): Promise<Gym | null> {
    let GymFound = await this._Gym.findOne(filter)
    if (populate) {
      GymFound = await this._Gym.findOne(filter).populate(populate)
    }
    return GymFound
  }

  // Obtener varios por parametros
  async filterMany(
    filter: object,
    populate?: string
  ): Promise<Array<Gym> | null> {
    let GymsFound = await this._Gym.find(filter)
    if (populate) {
      GymsFound = await this._Gym.find(filter).populate(populate)
    }
    return GymsFound
  }

  // Eliminar uno por su id
  async deleteById(id: string): Promise<Gym | null> {
    const GymDeleted = await this._Gym.findByIdAndDelete(id)
    return GymDeleted
  }

  // Eliminar uno por parametros
  async delete(filter: object, opts?: object): Promise<Gym | null> {
    const GymDeleted = await this._Gym.deleteOne(filter, opts)
    return GymDeleted
  }

  // Eliminar muchos por parametros
  async deleteMany(filter: object, opts?: object): Promise<Array<Gym> | null> {
    const GymsDeleted = await this._Gym.deleteMany(filter, opts)
    return GymsDeleted
  }
}

export default DbGym
