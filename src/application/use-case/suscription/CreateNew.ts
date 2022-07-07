import Suscription from '../../../domain/entity/Suscription'
import SuscriptionRepository from '../../../domain/repository/SuscriptionRepository'

class CreateNew {
  private readonly S: SuscriptionRepository
  constructor(suscriptionRepo: SuscriptionRepository) {
    this.S = suscriptionRepo
  }

  async start(suscription: Suscription): Promise<Suscription> {
    // Validamos los datos

    // creamos nueva suscripcion
    const newSuscription = await this.S.create(suscription)
    return newSuscription
  }
}
export default CreateNew
