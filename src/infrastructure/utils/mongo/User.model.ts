import { Schema, model } from 'mongoose'
import User from '../../../domain/entity/User'
import UserStatus from '../../../domain/object-value/UserStatus'

const userModel = new Schema<User>(
  {
    _id: {
      type: String
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, 'Email requerido'],
      maxlength: [30, 'El email no puede tener mas de 30 caracteres'],
      minlength: [5, 'El email debe tener un minimo de 5 caracteres']
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Contraseña requerida'],
      minlength: 6
    },
    status: {
      type: String,
      enum: {
        values: [UserStatus.Active, UserStatus.Inactive, UserStatus.Suspended],
        message: '{VALUE} no es un valor valido'
      },
      default: UserStatus.Active
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