import UserModel from './User.model'
import { Schema } from 'mongoose'
import Gym from '../../domain/entity/Gym'
import { UserRoles } from '../../config/config'

const gymModel = new Schema<Gym>({
  profile: {
    name: { type: String, default: null },
    trainings: [{ type: String }],
    description: { type: String, default: null },
    profileImage: { type: String, default: null }
  },
  direction: {
    country: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    street: { type: String, default: null },
    streetNumber: { type: Number, default: 0 },
    postalCode: { type: Number, default: 0 }
  },
  phone: {
    areaCode: { type: Number, default: 0 },
    phoneNumber: { type: Number, default: 0 }
  },
  configuration: {
    turnsCapacity: { type: Number, default: 0 },
    requireMedicalRecord: { type: Boolean, default: false }
  }
})

const key: string = UserRoles.gym!
const gym = UserModel.discriminator(key, gymModel)
export default gym
