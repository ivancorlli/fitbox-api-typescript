import { NextFunction, Request, Response } from 'express'
import Plan from '../../application/Plan'
import DbPlan from '../DbPlan'
/**
 ICorlli: 2-9-20 ✅\
 Obtiene todos los planes de un gimnasio sin tener en cuenta su estado
*/
async function gymPlans(req: Request, res: Response, next: NextFunction) {
  // plan Db
  const _Plan = new DbPlan()
  try {
    // Obtenemos parametros
    const { gid } = req.Gym
    // obtenemos todos los planes activos del gimnasio
    const lPlan = new Plan(_Plan)
    const response = await lPlan.findAllByGym(gid)
    return res.status(200).send({ ok: true, response })
  } catch (err) {
    return next(err)
  }
}

export default gymPlans
