import { Schema, model } from 'mongoose'

const emrgencyModel = new Schema(
  {
    _id: {
      type: String,
      required: [true, 'Id requerido']
    },
    emergencyOf: {
      type: String,
      ref: 'Person',
      required: [true, 'Id Usuario requerido']
    },
    name: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
      require: [true, 'Nombre requerido']
    },
    surname: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
      require: [true, 'Apellido requerido']
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} no es un valor valido'
      },
      trim: true,
      lowercase: true,
      require: [true, 'Genero requerido']
    },
    relation: {
      type: String,
      trim: true,
      lowercase: true,
      require: [true, 'Relacion requerida'],
      enum: {
        values: [
          'mother',
          'father',
          'grandmother',
          'grandfather',
          'aunt',
          'uncle',
          'brother',
          'sister',
          'uncle',
          'wife',
          'husband'
        ],
        message: '{VALUE} no es un valor valido'
      }
    },
    areaCode: { type: Number, default: 0, trim: true },
    phoneNumber: { type: Number, default: 0, trim: true },
    timestamps: {
      created: { type: Number, trim: true, default: new Date().getTime() },
      updated: { type: Number, trim: true, default: new Date().getTime() }
    }
  },
  { _id: false }
)
emrgencyModel
  .virtual('uuid')
  .get(function () {
    return this._id
  })
  .set(function (uuid: string) {
    this._id = uuid
  })

export default model('Emergency', emrgencyModel)
