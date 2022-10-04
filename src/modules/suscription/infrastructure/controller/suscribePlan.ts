import { Request, Response, NextFunction } from 'express'
import CustomError from '../../../error/CustomError'
import Plan from '../../../plan/application/Plan'
import DbPlan from '../../../plan/infrastructure/DbPlan'
import Suscription from '../../application/Suscription'
import PaymentType from '../../utils/PaymentType'
import DbSuscription from '../DbSuscription'
/**
 ICorlli: 2-9-2022 ✅\
 Crea una suscripcion a un plan\
 Depende de:\
 👉 Plan
 */
async function suscribePlan(req: Request, res: Response, next: NextFunction) {
  try {
    const _Plan = new DbPlan()
    const _Suscription = new DbSuscription()
    // Obtenemos datos del usuario
    const { uid } = req.User
    const Gym = req.Gym
    // Obtenemos parametros del gimnasio y del plan
    let { gid, pid } = req.query
    gid = gid as string
    pid = pid as string
    // Verificamos que el usuario que se quiere suscribir no tenga access en el gimnasio
    if (Gym) {
      const hasAccess = Gym.access.filter((a) => a.gid === gid && a.uid === uid)
      if (hasAccess) {
        throw CustomError.badRequest('No puedes suscribirte a este gimnasio')
      }
    }
    // Buscamos si el plan existe
    const lPlan = new Plan(_Plan)
    const planExists = await lPlan.findActiveById(pid)
    // Creamos un nueva suscripcion
    const lSuscription = new Suscription(_Suscription)
    await lSuscription.createNew(
      uid,
      gid,
      planExists.uuid,
      PaymentType.Cash,
      planExists.price,
      planExists.type
    )
    return res.status(202).send({ ok: true, message: 'Suscripcion creada' })
  } catch (err) {
    return next(err)
  }
}

export default suscribePlan
