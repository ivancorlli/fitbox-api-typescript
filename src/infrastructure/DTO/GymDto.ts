import Gym from '../../domain/entity/Gym'

class GymDto {
  static singlePrivateUser(user: Gym) {
    if (!user) return {}
    return {
      id: user._id,
      email: user.email,
      status: user.status,
      verified: user.verified,
      role: user.role,
      profile: {
        name: user.profile.name,
        trainings: user.profile.trainings,
        description: user.profile.description,
        profileImage: user.profile.profileImage
      },
      direction: {
        country: user.direction.country,
        city: user.direction.city,
        state: user.direction.state,
        street: user.direction.street,
        streetNumber: user.direction.streetNumber,
        postalCode: user.direction.postalCode
      },
      phone: {
        areaCode: user.phone.areaCode,
        phoneNumber: user.phone.phoneNumber
      },
      configuration: {
        turnsCapacity: user.configuration.turnsCapacity,
        requireMedicalRecord: user.configuration.requireMedicalRecord
      }
    }
  }

  static singlePublicUser(user: Gym) {
    if (!user) return {}
    return {
      id: user._id,
      profile: {
        name: user.profile.name,
        trainings: user.profile.trainings,
        description: user.profile.description,
        profileImage: user.profile.profileImage
      },
      direction: {
        country: user.direction.country,
        city: user.direction.city,
        state: user.direction.state,
        street: user.direction.street,
        streetNumber: user.direction.streetNumber,
        postalCode: user.direction.postalCode
      },
      phone: {
        areaCode: user.phone.areaCode,
        phoneNumber: user.phone.phoneNumber
      }
    }
  }

  static multiplesUser(users: Gym[]) {
    if (!users || users.length < 1) return []
    const userModified = users.map((user) => this.singlePublicUser(user))
    return userModified
  }
}
export default GymDto
