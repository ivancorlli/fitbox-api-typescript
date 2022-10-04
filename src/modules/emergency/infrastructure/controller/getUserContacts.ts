import { NextFunction, Request, Response } from 'express'
import Emergency from '../../application/Emergency'
import DbEmergency from '../DbEmergency'
/**
 ICorlli: 2-9-2022 ✅\
 Obtiene todos los contactos de un usuario
*/
async function getUserContacts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Emergency Db
  const _Emeregency = new DbEmergency()
  try {
    // Obtenemos id del usuario
    const { uid } = req.User
    // Buscamos los contactos del usuario
    const lEmergency = new Emergency(_Emeregency)
    const response = await lEmergency.getUserContacts(uid)
    return res.status(200).send({ ok: true, response })
  } catch (err) {
    return next(err)
  }
}

export default getUserContacts
