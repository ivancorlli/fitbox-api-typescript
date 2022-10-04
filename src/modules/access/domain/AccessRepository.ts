import IAccess from './IAccess'

interface AccessRepository {
  // Guardar en base de datos
  save: (user: unknown) => Promise<IAccess>
  // Crear nuevo
  create: (user: IAccess) => Promise<IAccess>
  // Actualizar uno por su id
  updateById: (
    id: string,
    update: IAccess | object,
    opts?: object
  ) => Promise<IAccess | null>
  // Obtener uno por su id
  findById: (id: string, populate?: any, sort?: any) => Promise<IAccess | null>
  // Obtener todos
  findAll: (populate?: any, sort?: any) => Promise<Array<IAccess> | null>
  // Obtener uno por parametros
  filterOne: (
    filter: object,
    populate?: any,
    sort?: any
  ) => Promise<IAccess | null>
  // Obtener varios por parametros
  filterMany: (
    filter: object,
    populate?: any,
    sort?: any,
    where?: any
  ) => Promise<Array<IAccess> | null>
  // Eliminar uno por su id
  deleteById: (id: string) => Promise<IAccess | null>
}

export default AccessRepository
