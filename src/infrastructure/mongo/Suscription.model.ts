import { Schema, model } from 'mongoose'
import Suscription from '../../domain/entity/Suscription'
import { PaymentType } from '../../domain/object-value/PaymentType'
import { SuscriptionStatus } from '../../domain/object-value/SuscriptionStatus'

const SuscriptionModel: Schema = new Schema<Suscription>(
  {
    _id: {
      type: String
    },
    suscriptionNumber: {
      type: Number,
      required: [true, 'Numero de suscripcion requerdio'],
      default: 0
    },
    initDate: {
      type: Date,
      required: [true, 'Fecha de inicio requerida']
    },
    finishDate: {
      type: Date,
      required: [true, 'Fecha de finalizacion requerida']
    },
    status: {
      type: String,
      required: [true, 'Status requerido'],
      default: SuscriptionStatus.InProgress,
      enum: {
        values: [
          SuscriptionStatus.Approved,
          SuscriptionStatus.Canceled,
          SuscriptionStatus.Expired,
          SuscriptionStatus.InProgress
        ],
        message: '{VALUE} no es un valor valido'
      }
    },
    paymentType: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Tipo de pago requerido'],
      enum: {
        values: [PaymentType.Cash, PaymentType.MercadoPago],
        message: '{VALUE} no es un valor valido'
      }
    },
    paymentTotal: {
      type: Number,
      trim: true,
      required: [true, 'Pago final requerido']
    },
    customer: {
      type: String,
      ref: 'User',
      required: [true, 'Cliente requerido'],
      unique: true
    },
    gym: {
      type: String,
      ref: 'User',
      required: [true, 'Gimnasio requerido']
    },
    plan: {
      type: String,
      ref: 'Plan',
      required: [true, 'Plan requerido']
    }
  },

  {
    _id: false,
    timestamps: true
  }
)

export default model<Suscription>('Suscription', SuscriptionModel)
