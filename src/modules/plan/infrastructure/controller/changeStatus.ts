import { NextFunction, Request, Response } from 'express'
import Plan from '../../application/Plan'
import DbPlan from '../DbPlan'
/**
 ICorlli: 2-9-2022 ✅\
 Cambia el estado de un plan
*/
async function changeStatus(req: Request, res: Response, next: NextFunction) {
  // plan Db
  const _Plan = new DbPlan()
  try {
    // Obtenemos id del usuario
    const { gid } = req.Gym
    // Obtenemos parametros
    const { id, status } = req.query
    // Cambiamos estado del  plan
    const lPlan = new Plan(_Plan)
    await lPlan.changeStatus(id as string, gid, status as string)
    return res.status(200).send({ ok: true, message: 'Plan actualizado' })
  } catch (err) {
    return next(err)
  }
}

export default changeStatus
