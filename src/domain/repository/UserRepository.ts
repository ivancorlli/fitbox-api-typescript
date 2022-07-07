import Client from '../entity/Customer'
import Gym from '../entity/Gym'
import User from '../entity/User'
interface UserRepository {
  // Guardar en base de datos
  save: (user: unknown) => Promise<User | Gym | Client>
  // Crear nuevo
  create: (user: User) => Promise<User | Gym | Client>
  // Actualizar uno por su id
  updateById: (
    id: string,
    update: User | Gym | Client | object,
    opts?: object
  ) => Promise<User | Gym | Client | null>
  // Actualizar uno por parametros
  update: (
    filter: object,
    update: User | Gym | Client | object,
    opts?: object
  ) => Promise<User | Gym | Client | null>
  // Actualizar muchos por parametros
  updateMany: (
    filter: object,
    update: User | Gym | Client | object,
    opts?: object
  ) => Promise<Array<User | Gym | Client> | null>
  // Obtener uno por su id
  getById: (
    id: string,
    populate?: string
  ) => Promise<User | Gym | Client | null>
  // Obtener todos
  getAll: (populate?: string) => Promise<Array<User | Gym | Client> | null>
  // Obtener uno por parametros
  filterOne: (
    filter: object,
    populate?: string
  ) => Promise<User | Gym | Client | null>
  // Obtener varios por parametros
  filterMany: (
    filter: object,
    populate?: string
  ) => Promise<Array<User | Gym | Client> | null>
  // Eliminar uno por su id
  deleteById: (id: string) => Promise<User | Gym | Client | null>
  // Eliminar uno por parametros
  delete: (filter: object, opts?: object) => Promise<User | Gym | Client | null>
  // Eliminar muchos por parametros
  deleteMany: (
    filter: object,
    opts?: object
  ) => Promise<Array<User | Gym | Client> | null>
}

export default UserRepository
