import { NextFunction, Request, Response } from 'express'
import User from '../../../application/Person'
import DbPerson from '../../db/DbPerson'
import DbUserBase from '../../db/DbUser'
import ProduceUser from '../../events/ProduceUser'

/**
 * iCorlli: 13-8-2022 ✅\
 * Cambia emial del usuario
 */
async function changeEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const _User = new DbPerson()
    const _Other = new DbUserBase()
    // Obtenemos id del usuario
    const { uid } = req.User
    // Obtenemos el nuevo email
    const { newEmail } = req.body
    // instanciamos el usuario
    const lUser = new User(_User, undefined, _Other)
    // Actualizamos el nuevo email y guardamos en base de datos
    const userUpdated = await lUser.changeEmail(uid, newEmail)
    // Creamos evento nuevo usuario para enviar email
    const msg: object = {
      uid: userUpdated.uuid,
      email: userUpdated.account.email
    }
    await ProduceUser.changeEmail(Buffer.from(JSON.stringify(msg)))
    return res.status(202).send({
      ok: true,
      message: `Hemos enviado un email de confirmacion a ${userUpdated.account.email}`
    })
  } catch (err) {
    return next(err)
  }
}
export default changeEmail
