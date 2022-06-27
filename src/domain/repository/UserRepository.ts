import Gym from '../entity/Gym'
import User from '../entity/User'
interface UserRepository {
  // Crear nuevo y guardar en base de datos
  save: (user: User) => Promise<User>
  // Encontrar uno por su email
  getByEmail: (email: string) => Promise<User | Gym | null>
  // Encontrar uno por su id
  getById: (id: string) => Promise<User | Gym | null>
  // Encontrar todos
  getAll: () => Promise<Array<User>>
  // Actualizar uno por su id
  updateById: (
    id: string,
    update: User | Gym | object
  ) => Promise<User | Gym | null>
  // Eliminar uno por su id
  deleteById: (id: string) => Promise<void>
  // Filtrar uno por parametros
  filterOne: (filter: object) => Promise<User | Gym | null>
  // Filtrar varios por parametros
  filterMany: (filter: object) => Promise<Array<User | Gym> | null>
}

export default UserRepository
