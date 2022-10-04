import { NextFunction, Request, Response } from 'express'
import User from '../../../application/Person'
import DbUser from '../../db/DbPerson'

/**
 * iCorlli: 22-8-2022 ✅\
 * Filtra usuarios por email o nombre de usuario
 */
async function searchUser(req: Request, res: Response, next: NextFunction) {
  // User db
  const _User = new DbUser()

  try {
    const { name } = req.query
    const lUser = new User(_User)
    const response = await lUser.filterByEmailUsername(name as string, 'Person')
    return res.status(200).send({ ok: true, response })
  } catch (err) {
    return next(err)
  }
}

export default searchUser
