import IPlan from './IPlan'

interface PlanRepository {
  // Guardar en base de datos
  save: (plan: unknown) => Promise<IPlan>
  // Crear nuevo
  create: (plan: IPlan) => Promise<IPlan>
  // Actualizar uno por su id
  updateById: (
    id: string,
    update: IPlan | object,
    opts?: object
  ) => Promise<IPlan | null>
  // Obtener uno por su id
  findById: (id: string, populate?: any, sort?: any) => Promise<IPlan | null>
  // Obtener todos
  findAll: (populate?: any, sort?: any) => Promise<Array<IPlan> | null>
  // Obtener uno por parametros
  filterOne: (
    filter: object,
    populate?: any,
    sort?: any
  ) => Promise<IPlan | null>
  // Obtener varios por parametros
  filterMany: (
    filter: object,
    populate?: any,
    sort?: any,
    where?: any
  ) => Promise<Array<IPlan> | null>
  // Eliminar uno por su id
  deleteById: (id: string) => Promise<IPlan | null>
}

export default PlanRepository
