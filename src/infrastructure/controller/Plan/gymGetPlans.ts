import { NextFunction, Request, Response } from 'express'
import GetPlansByGymId from '../../../application/use-case/plan/GetPlansByGymId'
import MongoPlanRepository from '../../mongo/repository/MongPlanRepository'

async function gymGetPlans(req: Request, res: Response, next: NextFunction) {
  // Insntanciamos repositorio de PLANES
  const _Plan = new MongoPlanRepository()
  // Instanciamos caso de uso ENCONTRAR PLAN POR EL ID DEL GIMNASIO
  const findPlans = new GetPlansByGymId(_Plan)
  try {
    // Obtenemos id del gimansio
    const { uid } = req.user
    // Buscamos todos los planes creados por el gimnasio
    const response = await findPlans.start(uid)
    console.log('all', true)
    return res.status(200).send({ ok: true, response })
  } catch (err) {
    return next(err)
  }
}
export default gymGetPlans
