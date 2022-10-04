import { Request, Response, NextFunction } from 'express'
import Suscription from '../../application/Suscription'
import DbSuscription from '../DbSuscription'

async function gymSuscriptions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const _Suscription = new DbSuscription()
    // Obtenemos datos del usuario
    const { gid } = req.Gym
    // Obtenemos parametros del gimnasio y del plan
    let { status, type, date } = req.query
    status = status as string
    type = type as string
    date = date as string

    // Buscamos suscriociones
    const lSuscription = new Suscription(_Suscription)
    const response = await lSuscription.gymSuscriptions(gid, status, type, date)
    return res.status(200).send({ ok: true, response })
  } catch (err) {
    return next(err)
  }
}

export default gymSuscriptions
