import User from '../../../domain/entity/User'
import CustomError from '../../../domain/service/ErrorService'
import UserModel from '../User.model'

class MongoUserRepository {
  private readonly _User = UserModel
  async save(user: User): Promise<User> {
    return user
  }

  // *Metodo para buscar al usuario por us email
  async findByEmail(email: string): Promise<User | never> {
    // Buscamos al usuario por su email en DDBB
    const userFound: User | null = await this._User.findOne({ email })
    // Si el correo no existe arrojamos un error
    const error = new CustomError('No existe un usuario con este email')
    if (!userFound) throw error.badRequest()
    // Si el correo esta registrado en base de datos, devovlemos el usuario encontrado
    return userFound
  }

  // * Metodo para encontrar al usario por su id
  async findById(userId: string): Promise<User | never> {
    // Buscamos el id del usuario
    const userFound: User | null = await this._User.findById(userId)
    // Si no existe un usario arrojamos un error
    const error = new CustomError('Usuario Inexistente')
    if (!userFound) throw error.badRequest()
    return userFound
  }

  //* Metodo utilizado para comprobar la existencia de un email
  async emailExists(email: string): Promise<null | never> {
    // Buscamos al usuario por su email en DDBB
    const userFound: User | null = await this._User.findOne({ email })
    // Si el correo existe arrojamos un error
    const error = new CustomError('Este email ya ha sido registrado')
    if (userFound) throw error.badRequest()
    // Si no esta registrado devolvemos null
    return userFound
  }

  async updateById(userId: string, update: object): Promise<User | null> {
    const userUpdated: User | null = await this._User.findByIdAndUpdate(
      userId,
      update
    )
    return userUpdated
  }
}

export default MongoUserRepository
