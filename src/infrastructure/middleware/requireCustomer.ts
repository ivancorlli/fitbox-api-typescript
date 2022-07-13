import { NextFunction, Request, Response } from 'express'
import { UserRoles } from '../../config/config'
import DbCustomerRepository from '../db/DbCustomer'

async function requireCustomer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Obtenemos id
  const { uid } = req.user
  // Instanciamos repositorio del gymnasio
  const Customer = new DbCustomerRepository()
  try {
    // Buscamos el usuario
    const customer = await Customer.getById(uid)
    if (!customer || customer.role !== UserRoles.customer) {
      return res.status(403).send({ ok: false, message: 'No tienes permisos' })
    }
    return next()
  } catch (err) {
    return res
      .status(500)
      .send({ ok: false, message: 'Se produjo un error interno' })
  }
}

export default requireCustomer
