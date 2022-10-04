import ISession from '../domain/ISession'
import SessionRepository from '../domain/SessionRepository'
import SessionSchema from './SessionSchema'

class DbSession implements SessionRepository {
  private readonly _Session = SessionSchema

  // Guardar en base de datos
  async save(Session: unknown): Promise<ISession> {
    // @ts-ignore
    const SessionSaved: ISession = await Session.save()
    return SessionSaved
  }

  // Crear nuevo
  async create(Session: ISession): Promise<ISession> {
    const newSession = new this._Session(Session)
    const SessionSaved = await newSession.save()
    // @ts-ignore
    return SessionSaved
  }

  // Actualizar uno por su id
  async updateById(
    id: string,
    update: ISession | object,
    opts?: object
  ): Promise<ISession | null> {
    const SessionUpdated = await this._Session.findByIdAndUpdate(
      id,
      update,
      opts
    )
    // @ts-ignore
    return SessionUpdated
  }

  // Obtener uno por su id
  async findById(id: string, populate?: any): Promise<ISession | null> {
    let SessionFound = await this._Session.findById(id)
    if (populate) {
      SessionFound = await this._Session.findById(id).populate(populate)
    }
    // @ts-ignore
    return SessionFound
  }

  // Obtener todos
  async findAll(populate?: string): Promise<Array<ISession> | null> {
    let SessionsFound = await this._Session.find({})
    if (populate) {
      SessionsFound = await this._Session.find({}).populate(populate)
    }
    // @ts-ignore
    return SessionsFound
  }

  // Obtener uno por parametros
  async filterOne(filter: object, populate?: string): Promise<ISession | null> {
    let SessionFound = await this._Session.findOne(filter)
    if (populate) {
      SessionFound = await this._Session.findOne(filter).populate(populate)
    }
    // @ts-ignore
    return SessionFound
  }

  // Obtener varios por parametros
  async filterMany(
    filter: object,
    populate?: string
  ): Promise<Array<ISession> | null> {
    let SessionssFound = await this._Session.find(filter)
    if (populate) {
      SessionssFound = await this._Session.find(filter).populate(populate)
    }
    // @ts-ignore
    return SessionssFound
  }

  // Eliminar uno por su id
  async deleteById(id: string): Promise<ISession | null> {
    const SessionDeleted = await this._Session.findByIdAndDelete(id)
    // @ts-ignore
    return SessionDeleted
  }
}
export default DbSession
