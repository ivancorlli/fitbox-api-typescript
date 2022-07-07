import { NextFunction, Request, Response } from 'express'
import CreateNew from '../../../application/use-case/plan/CreateNew'
import Plan from '../../../domain/entity/Plan'
import DbPlanRepository from '../../mongo/repository/DbPlanRepository'
import { v4 as uuidv4 } from 'uuid'
import { PlanStatus } from '../../../domain/object-value/PlanStatus'

async function gymCreatePlan(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio del PLAN
  const plan = new DbPlanRepository()
  // Instanciamos repositorio de ID
  const ID = uuidv4()
  // Instanciamos caso de uso CREAR NUEVO PLAN
  const newPlan = new CreateNew(plan)
  try {
    // obtenemos id del gimnasio
    const { uid } = req.user
    // Obtenemos los datos del plan
    const { name, description, price, weekDays } = req.body
    const planData: Plan = {
      _id: ID,
      name,
      description,
      price,
      weekDays: weekDays && weekDays.length > 0 ? weekDays.split(',') : [],
      status: PlanStatus.Enable,
      gymOwner: uid
    }
    // Creamos un nuevo plan
    await newPlan.start(planData)
    // TODO Notificar a los clientes del gimnasio, que se creo un nuevo plan
    return res.status(201).send({ ok: true, message: 'Plan creado' })
  } catch (err) {
    return next(err)
  }
}
export default gymCreatePlan
