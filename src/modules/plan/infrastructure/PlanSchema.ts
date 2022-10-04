import { Schema, model } from 'mongoose'

const planModel: Schema = new Schema(
  {
    _id: {
      type: String,
      required: [true, 'Id requerido']
    },
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Nombre requerido']
    },
    description: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      trim: true,
      required: [true, 'Precio requerido']
    },
    days: {
      type: Number,
      required: [true, 'Cantidad de dias requeridos']
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'inactive', 'deleted'],
        message: '{VALUE} no es un valor valido'
      },
      default: 'active'
    },
    type: {
      type: String,
      required: [true, 'Tipo de plan requerido'],
      enum: {
        values: [
          'annual',
          'biannual',
          'quarterly',
          'bimonthly',
          'monthly',
          'fortnight',
          'weekly',
          'unique',
          'free'
        ],
        message: '{VALUE} no es un valor valido'
      }
    },
    gid: {
      type: String,
      ref: 'Gym',
      required: [true, 'Gimansio requerido']
    },
    timestamps: {
      created: { type: Number, trim: true, default: new Date().getTime() },
      updated: { type: Number, trim: true, default: new Date().getTime() }
    }
  },

  {
    _id: false
  }
)

planModel
  .virtual('uuid')
  .get(function () {
    return this._id
  })
  .set(function (uuid: string) {
    this._id = uuid
  })

export default model('Plan', planModel)
