import User from '../../../domain/entity/User'
import UserRepository from '../../../domain/repository/UserRepository'
import CustomError from '../../../domain/service/ErrorService'
import HashRepository from '../../../domain/repository/HashRepository'

// Creamos una clase basada en el caso de uso
class CreateNew {
  // Utilizamos interfaz del usuairio
  private readonly _UserRepository: UserRepository
  // Utilizamos interfaz del creador de hash
  private readonly _HashRepository: HashRepository
  constructor(userRepository: UserRepository, hashRepository: HashRepository) {
    this._UserRepository = userRepository
    this._HashRepository = hashRepository
  }

  // Metodo para inciar el caso de uso
  // Enviamos el cuerpo del usuario a guardar
  async start(body: User) {
    // Buscamos en DDBB si el email ya se aha utilizado en otro usuario
    try {
      const userExists = await this._UserRepository.findByEmail(body.email)
      const Error = new CustomError('Ya existe un usuario con este email')
      // Si existe un usuario con el email enviado devolvemos un error
      if (userExists) throw Error.badRequest()

      // Hasheamos contrasenia para guardar en DDBB
      const hashPassword = await this._HashRepository.createHash(body.password!)
      body.password = hashPassword
      // Guardamos el nuevo usuario en DDBB
      const newGym: User = await this._UserRepository.save(body)
      // Retornamos el nuevo usuario guardado
      return newGym
    } catch (err) {
      // Si existe un error lo retornamos
      if (err) throw err
    }
  }
}

export default CreateNew
