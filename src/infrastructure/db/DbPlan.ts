import Plan from '../../domain/entity/Plan'
import PlanRepository from '../../domain/repository/PlanRepository'
import PlanModel from '../utils/mongo/Plan.model'

class DbPlan implements PlanRepository {
  private readonly _Plan = PlanModel

  // Guardar en base de datos
  async save(Plan: unknown): Promise<Plan> {
    // @ts-ignore
    const PlanSaved: Plan = await Plan.save()
    return PlanSaved
  }

  // Crear nuevo
  async create(Plan: Plan): Promise<Plan> {
    const newPlan = new this._Plan(Plan)
    const PlanSaved = newPlan.save()
    return PlanSaved
  }

  // Actualizar uno por su id
  async updateById(
    id: string,
    update: Plan | object,
    opts?: object
  ): Promise<Plan | null> {
    const PlanUpdated = await this._Plan.findByIdAndUpdate(id, update, opts)
    return PlanUpdated
  }

  // Actualizar uno por parametros
  async update(
    filter: object,
    update: Plan | object,
    opts?: object
  ): Promise<Plan | null> {
    const PlanUpdated = await this._Plan.updateOne(filter, update, opts)
    return PlanUpdated as Plan
  }

  // Actualizar muchos por parametros
  async updateMany(
    filter: object,
    update: Plan | object,
    opts?: object
  ): Promise<Array<Plan> | null> {
    const PlanUpdated = await this._Plan.updateMany(filter, update, opts)
    return PlanUpdated as Plan[]
  }

  // Obtener uno por su id
  async getById(id: string, populate?: string): Promise<Plan | null> {
    let PlanFound = await this._Plan.findById(id)
    if (populate) {
      PlanFound = await this._Plan.findById(id).populate(populate)
    }
    return PlanFound
  }

  // Obtener todos
  async getAll(populate?: string): Promise<Array<Plan> | null> {
    let PlansFound = await this._Plan.find({})
    if (populate) {
      PlansFound = await this._Plan.find({}).populate(populate)
    }
    return PlansFound
  }

  // Obtener uno por parametros
  async filterOne(filter: object, populate?: string): Promise<Plan | null> {
    let PlanFound = await this._Plan.findOne(filter)
    if (populate) {
      PlanFound = await this._Plan.findOne(filter).populate(populate)
    }
    return PlanFound
  }

  // Obtener varios por parametros
  async filterMany(
    filter: object,
    populate?: string
  ): Promise<Array<Plan> | null> {
    let PlansFound = await this._Plan.find(filter)
    if (populate) {
      PlansFound = await this._Plan.find(filter).populate(populate)
    }
    return PlansFound
  }

  // Eliminar uno por su id
  async deleteById(id: string): Promise<Plan | null> {
    const PlanDeleted = await this._Plan.findByIdAndDelete(id)
    return PlanDeleted
  }

  // Eliminar uno por parametros
  async delete(filter: object, opts?: object): Promise<Plan | null> {
    const PlanDeleted = await this._Plan.deleteOne(filter, opts)
    return PlanDeleted
  }

  // Eliminar muchos por parametros
  async deleteMany(filter: object, opts?: object): Promise<Array<Plan> | null> {
    const PlansDeleted = await this._Plan.deleteMany(filter, opts)
    return PlansDeleted
  }
}
export default DbPlan
