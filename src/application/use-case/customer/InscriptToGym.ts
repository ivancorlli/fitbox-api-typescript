import Customer from '../../../domain/entity/Customer'
import CustomerRepository from '../../../domain/repository/CustomerRepository'

class InscriptToGym {
  private readonly C: CustomerRepository
  constructor(customerRepo: CustomerRepository) {
    this.C = customerRepo
  }

  async start(
    customerId: string,
    gymId: string,
    date?: number
  ): Promise<Customer | null> {
    // Validamos los datos

    // Actualizamos los datos del cliente
    const customerUpdated = await this.C.updateById(customerId, {
      gymRegistered: {
        date,
        gymId
      }
    })
    // Arrojamos error si no encontramos cliente
    return customerUpdated
  }
}
export default InscriptToGym
