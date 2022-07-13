import { NextFunction, Request, Response } from 'express'
import ChangeOldPassword from '../../../application/use-case/user/ChangeOldPassword'
import DbUser from '../../db/DbUser'
import BcryptRepository from '../../utils/hash'

async function changePassword(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio de usuario
  const _User = new DbUser()
  // Instanciamos el respositorio de HASHEO
  const _Hahs = new BcryptRepository()
  // Instanciamos caso de uso
  const changePassword = new ChangeOldPassword(_User, _Hahs)
  try {
    // Obtenemos id del usuario
    const { uid } = req.user
    // Obtenemos vieja y nueva contraseña
    const { oldPassword, newPassword } = req.body
    // guardamos nueva contraseña
    await changePassword.start(uid, oldPassword, newPassword)
    return res.status(201).send({ ok: true, message: 'Contraseña actualizada' })
  } catch (err) {
    return next(err)
  }
}
export default changePassword
