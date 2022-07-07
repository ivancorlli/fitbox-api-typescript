import { Schema, model } from 'mongoose'
import Plan from '../../domain/entity/Plan'
import { PlanStatus } from '../../domain/object-value/PlanStatus'
import { WeekDays } from '../../domain/object-value/WeekDays'

const planModel: Schema = new Schema<Plan>(
  {
    _id: {
      type: String
    },
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Nombre requerido'],
      maxlength: 35,
      minlength: 3
    },
    description: {
      type: String,
      trim: true,
      maxlength: 250
    },
    price: {
      type: Number,
      trim: true,
      required: [true, 'Precio requerido']
    },
    weekDays: [
      {
        type: String,
        enum: {
          values: [
            WeekDays.Monday,
            WeekDays.Tuesday,
            WeekDays.Wednesday,
            WeekDays.Thursday,
            WeekDays.Friday,
            WeekDays.Saturday,
            WeekDays.Sunday
          ],
          message: '{VALUE} no es un valor valido'
        },
        required: [true, 'Dias de la semana requeridos']
      }
    ],
    status: {
      type: String,
      enum: {
        values: [PlanStatus.Enable, PlanStatus.Disable],
        message: '{VALUE} no es un valor valido'
      },
      default: PlanStatus.Enable
    },
    gymOwner: {
      type: String,
      ref: 'User',
      required: [true, 'Gimansio requerido']
    }
  },

  {
    _id: false,
    timestamps: true
  }
)

export default model<Plan>('Plan', planModel)
