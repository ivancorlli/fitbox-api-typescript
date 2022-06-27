import { Document } from 'mongoose'
import Plan from '../../../domain/entity/Plan'
import PlanRepository from '../../../domain/repository/PlanRepository'
import PlanModel from '../Plan.model'

class MongoPlanRepository implements PlanRepository {
  private readonly _Plan = PlanModel
  // Guardar en base de datos
  async save(plan: Document<Plan>) {
    const saved = await plan.save()
    return saved
  }

  // Crear nuevo y guardar en base de datos
  async create(plan: Plan): Promise<Plan> {
    const newPlan = new this._Plan(plan)
    const planSaved = await newPlan.save()
    return planSaved
  }

  // Encontrar uno por su id
  async getById(planId: string): Promise<Plan | null> {
    const planFound = await this._Plan.findById(planId)
    return planFound
  }

  // Encontrar todos
  async getAll(): Promise<Array<Plan>> {
    const plansFound = await this._Plan.find({})
    return plansFound
  }

  // Actualizar uno por su id
  async updateById(
    id: string,
    update: Plan | object,
    opts?: object
  ): Promise<Plan | null> {
    const planUpdated = await this._Plan.findByIdAndUpdate(id, update, opts)
    return planUpdated
  }

  // Eliminar uno por su id
  async deleteById(id: string): Promise<Plan | null> {
    const planDeleted = await this._Plan.findByIdAndDelete(id)
    return planDeleted
  }

  // Filtrar uno por parametros
  async filterOne(filter: object): Promise<Plan | null> {
    const plandFilter = await this._Plan.findOne(filter)
    return plandFilter
  }

  // Filtrar varios por parametros
  async filterMany(filter: object): Promise<Array<Plan> | null> {
    const planFiltered = await this._Plan.find(filter)
    return planFiltered
  }
}
export default MongoPlanRepository
