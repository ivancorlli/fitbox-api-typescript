import { Request, Response, NextFunction } from 'express'
import Suscription from '../../application/Suscription'
import DbSuscription from '../DbSuscription'

async function suscribers(req: Request, res: Response, next: NextFunction) {
  try {
    const _Suscription = new DbSuscription()
    // Obtenemos datos del usuario
    const { gid } = req.Gym
    // obtenemos id del plan
    const { pid } = req.query

    // Buscamos suscriociones
    const lSuscription = new Suscription(_Suscription)
    if (pid) {
      const response = await lSuscription.planSuscribers(gid, pid as string)
      return res.status(200).send({ ok: true, response })
    } else {
      const response = await lSuscription.gymSuscribers(gid)
      return res.status(200).send({ ok: true, response })
    }
  } catch (err) {
    return next(err)
  }
}

export default suscribers
