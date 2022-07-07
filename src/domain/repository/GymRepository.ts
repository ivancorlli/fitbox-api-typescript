import Client from '../entity/Customer'
import Gym from '../entity/Gym'
import User from '../entity/User'
import UserRepository from './UserRepository'

interface GymRepository extends UserRepository {
  // Guardar en base de datos
  save: (gym: unknown) => Promise<Gym>
  // Crear nuevo
  create: (gym: User | Gym | Client) => Promise<Gym>
  // Actualizar uno por su id
  updateById: (
    id: string,
    update: Gym | object,
    opts?: object
  ) => Promise<Gym | null>
  // Actualizar uno por parametros
  update: (
    filter: object,
    update: Gym | object,
    opts?: object
  ) => Promise<Gym | null>
  // Actualizar muchos por parametros
  updateMany: (
    filter: object,
    update: Gym | object,
    opts?: object
  ) => Promise<Array<Gym> | null>
  // Obtener uno por su id
  getById: (id: string, populate?: string) => Promise<Gym | null>
  // Obtener todos
  getAll: (populate?: string) => Promise<Array<Gym> | null>
  // Obtener uno por parametros
  filterOne: (filter: object, populate?: string) => Promise<Gym | null>
  // Obtener varios por parametros
  filterMany: (filter: object, populate?: string) => Promise<Array<Gym> | null>
  // Eliminar uno por su id
  deleteById: (id: string) => Promise<Gym | null>
  // Eliminar uno por parametros
  delete: (filter: object, opts?: object) => Promise<Gym | null>
  // Eliminar muchos por parametros
  deleteMany: (filter: object, opts?: object) => Promise<Array<Gym> | null>
}
export default GymRepository
