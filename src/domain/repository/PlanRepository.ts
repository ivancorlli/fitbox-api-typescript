import Plan from '../entity/Plan'

interface PlanRepository {
  // Guardar en base de datos
  save: (plan: unknown) => Promise<Plan>
  // Crear nuevo
  create: (plan: Plan) => Promise<Plan>
  // Actualizar uno por su id
  updateById: (
    id: string,
    update: Plan | object,
    opts?: object
  ) => Promise<Plan | null>
  // Actualizar uno por parametros
  update: (
    filter: object,
    update: Plan | object,
    opts?: object
  ) => Promise<Plan | null>
  // Actualizar muchos por parametros
  updateMany: (
    filter: object,
    update: Plan | object,
    opts?: object
  ) => Promise<Array<Plan> | null>
  // Obtener uno por su id
  getById: (id: string, populate?: string) => Promise<Plan | null>
  // Obtener todos
  getAll: (populate?: string) => Promise<Array<Plan> | null>
  // Obtener uno por parametros
  filterOne: (filter: object, populate?: string) => Promise<Plan | null>
  // Obtener varios por parametros
  filterMany: (filter: object, populate?: string) => Promise<Array<Plan> | null>
  // Eliminar uno por su id
  deleteById: (id: string) => Promise<Plan | null>
  // Eliminar uno por parametros
  delete: (filter: object, opts?: object) => Promise<Plan | null>
  // Eliminar muchos por parametros
  deleteMany: (filter: object, opts?: object) => Promise<Array<Plan> | null>
}

export default PlanRepository
