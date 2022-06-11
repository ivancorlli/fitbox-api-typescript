import { Schema } from 'mongoose'
import Client from '../../domain/entity/Client'
import UserModel from './User.model'
import { UserRoles } from '../../config/config'

const clientModel = new Schema<Client>({
  profile: {
    name: { type: 'string' }
  }
})

const key: string = UserRoles.client!
const client = UserModel.discriminator(key!, clientModel)
export default client
