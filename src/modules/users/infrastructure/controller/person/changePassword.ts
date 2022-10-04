import { NextFunction, Request, Response } from 'express'
import User from '../../../application/Person'
import DbUser from '../../db/DbPerson'
import DbUserBase from '../../db/DbUser'
import BcryptRepository from '../../../../../shared/utils/hash'

/**
ICorlli: 2-9-2022 ✅\
Cambia la contrsenia de la persona
*/
async function changePassword(req: Request, res: Response, next: NextFunction) {
  const _User = new DbUser()
  const _Other = new DbUserBase()
  // Instanciamos el respositorio de HASHEO
  const _Hahs = new BcryptRepository()
  try {
    // Obtenemos id del usuario
    const { uid } = req.User
    // Obtenemos vieja y nueva contraseña
    const { oldPassword, newPassword } = req.body
    // Instanciamos usuario
    const lUser = new User(_User, _Hahs, _Other)
    // guardamos nueva contraseña
    await lUser.createNewPassword(uid, oldPassword, newPassword)
    return res.status(200).send({ ok: true, message: 'Contraseña actualizada' })
  } catch (err) {
    return next(err)
  }
}
export default changePassword
