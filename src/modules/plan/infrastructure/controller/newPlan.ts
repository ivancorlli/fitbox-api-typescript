import { NextFunction, Request, Response } from 'express'
import Plan from '../../application/Plan'
import DbPlan from '../DbPlan'
/**
 ICorlli: 2-9-2022 ✅\
 Crea un nuevo plan
*/
async function newPlan(req: Request, res: Response, next: NextFunction) {
  // plan Db
  const _Plan = new DbPlan()
  try {
    // Obtenemos id del usuario
    const { gid } = req.Gym
    // Obtenemos parametros
    const { name, description, price, days, type } = req.body
    // Creamos plan
    const lPlan = new Plan(_Plan)
    await lPlan.createNew(
      gid,
      name,
      description,
      parseInt(price),
      parseInt(days),
      type
    )
    return res.status(201).send({ ok: true, message: 'Plan creado' })
  } catch (err) {
    return next(err)
  }
}

export default newPlan
