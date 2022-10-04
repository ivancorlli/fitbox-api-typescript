import { NextFunction, Request, Response } from 'express'
import Access from '../../application/Access'
import DbAccess from '../DbAccess'
/**
 ICorlli: 2-9-2022 ✅\
 Obtiene todos los access de un gimansio
*/
async function getGymAccesses(req: Request, res: Response, next: NextFunction) {
  const _Access = new DbAccess()
  try {
    // Obtenemos id del gimnasio
    const { gid } = req.Gym

    const lAccess = new Access(_Access)
    // cBuscamos a accessos
    const response = await lAccess.findAllGymAccess(gid)

    return res.status(200).send({ ok: true, response })
  } catch (err) {
    return next(err)
  }
}

export default getGymAccesses
