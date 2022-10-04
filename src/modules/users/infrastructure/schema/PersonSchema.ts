import { Schema } from 'mongoose'
import UserBaseSchema from './UserSchema'

const userModel = new Schema(
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
        default: '',
        trim: true,
        lowercase: true
      },
      surname: {
        type: String,
        default: '',
        trim: true,
        lowercase: true
      },
      gender: {
        type: String,
        default: '',
        enum: {
          values: ['male', 'female', null, ''],
          message: '{VALUE} no es un valor valido'
        },
        trim: true,
        lowercase: true
      },
      birth: { type: String, default: '', trim: true },
      biography: { type: String, default: '', trim: true }
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
      postalCode: { type: String, default: null, trim: true }
    },
    contact: {
      areaCode: { type: Number, default: null, trim: true },
      phoneNumber: { type: Number, default: null, trim: true }
    },
    medical: {
      allergies: {
        type: String,
        default: '',
        trim: true,
        lowercase: true
      },
      disabilities: {
        type: String,
        default: '',
        trim: true,
        lowercase: true
      },
      aptitude: {
        type: String,
        default: '',
        trim: true,
        lowercase: true
      }
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
  { _id: false, discriminatorKey: 'type' }
)

export default UserBaseSchema.discriminator('Person', userModel)
