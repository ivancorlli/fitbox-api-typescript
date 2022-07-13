import { NextFunction, Request, Response } from 'express'
import { UserRoles } from '../../config/config'

async function requireGym(req: Request, res: Response, next: NextFunction) {
  // Obtenemos id
  const { role } = req.user
  try {
    if (role !== UserRoles.gym) {
      return res.status(403).send({ ok: false, message: 'No tienes permisos' })
    }
    return next()
  } catch (err) {
    return res
      .status(500)
      .send({ ok: false, message: 'Se produjo un error interno' })
  }
}

export default requireGym
