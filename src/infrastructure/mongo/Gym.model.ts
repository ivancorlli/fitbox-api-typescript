import UserModel from './User.model'
import { Schema } from 'mongoose'
import Gym from '../../domain/entity/Gym'
import 'dotenv/config'

const gymModel = new Schema<Gym>({
  profile: {
    name: { type: String }
  }
})

const key: string = process.env.GYM_ROLE!
const gym = UserModel.discriminator(key, gymModel)
export default gym
