import CustomError from '../../../domain/exception/CustomError'
import { UserStatus } from '../../../domain/object-value/UserStatus'
import HashRepository from '../../../domain/repository/HashRepository'
import UserRepository from '../../../domain/repository/UserRepository'

class Login {
  private readonly _UserRepository: UserRepository
  private readonly _HashRepository: HashRepository
  constructor(userRepository: UserRepository, hashRepository: HashRepository) {
    this._UserRepository = userRepository
    this._HashRepository = hashRepository
  }

  // *Este metodo se utiliza para Logear al usuario dentro del sistema
  async start(email: string, password: string) {
    // Verificamos que envia email
    if (!email) {
      throw CustomError('Es necesario enviar un email').badRequest()
    }
    // Verificamos que envia constrasenia
    if (!password) {
      throw CustomError('Es necesario enviar una contraseña').badRequest()
    }
    // Sanitizamos email y passowrd
    email = email.toLowerCase().trim()
    password = password.trim()
    // Buscamos el usuario por su email
    const userFound = await this._UserRepository.getByEmail(email)
    // Si no esta verificado no le permitimos ingresar
    if (!userFound) {
      throw CustomError('Usuario inexistente').badRequest()
    }
    if (!userFound!.verified) {
      throw CustomError('Tu cuenta no esta verificada').forbidden()
    }
    // Si existe el usuairo comparamos contrasenia con el hash guardado
    if (userFound?.status === UserStatus.Suspended) {
      throw CustomError('Tu cuenta esta suspendida').forbidden()
    }
    const hashCompared = await this._HashRepository.compareHash(
      password,
      userFound!.password!
    )
    // Si las contraseñas no coinciden se arroja un error
    if (!hashCompared) {
      throw CustomError('La contraseña es incorrecta').badRequest()
    }
    // Retornamos el usuario encontrado
    userFound!.password = undefined
    return userFound
  }
}
export default Login
