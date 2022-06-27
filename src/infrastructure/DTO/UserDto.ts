import Gym from '../../domain/entity/Gym'
import User from '../../domain/entity/User'

class UserDto {
  static singleUser(user: User | Gym) {
    return {
      id: user._id,
      email: user.email,
      status: user.status,
      verified: user.verified,
      role: user.role
    }
  }

  static multiplesUser(users: User[]) {
    const userModified = users.map((user) => this.singleUser(user))
    return userModified
  }
}
export default UserDto
