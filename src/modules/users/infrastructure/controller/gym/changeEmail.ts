import { NextFunction, Request, Response } from 'express'
import Gym from '../../../application/Gym'
import DbGym from '../../db/DbGym'
import DbUserBase from '../../db/DbUser'
import ProduceUser from '../../events/ProduceUser'

/**
 * iCorlli: 13-8-2022 ✅\
 * Cambia emial del usuario
 */
async function changeEmail(req: Request, res: Response, next: NextFunction) {
  // Instanciamos Repositorio de usuario
  const _User = new DbGym()
  const _Other = new DbUserBase()
  try {
    // Obtenemos id del usuario
    const { gid } = req.Gym
    // Obtenemos el nuevo email
    const { newEmail } = req.body
    // instanciamos el usuario
    const lUser = new Gym(_User, undefined, _Other)
    // Actualizamos el nuevo email y guardamos en base de datos
    const userUpdated = await lUser.changeEmail(gid, newEmail)
    // Creamos evento CAMBIO DE EMAIL
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
