import IEmergency from '../domain/IEmergency'
import EmergencyRepository from '../domain/EmergencyRepository'
import EmergencySchema from './EmergencySchema'

class DbEmergency implements EmergencyRepository {
  private readonly _Emeregency = EmergencySchema

  // Guardar en base de datos
  async save(Emeregency: unknown): Promise<IEmergency> {
    // @ts-ignore
    const EmeregencySaved: IEmergency = await Emeregency.save()
    return EmeregencySaved
  }

  // Crear nuevo
  async create(Emeregency: IEmergency): Promise<IEmergency> {
    const newEmeregency = new this._Emeregency(Emeregency)
    const EmeregencySaved = newEmeregency.save()
    // @ts-ignore
    return EmeregencySaved
  }

  // Actualizar uno por su id
  async updateById(
    id: string,
    update: IEmergency | object,
    opts?: object
  ): Promise<IEmergency | null> {
    const EmeregencyUpdated = await this._Emeregency.findByIdAndUpdate(
      id,
      update,
      opts
    )
    // @ts-ignore
    return EmeregencyUpdated
  }

  // Obtener uno por su id
  async findById(id: string, populate?: string): Promise<IEmergency | null> {
    let EmeregencyFound = await this._Emeregency.findById(id)
    if (populate) {
      EmeregencyFound = await this._Emeregency.findById(id).populate(populate)
    }
    // @ts-ignore
    return EmeregencyFound
  }

  // Obtener todos
  async findAll(populate?: string): Promise<Array<IEmergency> | null> {
    let EmeregencysFound = await this._Emeregency.find({})
    if (populate) {
      EmeregencysFound = await this._Emeregency.find({}).populate(populate)
    }
    // @ts-ignore
    return EmeregencysFound
  }

  // Obtener uno por parametros
  async filterOne(
    filter: object,
    populate?: string
  ): Promise<IEmergency | null> {
    let EmeregencyFound = await this._Emeregency.findOne(filter)
    if (populate) {
      EmeregencyFound = await this._Emeregency
        .findOne(filter)
        .populate(populate)
    }
    // @ts-ignore
    return EmeregencyFound
  }

  // Obtener varios por parametros
  async filterMany(
    filter: object,
    populate?: string
  ): Promise<Array<IEmergency> | null> {
    let EmeregencyssFound = await this._Emeregency.find(filter)
    if (populate) {
      EmeregencyssFound = await this._Emeregency.find(filter).populate(populate)
    }
    // @ts-ignore
    return EmeregencyssFound
  }

  // Eliminar uno por su id
  async deleteById(id: string): Promise<IEmergency | null> {
    const EmeregencyDeleted = await this._Emeregency.findByIdAndDelete(id)
    // @ts-ignore
    return EmeregencyDeleted
  }
}
export default DbEmergency
