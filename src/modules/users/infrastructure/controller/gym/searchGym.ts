import { NextFunction, Request, Response } from 'express'
import Gym from '../../../application/Gym'
import DbGym from '../../db/DbGym'

/**
 * iCorlli: 22-8-2022 ✅\
 * Filtra gimnasios por email o nombre de usuario o nombre de perfil
 */
async function searchGym(req: Request, res: Response, next: NextFunction) {
  // User db
  const _User = new DbGym()

  try {
    const { name } = req.query
    const lUser = new Gym(_User)
    const response = await lUser.filterByEmailUsername(name as string, 'Gym')
    return res.status(200).send({ ok: true, response })
  } catch (err) {
    return next(err)
  }
}

export default searchGym
