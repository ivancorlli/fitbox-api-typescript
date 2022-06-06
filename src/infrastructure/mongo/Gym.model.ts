import UserModel from './User.model'
import { Schema } from 'mongoose'
import Gym from '../../domain/entity/Gym'

const gymModel = new Schema<Gym>({
  profile: {
    name: { type: 'string' }
  }
})

const gym = UserModel.discriminator('FITAMANAGER@ROOT-GYM', gymModel)
export default gym
