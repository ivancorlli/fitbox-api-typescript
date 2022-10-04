import ISession from './ISession'

interface SessionRepository {
  // Guardar en base de datos
  save: (user: unknown) => Promise<ISession>
  // Crear nuevo
  create: (user: ISession) => Promise<ISession>
  // Actualizar uno por su id
  updateById: (
    id: string,
    update: ISession | object,
    opts?: object
  ) => Promise<ISession | null>
  // Obtener uno por su id
  findById: (id: string, populate?: any, sort?: any) => Promise<ISession | null>
  // Obtener todos
  findAll: (populate?: any, sort?: any) => Promise<Array<ISession> | null>
  // Obtener uno por parametros
  filterOne: (
    filter: object,
    populate?: any,
    sort?: any
  ) => Promise<ISession | null>
  // Obtener varios por parametros
  filterMany: (
    filter: object,
    populate?: any,
    sort?: any,
    where?: any
  ) => Promise<Array<ISession> | null>
  // Eliminar uno por su id
  deleteById: (id: string) => Promise<ISession | null>
}

export default SessionRepository
