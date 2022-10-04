import { NextFunction, Request, Response } from 'express'
import Access from '../../application/Access'
import DbAccess from '../DbAccess'
/**
 ICorlli: 2-9-2022 ✅\
 Crea un nuevo access
*/
async function newUserAccess(req: Request, res: Response, next: NextFunction) {
  const _Access = new DbAccess()
  try {
    // Obtenemos id del gimnasio
    const { gid } = req.Gym
    // Obtenemos tipo de accesso y el id del usuario al que se asigna el rol
    const { type, id } = req.query
    const lAccess = new Access(_Access)

    // creamos nuevo accesso
    await lAccess.createAccess(gid, id as string, type as string)

    return res.status(201).send({ ok: true, message: 'Acceso creado' })
  } catch (err) {
    return next(err)
  }
}

export default newUserAccess
