import Client from '../entity/Client'

interface ClientRepository {
  create: (client: Client) => Promise<Client>
  getById: (clinetId: number) => Promise<Client>
}

export default ClientRepository
