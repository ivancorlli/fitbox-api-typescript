import { NextFunction, Request, Response } from 'express'
import Emergency from '../../application/Emergency'
import DbEmergency from '../DbEmergency'
/**
 ICorlli: 2-9-2022 ✅\
 Crea un nuevo contacto
*/
async function newContact(req: Request, res: Response, next: NextFunction) {
  // Emergency Db
  const _Emeregency = new DbEmergency()
  try {
    // Obtenemos id del usuario
    const { uid } = req.User
    // Obtenemos parametros
    const { name, surname, gender, relation, areaCode, phoneNumber } = req.body
    // Buscamos los contactos del usuario
    const lEmergency = new Emergency(_Emeregency)
    await lEmergency.createNew(
      uid,
      name,
      surname,
      gender,
      relation,
      parseInt(areaCode),
      parseInt(phoneNumber)
    )
    return res.status(201).send({ ok: true, message: 'Contacto creado' })
  } catch (err) {
    return next(err)
  }
}

export default newContact
