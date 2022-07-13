import { NextFunction, Request, Response } from 'express'
import PaymentType from '../../../domain/object-value/PaymentType'

class CustomerValidator {
  async customerSuscribePlanQueryValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { type } = req.query
    if (type === PaymentType.Cash || type === PaymentType.MercadoPago) {
      return next()
    }
    return res.status(400).send({ ok: false, message: 'Parametro Incorrecto' })
  }
}
export default CustomerValidator
