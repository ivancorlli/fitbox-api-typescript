import Session from '../../../domain/entity/Session'
import SessionRepository from '../../../domain/repository/SessionRepository'
import SessionModel from '../Session.model'

class MongoSessionRepository implements SessionRepository {
  private readonly _Session = SessionModel
  // Crear nuevo y guardar en base de datos
  async create(plan: Session): Promise<Session> {
    const newPlan = new this._Session(plan)
    const sessionSaved = await newPlan.save()
    return sessionSaved
  }

  // Encontrar uno por su id
  async getById(planId: string): Promise<Session | null> {
    const sessionFound = await this._Session.findById(planId)
    return sessionFound
  }

  // Encontrar todos
  async getAll(): Promise<Array<Session>> {
    const sessionsFound = await this._Session.find({})
    return sessionsFound
  }

  // Actualizar uno por su id
  async updateById(
    id: string,
    update: Session | object
  ): Promise<Session | null> {
    const sessionUpdated = await this._Session.findByIdAndUpdate(id, update)
    return sessionUpdated
  }

  // Eliminar uno por su id
  async deleteById(id: string): Promise<Session | null> {
    const sessionDeleted = await this._Session.findByIdAndDelete(id)
    return sessionDeleted
  }

  // Filtrar uno por parametros
  async filterOne(filter: object): Promise<Session | null> {
    const sessiondFilter = await this._Session.findOne(filter)
    return sessiondFilter
  }

  // Filtrar varios por parametros
  async filterMany(filter: object): Promise<Array<Session> | null> {
    const sessionFiltered = await this._Session.find(filter)
    return sessionFiltered
  }
}
export default MongoSessionRepository
