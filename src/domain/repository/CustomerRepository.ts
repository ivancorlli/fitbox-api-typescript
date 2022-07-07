import Costumer from '../entity/Customer'
import Gym from '../entity/Gym'
import User from '../entity/User'
import UserRepository from './UserRepository'

interface CustomerRepository extends UserRepository {
  // Guardar en base de datos
  save: (Costumer: unknown) => Promise<Costumer>
  // Crear nuevo
  create: (Costumer: User | Gym | Costumer) => Promise<Costumer>
  // Actualizar uno por su id
  updateById: (
    id: string,
    update: Costumer | object,
    opts?: object
  ) => Promise<Costumer | null>
  // Actualizar uno por parametros
  update: (
    filter: object,
    update: Costumer | object,
    opts?: object
  ) => Promise<Costumer | null>
  // Actualizar muchos por parametros
  updateMany: (
    filter: object,
    update: Costumer | object,
    opts?: object
  ) => Promise<Array<Costumer> | null>
  // Obtener uno por su id
  getById: (id: string, populate?: string) => Promise<Costumer | null>
  // Obtener todos
  getAll: (populate?: string) => Promise<Array<Costumer> | null>
  // Obtener uno por parametros
  filterOne: (filter: object, populate?: string) => Promise<Costumer | null>
  // Obtener varios por parametros
  filterMany: (
    filter: object,
    populate?: string
  ) => Promise<Array<Costumer> | null>
  // Eliminar uno por su id
  deleteById: (id: string) => Promise<Costumer | null>
  // Eliminar uno por parametros
  delete: (filter: object, opts?: object) => Promise<Costumer | null>
  // Eliminar muchos por parametros
  deleteMany: (filter: object, opts?: object) => Promise<Array<Costumer> | null>
}

export default CustomerRepository
