import Gym from '../../domain/entity/Gym'

class GymDto {
  static singlePrivateGym(gym: Gym) {
    if (!gym) return {}
    return {
      id: gym._id,
      email: gym.email,
      status: gym.status,
      verified: gym.verified,
      role: gym.role,
      profile: {
        name: gym.profile.name,
        trainings: gym.profile.trainings,
        description: gym.profile.description,
        profileImage: gym.profile.profileImage
      },
      direction: {
        country: gym.direction.country,
        city: gym.direction.city,
        state: gym.direction.state,
        street: gym.direction.street,
        streetNumber: gym.direction.streetNumber,
        postalCode: gym.direction.postalCode
      },
      phone: {
        areaCode: gym.phone.areaCode,
        phoneNumber: gym.phone.phoneNumber
      },
      configuration: {
        turnsCapacity: gym.configuration.turnsCapacity,
        requireMedicalRecord: gym.configuration.requireMedicalRecord
      }
    }
  }

  static singlePublicGym(gym: Gym) {
    if (!gym) return {}
    return {
      id: gym._id,
      profile: {
        name: gym.profile.name,
        trainings: gym.profile.trainings,
        description: gym.profile.description,
        profileImage: gym.profile.profileImage
      },
      direction: {
        country: gym.direction.country,
        city: gym.direction.city,
        state: gym.direction.state,
        street: gym.direction.street,
        streetNumber: gym.direction.streetNumber,
        postalCode: gym.direction.postalCode
      },
      phone: {
        areaCode: gym.phone.areaCode,
        phoneNumber: gym.phone.phoneNumber
      }
    }
  }

  static multiplesGym(gyms: Gym[]) {
    if (!gyms || gyms.length < 1) return []
    const gymModified = gyms.map((gym) => this.singlePublicGym(gym))
    return gymModified
  }
}
export default GymDto
