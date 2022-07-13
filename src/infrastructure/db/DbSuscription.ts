import Suscription from '../../domain/entity/Suscription'
import SuscriptionRepository from '../../domain/repository/SuscriptionRepository'
import SuscriptionModel from '../utils/mongo/Suscription.model'

class DbSuscription implements SuscriptionRepository {
  private readonly _Suscription = SuscriptionModel

  // Guardar en base de datos
  async save(Suscription: unknown): Promise<Suscription> {
    // @ts-ignore
    const SuscriptionSaved: Suscription = await Suscription.save()
    return SuscriptionSaved
  }

  // Crear nuevo
  async create(Suscription: Suscription): Promise<Suscription> {
    const newSuscription = new this._Suscription(Suscription)
    const SuscriptionSaved = newSuscription.save()
    return SuscriptionSaved
  }

  // Actualizar uno por su id
  async updateById(
    id: string,
    update: Suscription | object,
    opts?: object
  ): Promise<Suscription | null> {
    const SuscriptionUpdated = await this._Suscription.findByIdAndUpdate(
      id,
      update,
      opts
    )
    return SuscriptionUpdated
  }

  // Actualizar uno por parametros
  async update(
    filter: object,
    update: Suscription | object,
    opts?: object
  ): Promise<Suscription | null> {
    const SuscriptionUpdated = await this._Suscription.updateOne(
      filter,
      update,
      opts
    )
    return SuscriptionUpdated as Suscription
  }

  // Actualizar muchos por parametros
  async updateMany(
    filter: object,
    update: Suscription | object,
    opts?: object
  ): Promise<Array<Suscription> | null> {
    const SuscriptionUpdated = await this._Suscription.updateMany(
      filter,
      update,
      opts
    )
    return SuscriptionUpdated as Suscription[]
  }

  // Obtener uno por su id
  async getById(id: string, populate?: string): Promise<Suscription | null> {
    let SuscriptionFound = await this._Suscription.findById(id)
    if (populate) {
      SuscriptionFound = await this._Suscription.findById(id).populate(populate)
    }
    return SuscriptionFound
  }

  // Obtener todos
  async getAll(populate?: string): Promise<Array<Suscription> | null> {
    let SuscriptionsFound = await this._Suscription.find({})
    if (populate) {
      SuscriptionsFound = await this._Suscription.find({}).populate(populate)
    }
    return SuscriptionsFound
  }

  // Obtener uno por parametros
  async filterOne(
    filter: object,
    populate?: string | Array<string>
  ): Promise<Suscription | null> {
    let SuscriptionFound = await this._Suscription.findOne(filter)
    if (populate) {
      SuscriptionFound = await this._Suscription
        .findOne(filter)
        .populate(populate)
    }
    return SuscriptionFound
  }

  // Obtener varios por parametros
  async filterMany(
    filter: object,
    populate?: string | Array<string>
  ): Promise<Array<Suscription> | null> {
    let SuscriptionsFound = await this._Suscription.find(filter)
    if (populate) {
      SuscriptionsFound = await this._Suscription
        .find(filter)
        .populate(populate)
    }
    return SuscriptionsFound
  }

  // Eliminar uno por su id
  async deleteById(id: string): Promise<Suscription | null> {
    const SuscriptionDeleted = await this._Suscription.findByIdAndDelete(id)
    return SuscriptionDeleted
  }

  // Eliminar uno por parametros
  async delete(filter: object, opts?: object): Promise<Suscription | null> {
    const SuscriptionDeleted = await this._Suscription.deleteOne(filter, opts)
    return SuscriptionDeleted
  }

  // Eliminar muchos por parametros
  async deleteMany(
    filter: object,
    opts?: object
  ): Promise<Array<Suscription> | null> {
    const SuscriptionsDeleted = await this._Suscription.deleteMany(filter, opts)
    return SuscriptionsDeleted
  }
}
export default DbSuscription
