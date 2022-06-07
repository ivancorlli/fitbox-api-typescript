import User from '../../../domain/entity/User'
import ClientRepository from '../../../domain/repository/ClientRepository'
import client from '../Client.model'

import MongoUserRepository from './MongoUserRepository'

/* eslint-disable */
class MongoClientRepository
  extends MongoUserRepository
  implements ClientRepository
{
  /* eslint-enable */
  private readonly _Client = client
  async save(body: User): Promise<User> {
    const newClient = new this._Client(body)
    const clientSaved = await newClient.save()
    return clientSaved
  }
}

export default MongoClientRepository
