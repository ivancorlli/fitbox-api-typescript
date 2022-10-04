import AccessRepo from '../domain/AccessRepository'
import IAccess from '../domain/IAccess'
import AccessSchema from './AccessSchema'

class DbAccess implements AccessRepo {
  private readonly _Access = AccessSchema

  // Guardar en base de datos
  async save(Role: unknown): Promise<IAccess> {
    // @ts-ignore
    const RoleSaved: IAccess = await Role.save()
    return RoleSaved
  }

  // Crear nuevo
  async create(Role: IAccess): Promise<IAccess> {
    const newRole = new this._Access(Role)
    const RoleSaved = newRole.save()
    // @ts-ignore
    return RoleSaved
  }

  // Actualizar uno por su id
  async updateById(
    id: string,
    update: IAccess | object,
    opts?: object
  ): Promise<IAccess | null> {
    const RoleUpdated = await this._Access.findByIdAndUpdate(id, update, opts)
    // @ts-ignore
    return RoleUpdated
  }

  // Obtener uno por su id
  async findById(id: string, populate?: string): Promise<IAccess | null> {
    let RoleFound = await this._Access.findById(id)
    if (populate) {
      RoleFound = await this._Access.findById(id).populate(populate)
    }
    // @ts-ignore
    return RoleFound
  }

  // Obtener todos
  async findAll(populate?: string): Promise<Array<IAccess> | null> {
    let RolesFound = await this._Access.find({})
    if (populate) {
      RolesFound = await this._Access.find({}).populate(populate)
    }
    // @ts-ignore
    return RolesFound
  }

  // Obtener uno por parametros
  async filterOne(filter: object, populate?: string): Promise<IAccess | null> {
    let RoleFound = await this._Access.findOne(filter)
    if (populate) {
      RoleFound = await this._Access.findOne(filter).populate(populate)
    }
    // @ts-ignore
    return RoleFound
  }

  // Obtener varios por parametros
  async filterMany(
    filter: object,
    populate?: string
  ): Promise<Array<IAccess> | null> {
    let RolessFound = await this._Access.find(filter)
    if (populate) {
      RolessFound = await this._Access.find(filter).populate(populate)
    }
    // @ts-ignore
    return RolessFound
  }

  // Eliminar uno por su id
  async deleteById(id: string): Promise<IAccess | null> {
    const RoleDeleted = await this._Access.findByIdAndDelete(id)
    // @ts-ignore
    return RoleDeleted
  }
}
export default DbAccess
