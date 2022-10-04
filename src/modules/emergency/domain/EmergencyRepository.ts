import IEmergency from './IEmergency'

interface EmergencyRepository {
  // Guardar en base de datos
  save: (user: unknown) => Promise<IEmergency>
  // Crear nuevo
  create: (user: IEmergency) => Promise<IEmergency>
  // Actualizar uno por su id
  updateById: (
    id: string,
    update: IEmergency | object,
    opts?: object
  ) => Promise<IEmergency | null>
  // Obtener uno por su id
  findById: (
    id: string,
    populate?: any,
    sort?: any
  ) => Promise<IEmergency | null>
  // Obtener todos
  findAll: (populate?: any, sort?: any) => Promise<Array<IEmergency> | null>
  // Obtener uno por parametros
  filterOne: (
    filter: object,
    populate?: any,
    sort?: any
  ) => Promise<IEmergency | null>
  // Obtener varios por parametros
  filterMany: (
    filter: object,
    populate?: any,
    sort?: any,
    where?: any
  ) => Promise<Array<IEmergency> | null>
  // Eliminar uno por su id
  deleteById: (id: string) => Promise<IEmergency | null>
}

export default EmergencyRepository
