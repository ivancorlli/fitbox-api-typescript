import { NextFunction, Request, Response } from 'express'
import User from '../../../application/Person'
import DbUser from '../../db/DbPerson'
import DbUserBase from '../../db/DbUser'

/**
 * iCorlli: 13-8-2022 ✅\
 * Cambia username del usuario
 */
async function changeUsername(req: Request, res: Response, next: NextFunction) {
  // Instanciamos Repositorio de usuario
  const _User = new DbUser()
  const _Other = new DbUserBase()

  try {
    // Obtenemos id del usuario
    const { uid } = req.User
    // Obtenemos el nuevo email
    const { username } = req.body
    // instanciamos el usuario
    const lUser = new User(_User, undefined, _Other)
    // Actualizamos el nuevo email y guardamos en base de datos
    await lUser.changeUsername(uid, username)

    return res.status(200).send({
      ok: true,
      message: 'Username actualizado'
    })
  } catch (err) {
    return next(err)
  }
}
export default changeUsername
