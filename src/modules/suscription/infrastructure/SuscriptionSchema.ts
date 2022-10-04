import { Schema, model } from 'mongoose'

const SuscriptionModel: Schema = new Schema(
  {
    _id: {
      type: String,
      required: [true, 'Id requerido']
    },
    suscriptionNr: {
      type: Number,
      required: [true, 'Numero de suscripcion requerdio'],
      default: Date.now(),
      unique: true
    },
    start: {
      type: Date,
      required: [true, 'Fecha de inicio requerida']
    },
    expiration: {
      type: Date,
      required: [true, 'Fecha de finalizacion requerida']
    },
    status: {
      type: String,
      required: [true, 'Status requerido'],
      default: 'in-progress',
      enum: {
        values: ['approved', 'in-progress', 'canceled', 'expired', 'deleted'],
        message: '{VALUE} no es un valor valido'
      }
    },
    paymentType: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Tipo de pago requerido'],
      default: 'cash',
      enum: {
        values: ['cash', 'mercado-pago'],
        message: '{VALUE} no es un valor valido'
      }
    },
    paymentTotal: {
      type: Number,
      trim: true,
      required: [true, 'Pago final requerido']
    },
    isNewSuscriber: {
      type: Boolean,
      required: [true, 'Nuevo suscriptor requerido']
    },
    uid: {
      type: String,
      ref: 'Person',
      required: [true, 'Cliente requerido']
    },
    gid: {
      type: String,
      ref: 'Gym',
      required: [true, 'Gimnasio requerido']
    },
    pid: {
      type: String,
      ref: 'Plan',
      required: [true, 'Plan requerido']
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
SuscriptionModel.virtual('uuid')
  .get(function () {
    return this._id
  })
  .set(function (uuid: string) {
    this._id = uuid
  })

export default model('Suscription', SuscriptionModel)
