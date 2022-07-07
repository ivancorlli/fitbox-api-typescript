import { Schema } from 'mongoose'
import Customer from '../../domain/entity/Customer'
import UserModel from './User.model'
import { UserRoles } from '../../config/config'
import { Gender } from '../../domain/object-value/Gender'

const customerModel = new Schema<Customer>({
  profile: {
    name: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
      maxlength: 15,
      minlength: 3
    },
    surname: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
      maxlength: 15,
      minlength: 3
    },
    gender: {
      type: String,
      enum: {
        values: [Gender.Male, Gender.Female],
        message: '{VALUE} no es un valor valido'
      },
      trim: true,
      lowercase: true
    },
    birth: { type: Date, default: null, trim: true }
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
    postalCode: { type: Number, default: 0, trim: true }
  },
  phone: {
    areaCode: { type: Number, default: 0, trim: true },
    phoneNumber: { type: Number, default: 0, trim: true }
  },
  gymRegistered: {
    date: {
      type: Date
    },
    gymId: {
      type: String,
      ref: 'User'
    }
  }
})

const key: string = UserRoles.customer!
const customer = UserModel.discriminator(key, customerModel)
export default customer
