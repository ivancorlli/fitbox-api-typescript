import { NextFunction, Request, Response } from 'express'
import Plan from '../../application/Plan'
import DbPlan from '../DbPlan'
/**
ICorlli: 2-9-2022 ✅\
Obtiene todos los planes activos de un gimnasio\
*/
async function activePlans(req: Request, res: Response, next: NextFunction) {
  // plan Db
  const _Plan = new DbPlan()
  try {
    // Obtenemos parametros
    const { id } = req.query
    // obtenemos todos los planes activos del gimnasio
    const lPlan = new Plan(_Plan)
    const response = await lPlan.findAllActivesByGym(id as string)
    return res.status(200).send({ ok: true, response })
  } catch (err) {
    return next(err)
  }
}

export default activePlans
