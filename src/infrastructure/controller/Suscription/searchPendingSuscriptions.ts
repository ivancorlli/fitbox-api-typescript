import { NextFunction, Request, Response } from 'express'
import SearchSuscriptionsByCustomer from '../../../application/use-case/suscription/SearchSuscriptionByCustomer'
import DbSuscription from '../../db/DbSuscription'

async function searchPendingSuscriptions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Instanciamos repositorio de SUSCRIPCION
  const _Suscription = new DbSuscription()
  // Instanciamos caso de uso OBTENER SUSCRIOCIONES PENDIENTES
  const search = new SearchSuscriptionsByCustomer(_Suscription)
  try {
    // Obtenemos el numero de suscripcion
    const { number } = req.params
    // Obetnemos id del gimnasio
    const { uid } = req.user
    const response = await search.start(uid, parseInt(number))
    return res.status(200).send({ ok: true, response })
  } catch (err) {
    return next(err)
  }
}
export default searchPendingSuscriptions
