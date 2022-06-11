import UserModel from './User.model'
import { Schema } from 'mongoose'
import Gym from '../../domain/entity/Gym'
import { UserRoles } from '../../config/config'

const gymModel = new Schema<Gym>({
  profile: {
    name: { type: String }
  }
})

const key: string = UserRoles.gym!
const gym = UserModel.discriminator(key, gymModel)
export default gym
