import UserRepository from '../../../domain/repository/UserRepository'
import ValidateUser from '../../validation/ValidateUser'

class FindUserByEmail {
  private readonly U: UserRepository
  constructor(userRepo: UserRepository) {
    this.U = userRepo
  }

  async start(userEmail: string) {
    // Validamos los datos
    userEmail = ValidateUser.validateEmail(userEmail)
    // Buscamos el usuario por su email
    let userFound = await this.U.filterOne({ email: userEmail })
    // Si no encotramos usuario arrojamos un error
    userFound = ValidateUser.validateUserExistence(userFound!)
    return userFound
  }
}
export default FindUserByEmail
