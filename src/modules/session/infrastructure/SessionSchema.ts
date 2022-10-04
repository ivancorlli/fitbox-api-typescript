import { Schema, model } from 'mongoose'

const sessionModel = new Schema(
  {
    _id: {
      type: String,
      required: [true, 'Id requerido']
    },
    uid: {
      type: String,
      ref: 'Person'
    },
    type: {
      type: String,
      required: [true, 'Tipo de session requerida'],
      enum: {
        values: ['FITMANAGER@PERSON-SESSION', 'FITMANAGER@GYM-SESSION'],
        message: '{value} no es nu nombre de session valido'
      }
    },
    gid: {
      type: String,
      ref: 'Gym'
    },
    access: [
      {
        type: String,
        ref: 'Access'
      }
    ],
    timestamps: {
      created: { type: Number, trim: true, default: new Date().getTime() },
      updated: { type: Number, trim: true, default: new Date().getTime() }
    }
  },
  { _id: false }
)
sessionModel
  .virtual('uuid')
  .get(function () {
    return this._id
  })
  .set(function (uuid: string) {
    this._id = uuid
  })

export default model('Session', sessionModel)
