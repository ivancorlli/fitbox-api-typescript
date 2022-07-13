import { Schema, model } from 'mongoose'
import Session from '../../../domain/entity/Session'

const sessionModel = new Schema<Session>(
  {
    _id: {
      type: String
    },
    uid: {
      type: String,
      ref: 'User'
    }
  },
  {
    _id: false,
    timestamps: true
  }
)
export default model('Session', sessionModel)
