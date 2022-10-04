import { NextFunction, Request, Response } from 'express'
import User from '../../../application/Person'
import DbUser from '../../db/DbPerson'

/**
 * iCorlli: 14-8-2022 ✅\
 * Obtener datos del usuario
 */
async function getData(req: Request, res: Response, next: NextFunction) {
  // User db
  const _User = new DbUser()

  try {
    const { uid } = req.User
    const lUser = new User(_User)
    const response = await lUser.getData(uid)
    return res.status(200).send({ ok: true, response })
  } catch (err) {
    return next(err)
  }
}

export default getData
