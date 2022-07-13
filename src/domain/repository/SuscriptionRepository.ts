import Suscription from '../entity/Suscription'

interface SuscriptionRepository {
  // Guardar en base de datos
  save: (suscription: unknown) => Promise<Suscription>
  // Crear nuevo
  create: (suscription: Suscription) => Promise<Suscription>
  // Actualizar uno por su id
  updateById: (
    id: string,
    update: Suscription | object,
    opts?: object
  ) => Promise<Suscription | null>
  // Actualizar uno por parametros
  update: (
    filter: object,
    update: Suscription | object,
    opts?: object
  ) => Promise<Suscription | null>
  // Actualizar muchos por parametros
  updateMany: (
    filter: object,
    update: Suscription | object,
    opts?: object
  ) => Promise<Array<Suscription> | null>
  // Obtener uno por su id
  getById: (id: string, populate?: string) => Promise<Suscription | null>
  // Obtener todos
  getAll: (populate?: string) => Promise<Array<Suscription> | null>
  // Obtener uno por parametros
  filterOne: (
    filter: object,
    populate?: string | Array<string>
  ) => Promise<Suscription | null>
  // Obtener varios por parametros
  filterMany: (
    filter: object,
    populate?: string | Array<string>
  ) => Promise<Array<Suscription> | null>
  // Eliminar uno por su id
  deleteById: (id: string) => Promise<Suscription | null>
  // Eliminar uno por parametros
  delete: (filter: object, opts?: object) => Promise<Suscription | null>
  // Eliminar muchos por parametros
  deleteMany: (
    filter: object,
    opts?: object
  ) => Promise<Array<Suscription> | null>
}
export default SuscriptionRepository
