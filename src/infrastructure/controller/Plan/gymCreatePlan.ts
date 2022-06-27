import { NextFunction, Request, Response } from 'express'
import CreateNew from '../../../application/use-case/plan/CreateNew'
import Plan from '../../../domain/entity/Plan'
import MongoPlanRepository from '../../mongo/repository/MongPlanRepository'
import { v4 as uuidv4 } from 'uuid'
import { PlanStatus } from '../../../domain/object-value/PlanStatus'

async function gymCreatePlan(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio del PLAN
  const plan = new MongoPlanRepository()
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
      gym: uid
    }
    // Creamos un nuevo gimnasio
    const planCreated = await newPlan.start(planData)
    return res
      .status(201)
      .send({ ok: true, message: 'Plan creado', planCreated })
  } catch (err) {
    console.log(err)
    return next(err)
  }
}
export default gymCreatePlan
