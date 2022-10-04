import { NextFunction, Request, Response } from 'express'
import Emergency from '../../application/Emergency'
import DbEmergency from '../DbEmergency'
/**
 ICorlli: 2-9-2022 ✅\
 Elimina un contacto por su id
*/
async function deleteContact(req: Request, res: Response, next: NextFunction) {
  // Emergency Db
  const _Emeregency = new DbEmergency()
  try {
    // Obtenemos id del usuario
    const { uid } = req.User
    // Obtenemos id del contacto
    const { id } = req.query

    // Buscamos los contactos del usuario
    const lEmergency = new Emergency(_Emeregency)
    await lEmergency.deleteContact(id as string, uid)
    return res.status(200).send({ ok: true, message: 'Contacto eliminado' })
  } catch (err) {
    return next(err)
  }
}

export default deleteContact
