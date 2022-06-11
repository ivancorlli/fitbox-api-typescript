import { NextFunction, Request, Response } from 'express'

async function requireUser(req: Request, res: Response, next: NextFunction) {
  // Obtenemos el usuario del request
  const User = req.user
  // Si no viene el user arrojamos un error
  if (!User) {
    return res
      .status(403)
      .send({ ok: false, message: 'No tienes credenciales necesarias' })
  }
  return next()
}

export default requireUser
