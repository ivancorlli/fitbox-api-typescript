import { NextFunction, Request, Response } from 'express'
import GetPlanByGymId from '../../../application/use-case/plan/GetPlanByGymId'
import DbPlanRepository from '../../mongo/repository/DbPlanRepository'

async function gymGetPlan(req: Request, res: Response, next: NextFunction) {
  // Insntanciamos repositorio de PLANES
  const _Plan = new DbPlanRepository()
  // Instanciamos caso de uso ENCONTRAR PLAN POR EL ID DEL GIMNASIO
  const findPlan = new GetPlanByGymId(_Plan)
  try {
    // Obtenemos id del gimansio
    const { uid } = req.user
    const { planId } = req.params
    // Buscamos todos los planes creados por el gimnasio
    const response = await findPlan.start(uid, planId)
    console.log(true)
    return res.status(200).send({ ok: true, response })
  } catch (err) {
    return next(err)
  }
}
export default gymGetPlan
