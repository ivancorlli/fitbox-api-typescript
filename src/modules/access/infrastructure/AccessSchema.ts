import { Schema, model } from 'mongoose'

const accessModel = new Schema(
  {
    _id: {
      type: String,
      required: [true, 'Id requerido']
    },
    uid: {
      type: String,
      ref: 'Person'
    },
    gid: {
      type: String,
      ref: 'Gym',
      required: [true, 'Id Gimnasio requerido']
    },
    role: {
      type: String,
      required: [true, 'Nombre de rol de accesso requerido'],
      enum: {
        values: ['NATIVE@SUPERADMIN', 'NATIVE@ADMINISTRATOR', 'NATIVE@TRAINER']
      }
    },
    timestamps: {
      created: { type: Number, trim: true, default: new Date().getTime() },
      updated: { type: Number, trim: true, default: new Date().getTime() }
    }
  },
  { _id: false }
)
accessModel
  .virtual('uuid')
  .get(function () {
    return this._id
  })
  .set(function (uuid: string) {
    this._id = uuid
  })

export default model('Access', accessModel)
