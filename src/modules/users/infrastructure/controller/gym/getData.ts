import { NextFunction, Request, Response } from 'express'
import Gym from '../../../application/Gym'
import DbGym from '../../db/DbGym'

/**
 * iCorlli: 14-8-2022 ✅\
 * Obtener datos del gimnasio
 */
async function getData(req: Request, res: Response, next: NextFunction) {
  // Gym db
  const _Gym = new DbGym()

  try {
    // id del usuario que crea el gimnasio
    const { gid } = req.Gym

    // Creamos nuevo gimnasio
    const lGym = new Gym(_Gym)
    const gymFound = await lGym.getData(gid)
    return res.status(200).send({ ok: true, response: gymFound })
  } catch (err) {
    return next(err)
  }
}

export default getData
