import { NextFunction, Request, Response } from 'express'
import Access from '../../application/Access'
import DbAccess from '../DbAccess'
/**
 ICorlli: 2-9-2022 ✅\
 Actualiza los datos de un access
*/
async function updateUserAccess(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const _Access = new DbAccess()
  try {
    // Obtenemos id del gimnasio
    const { gid } = req.Gym
    // Obtenemos id del acceso
    const { id, type } = req.query

    const lAccess = new Access(_Access)
    // Actualizamos access
    await lAccess.updateAccess(id as string, gid, type as string)

    return res.status(200).send({ ok: true, message: 'Acceso modificado' })
  } catch (err) {
    return next(err)
  }
}

export default updateUserAccess
