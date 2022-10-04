import IGym from '../../domain/IGym'
import UserRepository from '../../domain/UserRpository'
import GymSchema from '../schema/GymSchema'

class DbGym implements UserRepository<IGym> {
  private readonly _Gym = GymSchema

  // Guardar en base de datos
  async save(Gym: unknown): Promise<IGym> {
    // @ts-ignore
    const GymSaved: IGym = await Gym.save()
    return GymSaved
  }

  // Crear nuevo
  async create(Gym: IGym): Promise<IGym> {
    const newGym = new this._Gym(Gym)
    // @ts-ignore
    const GymSaved: IGym = newGym.save()
    return GymSaved
  }

  // Actualizar uno por su id
  async updateById(
    id: string,
    update: IGym | object,
    opts?: object
  ): Promise<IGym | null> {
    const GymUpdated = await this._Gym.findByIdAndUpdate(id, update, opts)
    // @ts-ignore
    return GymUpdated
  }

  // Obtener uno por su id
  async findById(id: string, populate?: string): Promise<IGym | null> {
    let GymFound = await this._Gym.findById(id)
    if (populate) {
      GymFound = await this._Gym.findById(id).populate(populate)
    }
    // @ts-ignore
    return GymFound
  }

  // Obtener todos
  async findAll(populate?: string): Promise<Array<IGym> | null> {
    let GymsFound = await this._Gym.find({})
    if (populate) {
      GymsFound = await this._Gym.find({}).populate(populate)
    }
    // @ts-ignore
    return GymsFound
  }

  // Obtener uno por parametros
  async filterOne(filter: object, populate?: string): Promise<IGym | null> {
    let GymFound = await this._Gym.findOne(filter)
    if (populate) {
      GymFound = await this._Gym.findOne(filter).populate(populate)
    }
    // @ts-ignore
    return GymFound
  }

  // Obtener varios por parametros
  async filterMany(
    filter: object,
    populate?: string
  ): Promise<Array<IGym> | null> {
    let GymssFound = await this._Gym.find(filter)
    if (populate) {
      GymssFound = await this._Gym.find(filter).populate(populate)
    }
    // @ts-ignore
    return GymssFound
  }

  // Eliminar uno por su id
  async deleteById(id: string): Promise<IGym | null> {
    const GymDeleted = await this._Gym.findByIdAndDelete(id)
    // @ts-ignore
    return GymDeleted
  }
}
export default DbGym
