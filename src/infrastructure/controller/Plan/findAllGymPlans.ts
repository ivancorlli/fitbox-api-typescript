import { NextFunction, Request, Response } from 'express'
import GetPlansEnableByGym from '../../../application/use-case/plan/GetPlansEnabledByGym'
import DbPlan from '../../db/DbPlan'

async function findAllGymPlans(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Insntanciamos repositorio de PLANES
  const _Plan = new DbPlan()
  // Instanciamos caso de uso ENCONTRAR PLAN POR EL ID DEL GIMNASIO
  const getPlansEnable = new GetPlansEnableByGym(_Plan)
  try {
    // Obtenemos id del gimnasio
    const { id } = req.params
    // Buscamos todos los planes creados por el gimnasio
    const response = await getPlansEnable.start(id)
    return res.status(200).send({ ok: true, response })
  } catch (err) {
    return next(err)
  }
}
export default findAllGymPlans
