import { Schema } from 'mongoose'
import UserBaseSchema from './UserSchema'

const gymModel = new Schema(
  {
    _id: {
      type: String,
      required: [true, 'Id requerido']
    },
    account: {
      email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: [true, 'Email requerido']
      },
      username: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: [true, 'Nombre de usuario requerido']
      },
      password: {
        type: String,
        trim: true,
        required: [true, 'Contraseña requerida']
      },
      status: {
        type: String,
        enum: {
          values: ['active', 'inactive', 'suspended', 'deleted'],
          message: '{VALUE} no es un valor valido'
        },
        default: 'active'
      },
      verified: {
        type: Boolean,
        default: false
      }
    },
    profile: {
      name: {
        type: String,
        default: null,
        trim: true,
        lowercase: true
      },
      trainings: [
        {
          type: String,
          trim: true,
          lowercase: true
        }
      ],
      biography: {
        type: String,
        default: null,
        trim: true
      }
    },
    direction: {
      country: {
        type: String,
        default: null,
        trim: true,
        lowercase: true
      },
      city: {
        type: String,
        default: null,
        trim: true,
        lowercase: true
      },
      state: {
        type: String,
        default: null,
        trim: true,
        lowercase: true
      },
      street: {
        type: String,
        default: null,
        trim: true,
        lowercase: true
      },
      streetNumber: { type: Number, default: null, trim: true },
      postalCode: { type: String, default: null, trim: true }
    },
    contact: {
      areaCode: { type: Number, default: null, trim: true },
      phoneNumber: { type: Number, default: null, trim: true }
    },
    images: {
      profile: {
        type: String,
        trim: true,
        default: null
      },
      frontPage: {
        type: String,
        trim: true,
        default: null
      }
    },
    timestamps: {
      created: { type: Number, trim: true, default: new Date().getTime() },
      updated: { type: Number, trim: true, default: new Date().getTime() }
    }
  },
  {
    _id: false,
    discriminatorKey: 'type'
  }
)

const GymSchema = UserBaseSchema.discriminator('Gym', gymModel)
export default GymSchema
