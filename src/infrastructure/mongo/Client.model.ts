import { Schema } from 'mongoose'
import Client from '../../domain/entity/Client'
import UserModel from './User.model'
import 'dotenv/config'

const clientModel = new Schema<Client>({
  profile: {
    name: { type: 'string' }
  }
})

const key: string = process.env.CLIENT_ROLE!
const client = UserModel.discriminator(key!, clientModel)
export default client
