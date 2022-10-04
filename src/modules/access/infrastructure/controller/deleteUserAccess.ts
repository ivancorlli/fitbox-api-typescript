import { NextFunction, Request, Response } from 'express'
import Access from '../../application/Access'
import DbAccess from '../DbAccess'
/**
 ICorlli: 2-9-2022 ✅\
 Eliimina un access por us id
*/
async function deleteUserAccess(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const _Access = new DbAccess()
  try {
    // Obtenemos id del gimnasio
    const { gid } = req.Gym
    // Obtenemos id del acceso
    const { id } = req.query

    const lAccess = new Access(_Access)
    // cBuscamos a accessos
    await lAccess.deleteAccess(id as string, gid)

    return res.status(200).send({ ok: true, message: 'Acceso eliminado' })
  } catch (err) {
    return next(err)
  }
}

export default deleteUserAccess
