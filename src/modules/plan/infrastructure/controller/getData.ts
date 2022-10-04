import { NextFunction, Request, Response } from 'express'
import Plan from '../../application/Plan'
import DbPlan from '../DbPlan'
/**
 ICorlli: 2-9-2022 ✅\
 Obtiene los datos de un plan sin tener en cuenta su estado
*/
async function getData(req: Request, res: Response, next: NextFunction) {
  // plan Db
  const _Plan = new DbPlan()
  try {
    // Obtenemos id del usuario
    const { gid } = req.Gym
    // Obtenemos parametros
    const { id } = req.query
    // obtenemos plan
    const lPlan = new Plan(_Plan)
    const response = await lPlan.findByGym(id as string, gid)
    return res.status(200).send({ ok: true, response })
  } catch (err) {
    return next(err)
  }
}

export default getData
