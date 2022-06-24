import User from '../../../domain/entity/User'
import UserRepository from '../../../domain/repository/UserRepository'
import UserModel from '../User.model'

class MongoUserRepository implements UserRepository {
  private readonly _User = UserModel
  async save(user: User): Promise<User> {
    return user
  }

  // *Metodo para buscar al usuario por us email
  async getByEmail(email: string): Promise<User | null> {
    // Buscamos al usuario por su email en DDBB
    const userFound: User | null = await this._User.findOne({ email })
    return userFound
  }

  // *Metodo para buscar todos los ususarios
  async getAll(): Promise<Array<User>> {
    // Buscamos todos los usuarios
    const userFound = await this._User.find()
    return userFound
  }

  // * Metodo para encontrar al usario por su id
  async getById(userId: string): Promise<User | null> {
    // Buscamos el id del usuario
    const userFound: User | null = await this._User.findById(userId)
    return userFound
  }

  // * Metedo para filtrar usuario por parametros
  async filterOne(filter: object): Promise<User | null> {
    // buscamos el usuario por parametros
    console.log(filter)
    const userFound: User | null = await this._User.findOne(filter)
    return userFound
  }

  async updateById(userId: string, update: object): Promise<User | null> {
    const userUpdated: User | null = await this._User.findByIdAndUpdate(
      userId,
      update
    )
    return userUpdated
  }

  async deleteById(userId: string): Promise<void> {
    await this._User.findByIdAndUpdate(userId)
  }
}

export default MongoUserRepository
