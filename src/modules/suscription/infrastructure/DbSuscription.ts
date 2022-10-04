import ISuscription from '../domain/ISuscription'
import SuscriptionRepository from '../domain/SuscriptionRepository'
import SuscriptionSchema from './SuscriptionSchema'

class DbSuscription implements SuscriptionRepository {
  private readonly _Suscription = SuscriptionSchema

  // Guardar en base de datos
  async save(Suscription: unknown): Promise<ISuscription> {
    // @ts-ignore
    const SuscriptionSaved: ISuscription = await Suscription.save()
    return SuscriptionSaved
  }

  // Crear nuevo
  async create(Suscription: ISuscription): Promise<ISuscription> {
    const newSuscription = new this._Suscription(Suscription)
    const SuscriptionSaved = newSuscription.save()
    // @ts-ignore
    return SuscriptionSaved
  }

  // Actualizar uno por su id
  async updateById(
    id: string,
    update: ISuscription | object,
    opts?: object
  ): Promise<ISuscription | null> {
    const SuscriptionUpdated = await this._Suscription.findByIdAndUpdate(
      id,
      update,
      opts
    )
    // @ts-ignore
    return SuscriptionUpdated
  }

  // Obtener uno por su id
  async findById(id: string, populate?: any): Promise<ISuscription | null> {
    let SuscriptionFound = await this._Suscription.findById(id)
    if (populate) {
      SuscriptionFound = await this._Suscription.findById(id).populate(populate)
    }
    // @ts-ignore
    return SuscriptionFound
  }

  // Obtener todos
  async findAll(populate?: string): Promise<Array<ISuscription> | null> {
    let SuscriptionsFound = await this._Suscription.find({})
    if (populate) {
      SuscriptionsFound = await this._Suscription.find({}).populate(populate)
    }
    // @ts-ignore
    return SuscriptionsFound
  }

  // Obtener uno por parametros
  async filterOne(
    filter: object,
    populate?: string
  ): Promise<ISuscription | null> {
    let SuscriptionFound = await this._Suscription.findOne(filter)
    if (populate) {
      SuscriptionFound = await this._Suscription
        .findOne(filter)
        .populate(populate)
    }
    // @ts-ignore
    return SuscriptionFound
  }

  // Obtener varios por parametros
  async filterMany(
    filter: object,
    populate?: any,
    sort?: any,
    where?: object
  ): Promise<ISuscription[] | null> {
    if (where) {
      const Users = await this._Suscription
        .find(filter)
        .populate(populate)
        .sort(sort)
        .where(where)
      // @ts-ignore
      return Users as ISuscription[]
    } else {
      const Users = await this._Suscription
        .find(filter)
        .populate(populate)
        .sort(sort)
      // @ts-ignore
      return Users as ISuscription[]
    }
  }

  // Eliminar uno por su id
  async deleteById(id: string): Promise<ISuscription | null> {
    const SuscriptionDeleted = await this._Suscription.findByIdAndDelete(id)
    // @ts-ignore
    return SuscriptionDeleted
  }
}
export default DbSuscription
