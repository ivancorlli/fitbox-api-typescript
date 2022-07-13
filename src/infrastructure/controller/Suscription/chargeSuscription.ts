import { NextFunction, Request, Response } from 'express'
import ChargeSuscription from '../../../application/use-case/suscription/ChargeSuscription'
import Verify from '../../../application/use-case/suscription/Verify'
import CustomError from '../../../domain/exception/CustomError'
import ErrorResponse from '../../../domain/object-value/ErrorResponse'
import PaymentType from '../../../domain/object-value/PaymentType'
import SuscriptionStatus from '../../../domain/object-value/SuscriptionStatus'
import DbSuscription from '../../db/DbSuscription'

async function chargeSuscription(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Instanciamos repositorio de SUSCRIPCION
  const _Suscription = new DbSuscription()
  // Instanciamos caso de uso COBRAR SUSCRIPCION
  const chargeSuscription = new ChargeSuscription(_Suscription)
  // Instanciamos caso de uso VERIFICAR SUSCRIPCION
  const verify = new Verify(_Suscription)
  try {
    // Obtenemos id del gimnasio
    const { uid } = req.user
    // Obtenemos id de la suscripcion a cobrar
    const { id } = req.params
    // Verificar si existe suscripcion
    const suscription = await verify.start(id, uid)
    // Si la suscripcion no esta EN PROGRESO
    // Si la suscripcion no se paga en efectivo ARROJAMOS ERROR
    if (
      suscription.status !== SuscriptionStatus.InProgress ||
      suscription.paymentType !== PaymentType.Cash
    ) {
      throw CustomError.unauthorized(ErrorResponse.ActionForbbiden)
    }
    // Cobramos suscripcion
    await chargeSuscription.start(suscription._id)
    return res.status(200).send({ ok: true, message: 'Suscripcion aprobada' })
  } catch (err) {
    return next(err)
  }
}

export default chargeSuscription
