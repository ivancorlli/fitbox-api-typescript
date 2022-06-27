import { NextFunction, Request, Response } from 'express'
import GetPlanEnableById from '../../../application/use-case/plan/GetPlanEnableById'
import MongoPlanRepository from '../../mongo/repository/MongPlanRepository'

async function findPlanById(req: Request, res: Response, next: NextFunction) {
  // Insntanciamos repositorio de PLANES
  const _Plan = new MongoPlanRepository()
  // Instanciamos caso de uso ENCONTRAR PLAN POR EL ID DEL GIMNASIO
  const findPlan = new GetPlanEnableById(_Plan)
  try {
    // Obtenemos id del gimnasio
    const { planId } = req.params
    // Buscamos todos los planes creados por el gimnasio
    const response = await findPlan.start(planId)
    return res.status(200).send({ ok: true, response })
  } catch (err) {
    return next(err)
  }
}
export default findPlanById
