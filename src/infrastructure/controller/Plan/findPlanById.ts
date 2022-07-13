import { NextFunction, Request, Response } from 'express'
import GetPlanEnable from '../../../application/use-case/plan/GetPlanEnable'
import DbPlan from '../../db/DbPlan'

async function findPlanById(req: Request, res: Response, next: NextFunction) {
  // Insntanciamos repositorio de PLANES
  const _Plan = new DbPlan()
  // Instanciamos caso de uso ENCONTRAR PLAN POR EL ID DEL GIMNASIO
  const getPlanEnable = new GetPlanEnable(_Plan)
  try {
    // Obtenemos id del gimnasio
    const { id } = req.params
    // Buscamos todos los planes creados por el gimnasio
    const response = await getPlanEnable.start(id)
    return res.status(200).send({ ok: true, response })
  } catch (err) {
    return next(err)
  }
}
export default findPlanById
