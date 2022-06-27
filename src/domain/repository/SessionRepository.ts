import Session from '../entity/Session'

interface SessionRepository {
  // Crear nuevo y guardar en base de datos
  create: (user: Session) => Promise<Session>
  // Encontrar uno por su id
  getById: (id: string) => Promise<Session | null>
  // Encontrar todos
  getAll: () => Promise<Array<Session>>
  // Actualizar uno por su id
  updateById: (id: string, update: Session | object) => Promise<Session | null>
  // Eliminar uno por su id
  deleteById: (id: string) => Promise<Session | null>
  // Filtrar uno por parametros
  filterOne: (filter: object) => Promise<Session | null>
  // Filtrar varios por parametros
  filterMany: (filter: object) => Promise<Array<Session> | null>
}
export default SessionRepository
