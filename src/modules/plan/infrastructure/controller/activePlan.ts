import { NextFunction, Request, Response } from 'express'
import Plan from '../../application/Plan'
import DbPlan from '../DbPlan'
/**
ICorlli: 2-9-2022 ✅\
Obtiene informacion de un plan activo por su id\
*/
async function activePlan(req: Request, res: Response, next: NextFunction) {
  // plan Db
  const _Plan = new DbPlan()
  try {
    // Obtenemos parametros
    const { id } = req.query
    // obtenemos un plan activo en especifico
    const lPlan = new Plan(_Plan)
    const response = await lPlan.findActiveById(id as string)
    return res.status(200).send({ ok: true, response })
  } catch (err) {
    return next(err)
  }
}

export default activePlan
