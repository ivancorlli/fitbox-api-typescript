import Client from '../../../domain/entity/Customer'
import Gym from '../../../domain/entity/Gym'
import User from '../../../domain/entity/User'
import UserRepository from '../../../domain/repository/UserRepository'
import UserModel from '../User.model'

class DbUserRepository implements UserRepository {
  private readonly _User = UserModel
  // Guardar en base de datos
  async save(user: unknown): Promise<User | Gym | Client> {
    // @ts-ignore
    const userSaved: User = await user.save()
    return userSaved
  }

  // Crear nuevo
  async create(user: User | Gym | Client): Promise<User | Gym | Client> {
    const newUser = new this._User(user)
    const userSaved = newUser.save()
    return userSaved
  }

  // Actualizar uno por su id
  async updateById(
    id: string,
    update: User | object,
    opts?: object
  ): Promise<User | Gym | Client | null> {
    const userUpdated = await this._User.findByIdAndUpdate(id, update, opts)
    return userUpdated
  }

  // Actualizar uno por parametros
  async update(
    filter: object,
    update: User | object,
    opts?: object
  ): Promise<User | Gym | Client | null> {
    const userUpdated = await this._User.updateOne(filter, update, opts)
    // @ts-ignore
    return userUpdated
  }

  // Actualizar muchos por parametros
  async updateMany(
    filter: object,
    update: User | object,
    opts?: object
  ): Promise<Array<User | Gym | Client> | null> {
    const userUpdated = await this._User.updateMany(filter, update, opts)
    // @ts-ignore
    return userUpdated
  }

  // Obtener uno por su id
  async getById(
    id: string,
    populate?: string
  ): Promise<User | Gym | Client | null> {
    let userFound = await this._User.findById(id)
    if (populate) {
      userFound = await this._User.findById(id).populate(populate)
    }
    return userFound
  }

  // Obtener todos
  async getAll(populate?: string): Promise<Array<User | Gym | Client> | null> {
    let usersFound = await this._User.find({})
    if (populate) {
      usersFound = await this._User.find({}).populate(populate)
    }
    return usersFound
  }

  // Obtener uno por parametros
  async filterOne(
    filter: object,
    populate?: string
  ): Promise<User | Gym | Client | null> {
    let userFound = await this._User.findOne(filter)
    if (populate) {
      userFound = await this._User.findOne(filter).populate(populate)
    }
    return userFound
  }

  // Obtener varios por parametros
  async filterMany(
    filter: object,
    populate?: string
  ): Promise<Array<User | Gym | Client> | null> {
    let usersFound = await this._User.find(filter)
    if (populate) {
      usersFound = await this._User.find(filter).populate(populate)
    }
    return usersFound
  }

  // Eliminar uno por su id
  async deleteById(id: string): Promise<User | Gym | Client | null> {
    const userDeleted = await this._User.findByIdAndDelete(id)
    return userDeleted
  }

  // Eliminar uno por parametros
  async delete(
    filter: object,
    opts?: object
  ): Promise<User | Gym | Client | null> {
    const userDeleted = await this._User.deleteOne(filter, opts)
    // @ts-ignore
    return userDeleted
  }

  // Eliminar muchos por parametros
  async deleteMany(
    filter: object,
    opts?: object
  ): Promise<Array<User | Gym | Client> | null> {
    const usersDeleted = await this._User.deleteMany(filter, opts)
    // @ts-ignore
    return usersDeleted
  }
}

export default DbUserRepository
