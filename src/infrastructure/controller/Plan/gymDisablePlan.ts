import { NextFunction, Request, Response } from 'express'
import DisablePlan from '../../../application/use-case/plan/DisablePlan'
import DbPlanRepository from '../../mongo/repository/DbPlanRepository'

async function gymDisablePlan(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio de PLAN
  const _Plan = new DbPlanRepository()
  // Instanciamos caso de uso DEHABILITAR PLAN
  const disablePlan = new DisablePlan(_Plan)
  try {
    // Obtenemos el id del GIMNASIO
    const { uid } = req.user
    // Obtenemos id del PLan a deshabilitar
    const { planId } = req.params
    // DESHABILITAMOS PLAN
    await disablePlan.start(planId, uid)
    return res.status(201).send({ ok: true, message: 'Plan deshabilitado' })
  } catch (err) {
    return next(err)
  }
}

export default gymDisablePlan
