import { NextFunction, Request, Response } from 'express'
import GetPlansByGym from '../../../application/use-case/plan/GetPlansByGym'
import DbPlan from '../../db/DbPlan'

async function getPlans(req: Request, res: Response, next: NextFunction) {
  // Insntanciamos repositorio de PLANES
  const _Plan = new DbPlan()
  // Instanciamos caso de uso ENCONTRAR PLAN POR EL ID DEL GIMNASIO
  const findPlans = new GetPlansByGym(_Plan)
  try {
    // Obtenemos id del gimansio
    const { uid } = req.user
    // Buscamos todos los planes creados por el gimnasio
    const response = await findPlans.start(uid)
    return res.status(200).send({ ok: true, response })
  } catch (err) {
    return next(err)
  }
}
export default getPlans
