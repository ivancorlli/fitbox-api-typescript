import { NextFunction, Request, Response } from 'express'
import UpdatePlan from '../../../application/use-case/plan/UpdatePlan'
import Plan from '../../../domain/entity/Plan'
import PlanStatus from '../../../domain/object-value/PlanStatus'
import DbPlan from '../../db/DbPlan'

async function updatePlan(req: Request, res: Response, next: NextFunction) {
  // Instanciar repositorio de PLAN
  const _Plan = new DbPlan()
  // Instanciar caso de uso ACTUALIZAR PLAN
  const updatePlan = new UpdatePlan(_Plan)
  try {
    // Obtenemos id del Gimansio
    const { uid } = req.user
    // Obtenemos id del plan a actualziar
    const { id } = req.params
    // Obtenemos los parametros a actualizar
    const { name, description, price, weekDays } = req.body
    // Definimos datos a actualizar
    const update: Plan = {
      _id: id,
      name,
      description,
      price,
      weekDays: weekDays && weekDays.length > 0 ? weekDays.split(',') : [],
      status: PlanStatus.Enable,
      gymOwner: uid
    }
    // Actualizamos el plam
    await updatePlan.start(id, uid, update)
    return res.status(201).send({ ok: true, message: 'Plan actualizado' })
  } catch (err) {
    return next(err)
  }
}

export default updatePlan
