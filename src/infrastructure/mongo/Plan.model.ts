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
      required: true
    },
    description: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      trim: true,
      required: true
    },
    weekDays: [
      {
        type: String,
        enum: [
          WeekDays.Monday,
          WeekDays.Tuesday,
          WeekDays.Wednesday,
          WeekDays.Thursday,
          WeekDays.Friday,
          WeekDays.Saturday,
          WeekDays.Sunday
        ]
      }
    ],
    status: {
      type: String,
      enum: [PlanStatus.Enable, PlanStatus.Disable]
    },
    gym: {
      type: String,
      ref: 'User'
    }
  },

  {
    _id: false,
    timestamps: true
  }
)

export default model<Plan>('Plan', planModel)
