import UserModel from './User.model'
import { Schema } from 'mongoose'
import Gym from '../../../domain/entity/Gym'
import { UserRoles } from '../../../config/config'

const gymModel = new Schema<Gym>({
  profile: {
    name: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
      maxlength: 15,
      minlength: 3
    },
    trainings: [
      { type: String, trim: true, lowercase: true, maxlength: 10, minlength: 3 }
    ],
    description: {
      type: String,
      default: null,
      trim: true,
      maxlength: 250
    }
  },
  direction: {
    country: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
      maxlength: 12,
      minlength: 3
    },
    city: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
      maxlength: 12,
      minlength: 3
    },
    state: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
      maxlength: 12,
      minlength: 3
    },
    street: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
      maxlength: 12,
      minlength: 3
    },
    streetNumber: { type: Number, default: 0, trim: true },
    postalCode: { type: Number, default: 0, trim: true }
  },
  phone: {
    areaCode: { type: Number, default: 0, trim: true },
    phoneNumber: { type: Number, default: 0, trim: true }
  },
  configuration: {
    turnsCapacity: { type: Number, default: 10, trim: true },
    requireMedicalRecord: { type: Boolean, default: false, trim: true }
  }
})

const key: string = UserRoles.gym!
const gym = UserModel.discriminator(key, gymModel)
export default gym
