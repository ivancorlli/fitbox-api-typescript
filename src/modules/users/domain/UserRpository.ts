interface UserRepository<T> {
  // Guardar en base de datos
  save: (user: unknown) => Promise<T>
  // Crear nuevo
  create: (user: T) => Promise<T>
  // Actualizar uno por su id
  updateById: (
    id: string,
    update: T | object,
    opts?: object
  ) => Promise<T | null>
  // Obtener uno por su id
  findById: (id: string, populate?: any, sort?: any) => Promise<T | null>
  // Obtener todos
  findAll: (populate?: any, sort?: any) => Promise<T[] | null>
  // Obtener uno por parametros
  filterOne: (filter: object, populate?: any, sort?: any) => Promise<T | null>
  // Obtener varios por parametros
  filterMany: (
    filter: object,
    populate?: any,
    sort?: any,
    where?: any
  ) => Promise<T[] | null>
  // Eliminar uno por su id
  deleteById: (id: string) => Promise<T | null>
}

export default UserRepository
