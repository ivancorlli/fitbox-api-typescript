import { NextFunction, Request, Response } from 'express'
import DisablePlan from '../../../application/use-case/plan/DisablePlan'
import DbPlan from '../../db/DbPlan'

async function disablePlan(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio de PLAN
  const _Plan = new DbPlan()
  // Instanciamos caso de uso DEHABILITAR PLAN
  const disablePlan = new DisablePlan(_Plan)
  try {
    // Obtenemos el id del GIMNASIO
    const { uid } = req.user
    // Obtenemos id del PLan a deshabilitar
    const { id } = req.params
    // DESHABILITAMOS PLAN
    await disablePlan.start(id, uid)
    return res.status(201).send({ ok: true, message: 'Plan deshabilitado' })
  } catch (err) {
    return next(err)
  }
}

export default disablePlan
