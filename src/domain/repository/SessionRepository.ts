import Session from '../entity/Session'

interface SessionRepository {
  // Guardar en base de datos
  save: (session: unknown) => Promise<Session>
  // Crear nuevo
  create: (session: Session) => Promise<Session>
  // Actualizar uno por su id
  updateById: (
    id: string,
    update: Session | object,
    opts?: object
  ) => Promise<Session | null>
  // Actualizar uno por parametros
  update: (
    filter: object,
    update: Session | object,
    opts?: object
  ) => Promise<Session | null>
  // Actualizar muchos por parametros
  updateMany: (
    filter: object,
    update: Session | object,
    opts?: object
  ) => Promise<Array<Session> | null>
  // Obtener uno por su id
  getById: (id: string, populate?: string) => Promise<Session | null>
  // Obtener todos
  getAll: (populate?: string) => Promise<Array<Session> | null>
  // Obtener uno por parametros
  filterOne: (filter: object, populate?: string) => Promise<Session | null>
  // Obtener varios por parametros
  filterMany: (
    filter: object,
    populate?: string
  ) => Promise<Array<Session> | null>
  // Eliminar uno por su id
  deleteById: (id: string) => Promise<Session | null>
  // Eliminar uno por parametros
  delete: (filter: object, opts?: object) => Promise<Session | null>
  // Eliminar muchos por parametros
  deleteMany: (filter: object, opts?: object) => Promise<Array<Session> | null>
}
export default SessionRepository
