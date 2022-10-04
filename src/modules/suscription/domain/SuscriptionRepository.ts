import ISuscription from './ISuscription'

interface SuscriptionRepository {
  // Guardar en base de datos
  save: (suscription: unknown) => Promise<ISuscription>
  // Crear nuevo
  create: (suscription: ISuscription) => Promise<ISuscription>
  // Actualizar uno por su id
  updateById: (
    id: string,
    update: ISuscription | object,
    opts?: object
  ) => Promise<ISuscription | null>
  // Obtener uno por su id
  findById: (
    id: string,
    populate?: any,
    sort?: any
  ) => Promise<ISuscription | null>
  // Obtener todos
  findAll: (populate?: any, sort?: any) => Promise<Array<ISuscription> | null>
  // Obtener uno por parametros
  filterOne: (
    filter: object,
    populate?: any,
    sort?: any
  ) => Promise<ISuscription | null>
  // Obtener varios por parametros
  filterMany: (
    filter: object,
    populate?: any,
    sort?: any,
    where?: object
  ) => Promise<Array<ISuscription> | null>
  // Eliminar uno por su id
  deleteById: (id: string) => Promise<ISuscription | null>
}

export default SuscriptionRepository
