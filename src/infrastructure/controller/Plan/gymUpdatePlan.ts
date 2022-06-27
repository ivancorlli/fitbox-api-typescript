import { NextFunction, Request, Response } from 'express'
import UpdatePlan from '../../../application/use-case/plan/UpdatePlan'
import Plan from '../../../domain/entity/Plan'
import { PlanStatus } from '../../../domain/object-value/PlanStatus'
import MongoPlanRepository from '../../mongo/repository/MongPlanRepository'

async function gymUpdatePlan(req: Request, res: Response, next: NextFunction) {
  // Instanciar repositorio de PLAN
  const _Plan = new MongoPlanRepository()
  // Instanciar caso de uso ACTUALIZAR PLAN
  const updatePlan = new UpdatePlan(_Plan)
  try {
    // Obtenemos id del Gimansio
    const { uid } = req.user
    // Obtenemos id del plan a actualziar
    const { planId } = req.params
    // Obtenemos los parametros a actualizar
    const { name, description, price, weekDays } = req.body
    // Definimos datos a actualizar
    const update: Plan = {
      _id: planId,
      name,
      description,
      price,
      weekDays: weekDays && weekDays.length > 0 ? weekDays.split(',') : [],
      status: PlanStatus.Enable,
      gym: uid
    }
    // Actualizamos el plam
    const planUpdated = await updatePlan.start(planId, uid, update)
    return res
      .status(201)
      .send({ ok: true, message: 'Plan actualizado', planUpdated })
  } catch (err) {
    return next(err)
  }
}

export default gymUpdatePlan
