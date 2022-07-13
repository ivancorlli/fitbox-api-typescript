import Costumer from '../../domain/entity/Customer'
import Gym from '../../domain/entity/Gym'
import User from '../../domain/entity/User'
import CustomerRepository from '../../domain/repository/CustomerRepository'
import costumer from '../utils/mongo/Customer.model'

import DbUser from './DbUser'

/* eslint-disable */
class DbCustomer extends DbUser implements CustomerRepository {
  /* eslint-enable */
  private readonly _Costumer = costumer

  // Guardar en base de datos
  async save(Costumer: unknown): Promise<Costumer> {
    // @ts-ignore
    const CostumerSaved: Costumer = await Costumer.save()
    return CostumerSaved
  }

  // Crear nuevo
  async create(Costumer: User | Gym | Costumer): Promise<Costumer> {
    const newCostumer = new this._Costumer(Costumer)
    const CostumerSaved = newCostumer.save()
    return CostumerSaved
  }

  // Actualizar uno por su id
  async updateById(
    id: string,
    update: Costumer | object,
    opts?: object
  ): Promise<Costumer | null> {
    const CostumerUpdated = await this._Costumer.findByIdAndUpdate(
      id,
      update,
      opts
    )
    return CostumerUpdated
  }

  // Actualizar uno por parametros
  async update(
    filter: object,
    update: Costumer | object,
    opts?: object
  ): Promise<Costumer | null> {
    const CostumerUpdated = await this._Costumer.updateOne(filter, update, opts)
    return CostumerUpdated
  }

  // Actualizar muchos por parametros
  async updateMany(
    filter: object,
    update: Costumer | object,
    opts?: object
  ): Promise<Array<Costumer> | null> {
    const CostumerUpdated = await this._Costumer.updateMany(
      filter,
      update,
      opts
    )
    return CostumerUpdated
  }

  // Obtener uno por su id
  async getById(id: string, populate?: string): Promise<Costumer | null> {
    let CostumerFound = await this._Costumer.findById(id)
    if (populate) {
      CostumerFound = await this._Costumer.findById(id).populate(populate)
    }
    return CostumerFound
  }

  // Obtener todos
  async getAll(populate?: string): Promise<Array<Costumer> | null> {
    let CostumersFound = await this._Costumer.find({})
    if (populate) {
      CostumersFound = await this._Costumer.find({}).populate(populate)
    }
    return CostumersFound
  }

  // Obtener uno por parametros
  async filterOne(filter: object, populate?: string): Promise<Costumer | null> {
    let CostumerFound = await this._Costumer.findOne(filter)
    if (populate) {
      CostumerFound = await this._Costumer.findOne(filter).populate(populate)
    }
    return CostumerFound
  }

  // Obtener varios por parametros
  async filterMany(
    filter: object,
    populate?: string
  ): Promise<Array<Costumer> | null> {
    let CostumersFound = await this._Costumer.find(filter)
    if (populate) {
      CostumersFound = await this._Costumer.find(filter).populate(populate)
    }
    return CostumersFound
  }

  // Eliminar uno por su id
  async deleteById(id: string): Promise<Costumer | null> {
    const CostumerDeleted = await this._Costumer.findByIdAndDelete(id)
    return CostumerDeleted
  }

  // Eliminar uno por parametros
  async delete(filter: object, opts?: object): Promise<Costumer | null> {
    const CostumerDeleted = await this._Costumer.deleteOne(filter, opts)
    return CostumerDeleted
  }

  // Eliminar muchos por parametros
  async deleteMany(
    filter: object,
    opts?: object
  ): Promise<Array<Costumer> | null> {
    const CostumersDeleted = await this._Costumer.deleteMany(filter, opts)
    return CostumersDeleted
  }
}

export default DbCustomer
