import { NextFunction, Request, Response } from 'express'

async function requireGym(req: Request, res: Response, next: NextFunction) {
  // Obtenemos el usuario del request
  const Gym = req.Gym
  // Si no viene el Auth arrojamos un error
  if (!Gym) {
    return res
      .status(403)
      .send({ ok: false, message: 'No tienes credenciales necesarias' })
  }
  return next()
}

export default requireGym
