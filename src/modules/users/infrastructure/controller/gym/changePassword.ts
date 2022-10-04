import { NextFunction, Request, Response } from 'express'
import Gym from '../../../application/Gym'
import DbGym from '../../db/DbGym'
import DbUserBase from '../../db/DbUser'
import BcryptRepository from '../../../../../shared/utils/hash'

/**
 * iCorlli: 13-8-2022 ✅\
 * Cambia password del usuario
 */
async function changePassword(req: Request, res: Response, next: NextFunction) {
  const _User = new DbGym()
  const _Other = new DbUserBase()
  // Instanciamos el respositorio de HASHEO
  const _Hahs = new BcryptRepository()
  try {
    // Obtenemos id del usuario
    const { gid } = req.Gym
    // Obtenemos vieja y nueva contraseña
    const { oldPassword, newPassword } = req.body
    // Instanciamos usuario
    const lUser = new Gym(_User, _Hahs, _Other)
    // guardamos nueva contraseña
    await lUser.createNewPassword(gid, oldPassword, newPassword)
    return res.status(200).send({ ok: true, message: 'Contraseña actualizada' })
  } catch (err) {
    return next(err)
  }
}
export default changePassword
