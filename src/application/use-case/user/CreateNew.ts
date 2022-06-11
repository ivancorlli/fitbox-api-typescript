import User from '../../../domain/entity/User'
import UserRepository from '../../../domain/repository/UserRepository'
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

  // Enviamos el cuerpo del usuario a guardar
  async start(body: User) {
    try {
      // Buscamos en DDBB si el email ya se aha utilizado en otro usuario
      await this._UserRepository.emailExists(body.email)
      // Hasheamos contrasenia para guardar en DDBB
      const hashPassword = await this._HashRepository.createHash(body.password!)
      body.password = hashPassword
      // Guardamos el nuevo usuario en DDBB
      const newGym: User = await this._UserRepository.save(body)
      // Retornamos el nuevo usuario guardado
      return newGym
    } catch (err) {
      if (err) throw err
    }
  }
}

export default CreateNew
