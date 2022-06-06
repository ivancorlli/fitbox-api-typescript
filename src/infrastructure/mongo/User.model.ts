import { Schema, model } from 'mongoose'
import User from '../../domain/entity/User'

const userModel = new Schema<User>(
  {
    _id: {
      type: 'String'
    },
    email: {
      type: 'String',
      unique: true,
      trim: true,
      lowercase: true,
      required: true
    },
    password: {
      type: 'String',
      trim: true,
      required: true
    },
    status: {
      type: 'String',
      enum: ['active', 'suspended', 'inactive'],
      default: 'active'
    },
    verified: {
      type: Boolean,
      default: false
    }
  },

  {
    _id: false,
    timestamps: true,
    discriminatorKey: 'role'
  }
)

export default model('User', userModel)
