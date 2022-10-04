import IPlan from '../domain/IPlan'
import PlanRepository from '../domain/PlanRepository'
import PlanSchema from './PlanSchema'

class DbPlan implements PlanRepository {
  private readonly _Plan = PlanSchema

  // Guardar en base de datos
  async save(Plan: unknown): Promise<IPlan> {
    // @ts-ignore
    const PlanSaved: IPlan = await Plan.save()
    return PlanSaved
  }

  // Crear nuevo
  async create(Plan: IPlan): Promise<IPlan> {
    const newPlan = new this._Plan(Plan)
    const PlanSaved = newPlan.save()
    // @ts-ignore
    return PlanSaved
  }

  // Actualizar uno por su id
  async updateById(
    id: string,
    update: IPlan | object,
    opts?: object
  ): Promise<IPlan | null> {
    const PlanUpdated = await this._Plan.findByIdAndUpdate(id, update, opts)
    // @ts-ignore
    return PlanUpdated
  }

  // Obtener uno por su id
  async findById(id: string, populate?: string): Promise<IPlan | null> {
    let PlanFound = await this._Plan.findById(id)
    if (populate) {
      PlanFound = await this._Plan.findById(id).populate(populate)
    }
    // @ts-ignore
    return PlanFound
  }

  // Obtener todos
  async findAll(populate?: string): Promise<Array<IPlan> | null> {
    let PlansFound = await this._Plan.find({})
    if (populate) {
      PlansFound = await this._Plan.find({}).populate(populate)
    }
    // @ts-ignore
    return PlansFound
  }

  // Obtener uno por parametros
  async filterOne(filter: object, populate?: string): Promise<IPlan | null> {
    let PlanFound = await this._Plan.findOne(filter)
    if (populate) {
      PlanFound = await this._Plan.findOne(filter).populate(populate)
    }
    // @ts-ignore
    return PlanFound
  }

  // Obtener varios por parametros
  async filterMany(
    filter: object,
    populate?: string
  ): Promise<Array<IPlan> | null> {
    let PlanssFound = await this._Plan.find(filter)
    if (populate) {
      PlanssFound = await this._Plan.find(filter).populate(populate)
    }
    // @ts-ignore
    return PlanssFound
  }

  // Eliminar uno por su id
  async deleteById(id: string): Promise<IPlan | null> {
    const PlanDeleted = await this._Plan.findByIdAndDelete(id)
    // @ts-ignore
    return PlanDeleted
  }
}
export default DbPlan
