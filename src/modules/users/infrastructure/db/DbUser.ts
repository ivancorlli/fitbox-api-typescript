import IUserBase from '../../domain/IUser'
import UserRepository from '../../domain/UserRpository'
import UserBaseSchema from '../schema/UserSchema'

class DbUser implements UserRepository<IUserBase> {
  protected readonly _User = UserBaseSchema
  // Guardar en base de datos
  async save(User: unknown): Promise<IUserBase> {
    // @ts-ignore
    const UserSaved = await User.save()
    return UserSaved
  }

  // Crear nuevo
  async create(User: IUserBase): Promise<IUserBase> {
    const newUser = new this._User(User)
    const UserSaved = await newUser.save()
    // @ts-ignore
    return UserSaved
  }

  // Actualizar uno por su id
  async updateById(
    id: string,
    update: IUserBase | object,
    opts?: object
  ): Promise<IUserBase | null> {
    const UserUpdated = await this._User.findByIdAndUpdate(id, update, opts)
    // @ts-ignore
    return UserUpdated
  }

  // Obtener uno por su id
  async findById(
    id: string,
    populate?: any,
    sort?: any
  ): Promise<IUserBase | null> {
    const UserFound = await this._User
      .findById(id)
      .populate(populate)
      .sort(sort)
    // @ts-ignore
    return UserFound
  }

  // Obtener todos
  async findAll(populate?: any, sort?: any): Promise<IUserBase[] | null> {
    const Users = await this._User.find().populate(populate).sort(sort)

    // @ts-ignore
    return Users as IUserBase[]
  }

  // Obtener uno por parametros
  async filterOne(
    filter: object,
    populate?: any,
    sort?: any
  ): Promise<IUserBase | null> {
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
  ): Promise<IUserBase[] | null> {
    const Users = await this._User
      .find(filter)
      .populate(populate)
      .sort(sort)
      .where(where)
    // @ts-ignore
    return Users as IUserBase[]
  }

  // Eliminar uno por su id
  async deleteById(id: string): Promise<IUserBase | null> {
    const UserDeleted = await this._User.findByIdAndDelete(id)
    // @ts-ignore
    return UserDeleted
  }
}

export default DbUser
