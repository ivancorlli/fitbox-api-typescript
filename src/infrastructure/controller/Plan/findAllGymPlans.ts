import { NextFunction, Request, Response } from 'express'
import GetPlansEnabledByGymId from '../../../application/use-case/plan/GetPlansEnabledByGymId'
import MongoPlanRepository from '../../mongo/repository/MongPlanRepository'

async function findAllGymPlans(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Insntanciamos repositorio de PLANES
  const _Plan = new MongoPlanRepository()
  // Instanciamos caso de uso ENCONTRAR PLAN POR EL ID DEL GIMNASIO
  const findPlan = new GetPlansEnabledByGymId(_Plan)
  try {
    // Obtenemos id del gimnasio
    const { gymId } = req.params
    // Buscamos todos los planes creados por el gimnasio
    const response = await findPlan.start(gymId)
    return res.status(200).send({ ok: true, response })
  } catch (err) {
    return next(err)
  }
}
export default findAllGymPlans
