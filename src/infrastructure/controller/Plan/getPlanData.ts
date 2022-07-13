import { NextFunction, Request, Response } from 'express'
import GetPlanByGym from '../../../application/use-case/plan/GetPlanByGym'
import DbPlan from '../../db/DbPlan'

async function getPlanData(req: Request, res: Response, next: NextFunction) {
  // Insntanciamos repositorio de PLANES
  const _Plan = new DbPlan()
  // Instanciamos caso de uso ENCONTRAR PLAN POR EL ID DEL GIMNASIO
  const getPlanByGym = new GetPlanByGym(_Plan)
  try {
    // Obtenemos id del gimansio
    const { uid } = req.user
    // Obtenemos el id del plan
    const { id } = req.params
    // Buscamos todos los planes creados por el gimnasio
    const response = await getPlanByGym.start(uid, id)
    return res.status(200).send({ ok: true, response })
  } catch (err) {
    return next(err)
  }
}
export default getPlanData
