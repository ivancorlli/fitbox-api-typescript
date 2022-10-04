import { NextFunction, Request, Response } from 'express'

async function requireUser(req: Request, res: Response, next: NextFunction) {
  // Obtenemos el usuario del request
  const UserAuth = req.User
  // Si no viene el UserAuth arrojamos un error
  if (!UserAuth) {
    return res
      .status(403)
      .send({ ok: false, message: 'No tienes credenciales necesarias' })
  }
  return next()
}

export default requireUser
