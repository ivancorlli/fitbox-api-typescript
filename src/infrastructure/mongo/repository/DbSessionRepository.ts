import Session from '../../../domain/entity/Session'
import SessionRepository from '../../../domain/repository/SessionRepository'
import SessionModel from '../Session.model'

class DbSessionRepository implements SessionRepository {
  private readonly _Session = SessionModel

  // Guardar en base de datos
  async save(Session: unknown): Promise<Session> {
    // @ts-ignore
    const SessionSaved: Session = await Session.save()
    return SessionSaved
  }

  // Crear nuevo
  async create(Session: Session): Promise<Session> {
    const newSession = new this._Session(Session)
    const SessionSaved = newSession.save()
    return SessionSaved
  }

  // Actualizar uno por su id
  async updateById(
    id: string,
    update: Session | object,
    opts?: object
  ): Promise<Session | null> {
    const SessionUpdated = await this._Session.findByIdAndUpdate(
      id,
      update,
      opts
    )
    return SessionUpdated
  }

  // Actualizar uno por parametros
  async update(
    filter: object,
    update: Session | object,
    opts?: object
  ): Promise<Session | null> {
    const SessionUpdated = await this._Session.updateOne(filter, update, opts)
    return SessionUpdated as Session
  }

  // Actualizar muchos por parametros
  async updateMany(
    filter: object,
    update: Session | object,
    opts?: object
  ): Promise<Array<Session> | null> {
    const SessionUpdated = await this._Session.updateMany(filter, update, opts)
    return SessionUpdated as Session[]
  }

  // Obtener uno por su id
  async getById(id: string, populate?: string): Promise<Session | null> {
    let SessionFound = await this._Session.findById(id)
    if (populate) {
      SessionFound = await this._Session.findById(id).populate(populate)
    }
    return SessionFound
  }

  // Obtener todos
  async getAll(populate?: string): Promise<Array<Session> | null> {
    let SessionsFound = await this._Session.find({})
    if (populate) {
      SessionsFound = await this._Session.find({}).populate(populate)
    }
    return SessionsFound
  }

  // Obtener uno por parametros
  async filterOne(filter: object, populate?: string): Promise<Session | null> {
    let SessionFound = await this._Session.findOne(filter)
    if (populate) {
      SessionFound = await this._Session.findOne(filter).populate(populate)
    }
    return SessionFound
  }

  // Obtener varios por parametros
  async filterMany(
    filter: object,
    populate?: string
  ): Promise<Array<Session> | null> {
    let SessionssFound = await this._Session.find(filter)
    if (populate) {
      SessionssFound = await this._Session.find(filter).populate(populate)
    }
    return SessionssFound
  }

  // Eliminar uno por su id
  async deleteById(id: string): Promise<Session | null> {
    const SessionDeleted = await this._Session.findByIdAndDelete(id)
    return SessionDeleted
  }

  // Eliminar uno por parametros
  async delete(filter: object, opts?: object): Promise<Session | null> {
    const SessionDeleted = await this._Session.deleteOne(filter, opts)
    return SessionDeleted
  }

  // Eliminar muchos por parametros
  async deleteMany(
    filter: object,
    opts?: object
  ): Promise<Array<Session> | null> {
    const SessionsDeleted = await this._Session.deleteMany(filter, opts)
    return SessionsDeleted
  }
}
export default DbSessionRepository
