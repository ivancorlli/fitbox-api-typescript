import IUser from '../../domain/IPerson'
import UserRepository from '../../domain/UserRpository'
import UserSchema from '../schema/PersonSchema'

class DbPerson implements UserRepository<IUser> {
  private readonly _User = UserSchema

  // Guardar en base de datos
  async save(User: unknown): Promise<IUser> {
    // @ts-ignore
    const UserSaved: IUser = await User.save()
    return UserSaved
  }

  // Crear nuevo
  async create(User: IUser): Promise<IUser> {
    const newUser = new this._User(User)
    const UserSaved = await newUser.save()
    // @ts-ignore
    return UserSaved
  }

  // Actualizar uno por su id
  async updateById(
    id: string,
    update: IUser | object,
    opts?: object
  ): Promise<IUser | null> {
    const UserUpdated = await this._User.findByIdAndUpdate(id, update, opts)
    // @ts-ignore
    return UserUpdated
  }

  // Obtener uno por su id
  async findById(
    id: string,
    populate?: any,
    sort?: any
  ): Promise<IUser | null> {
    const UserFound = await this._User
      .findById(id)
      .populate(populate)
      .sort(sort)
    // @ts-ignore
    return UserFound
  }

  // Obtener todos
  async findAll(populate?: any, sort?: any): Promise<IUser[] | null> {
    const Users = await this._User.find().populate(populate).sort(sort)
    // @ts-ignore
    return Users as IUser[]
  }

  // Obtener uno por parametros
  async filterOne(
    filter: object,
    populate?: any,
    sort?: any
  ): Promise<IUser | null> {
    const UserFound = await this._User
      .findOne(filter)
      .populate(populate)
      .sort(sort)
    // @ts-ignore
    return UserFound
  }

  // Obtener varios por parametros
  async filterMany(
    filter: object,
    populate?: any,
    sort?: any,
    where?: any
  ): Promise<IUser[] | null> {
    const Users = await this._User
      .find(filter)
      .populate(populate)
      .sort(sort)
      .where(where)
    // @ts-ignore
    return Users as IUser[]
  }

  // Eliminar uno por su id
  async deleteById(id: string): Promise<IUser | null> {
    const UserDeleted = await this._User.findByIdAndDelete(id)
    // @ts-ignore
    return UserDeleted
  }
}

export default DbPerson
