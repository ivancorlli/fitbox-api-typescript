import Customer from '../../../domain/entity/Customer'
import Gym from '../../../domain/entity/Gym'
import User from '../../../domain/entity/User'
import { UserStatus } from '../../../domain/object-value/UserStatus'
import UserRepository from '../../../domain/repository/UserRepository'
import ValidateUser from '../../validation/ValidateUser'

class UpdateStatus {
  private readonly U: UserRepository
  constructor(userRepository: UserRepository) {
    this.U = userRepository
  }

  async start(id: string, status: UserStatus): Promise<User | Gym | Customer> {
    // Validamos los datos
    id = ValidateUser.validateId(id)
    status = ValidateUser.validateStatus(status)
    // Actualizamos el estado del usuario
    let userUpdated = await this.U.updateById(id, {
      status
    })
    // Arrojamos error si no encontramos usuario
    userUpdated = ValidateUser.validateUserExistence(userUpdated!)
    return userUpdated
  }
}
export default UpdateStatus
