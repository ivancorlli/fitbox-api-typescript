import { NextFunction, Request, Response } from 'express'
import CreateNew from '../../../application/use-case/plan/CreateNew'
import Plan from '../../../domain/entity/Plan'
import DbPlan from '../../db/DbPlan'
import { v4 as uuidv4 } from 'uuid'
import PlanStatus from '../../../domain/object-value/PlanStatus'
import Command from '../../events/Command'

async function createPlan(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio del PLAN
  const _Plan = new DbPlan()
  // Instanciamos repositorio de ID
  const ID = uuidv4()
  // Instanciamos caso de uso CREAR NUEVO PLAN
  const createNew = new CreateNew(_Plan)
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
    const newPlan = await createNew.start(planData)
    // Llamar a coommnad para notificar a los clientes del gimnasio que se creo un nuevo plan
    await Command.NewPlan.add('notify', { plan: newPlan })
    return res.status(201).send({ ok: true, message: 'Plan creado' })
  } catch (err) {
    return next(err)
  }
}
export default createPlan
