import Plan from '../entity/Plan'

interface PlanRepository {
  // Crear nuevo y guardar en base de datos
  create: (user: Plan) => Promise<Plan>
  // Encontrar uno por su id
  getById: (id: string) => Promise<Plan | null>
  // Encontrar todos
  getAll: () => Promise<Array<Plan>>
  // Actualizar uno por su id
  updateById: (
    id: string,
    update: Plan | object,
    opts?: object
  ) => Promise<Plan | null>
  // Eliminar uno por su id
  deleteById: (id: string) => Promise<Plan | null>
  // Filtrar uno por parametros
  filterOne: (filter: object) => Promise<Plan | null>
  // Filtrar varios por parametros
  filterMany: (filter: object) => Promise<Array<Plan> | null>
}

export default PlanRepository
