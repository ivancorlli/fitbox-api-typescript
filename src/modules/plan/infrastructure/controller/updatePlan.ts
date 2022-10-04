import { NextFunction, Request, Response } from 'express'
import Plan from '../../application/Plan'
import DbPlan from '../DbPlan'
/**
 ICorlli: 2-9-2022 ✅\
 Actualiza los datos de un plan
*/
async function updatePlan(req: Request, res: Response, next: NextFunction) {
  // plan Db
  const _Plan = new DbPlan()
  try {
    // Obtenemos id del usuario
    const { gid } = req.Gym
    // Obtenemos parametros
    const { id } = req.query
    const { name, description, price, days } = req.body
    // Creamos plan
    const lPlan = new Plan(_Plan)
    await lPlan.updateData(
      id as string,
      gid,
      name,
      description,
      parseInt(price),
      parseInt(days)
    )
    return res.status(200).send({ ok: true, message: 'Plan modificado' })
  } catch (err) {
    return next(err)
  }
}

export default updatePlan
