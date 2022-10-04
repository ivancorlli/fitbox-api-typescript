import { NextFunction, Request, Response } from 'express'
import Emergency from '../../application/Emergency'
import DbEmergency from '../DbEmergency'
/**
 ICorlli: 2-9-2022 ✅\
 Actualiza los datos de contacto
*/
async function updateContact(req: Request, res: Response, next: NextFunction) {
  // Emergency Db
  const _Emeregency = new DbEmergency()
  try {
    // Obtenemos id del usuario
    const { uid } = req.User
    // Obtenemos id del contacto
    const { id } = req.query
    // Obtenemos parametros
    const { name, surname, gender, relation, areaCode, phoneNumber } = req.body
    // Buscamos los contactos del usuario
    const lEmergency = new Emergency(_Emeregency)
    await lEmergency.updateContact(
      id as string,
      uid,
      name,
      surname,
      gender,
      relation,
      parseInt(areaCode),
      parseInt(phoneNumber)
    )
    return res.status(200).send({ ok: true, message: 'Contacto actualizado' })
  } catch (err) {
    return next(err)
  }
}

export default updateContact
