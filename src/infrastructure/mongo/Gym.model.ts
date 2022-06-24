import UserModel from './User.model'
import { Schema } from 'mongoose'
import Gym from '../../domain/entity/Gym'
import { UserRoles } from '../../config/config'

const gymModel = new Schema<Gym>({
  name: { type: String, default: '' },
  trainings: [{ type: String }],
  description: { type: String, default: '' },
  profileImage: { type: String, default: '' },
  direction: {
    country: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    street: { type: String, default: '' },
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
