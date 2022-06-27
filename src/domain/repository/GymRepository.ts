import Gym from '../entity/Gym'
import User from '../entity/User'
import UserRepository from './UserRepository'

interface GymRepository extends UserRepository {
  // Encontrar uno por su id
  getById: (id: string) => Promise<Gym | null>
  // Encontrar todos
  getAll: () => Promise<Array<User>>
  // Actualizar uno por su id
  updateById: (id: string, update: Gym | object) => Promise<Gym | null>
  // Eliminar uno por su id
  deleteById: (id: string) => Promise<void>
  // Filtrar uno por parametros
  filterOne: (filter: object) => Promise<Gym | null>
  // Filtrar varios por parametros
  filterMany: (filter: object) => Promise<Array<Gym> | null>
}
export default GymRepository
