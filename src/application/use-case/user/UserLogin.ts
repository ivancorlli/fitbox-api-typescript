import { UserStatus } from '../../../domain/object-value/UserStatus'
import HashRepository from '../../../domain/repository/HashRepository'
import UserRepository from '../../../domain/repository/UserRepository'
import CustomError from '../../../domain/service/ErrorService'

class UserLogin {
  private readonly _UserRepository: UserRepository
  private readonly _HashRepository: HashRepository
  constructor(userRepository: UserRepository, hashRepository: HashRepository) {
    this._UserRepository = userRepository
    this._HashRepository = hashRepository
  }

  // *Este metodo se utiliza para Logear al usuario dentro del sistema
  async start(email: string, password: string) {
    try {
      // Buscamos el usuario por su email
      const userFound = await this._UserRepository.findByEmail(email)
      // Si no esta verificado no le permitimos ingresar
      let error = new CustomError('Tu cuenta no esta verificada')
      if (!userFound?.verified) throw error.badRequest()
      // Si existe el usuairo comparamos contrasenia con el hash guardado
      error = new CustomError('Tu cuenta esta suspendida')
      if (userFound?.status === UserStatus.Suspended) throw error.badRequest()
      const hashCompared = await this._HashRepository.compareHash(
        password,
        userFound!.password!
      )
      // Si las contraseñas no coinciden se arroja un error
      error = new CustomError('La contraseña es incorrecta')
      if (!hashCompared) throw error.badRequest()

      // Retornamos el usuario encontrado
      userFound!.password = undefined
      return userFound
    } catch (err) {
      if (err) throw err
    }
  }
}
export default UserLogin
