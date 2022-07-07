import { NextFunction, Request, Response } from 'express'
import ChangeOldPassword from '../../../application/use-case/user/ChangeOldPassword'
import DbUserRepository from '../../mongo/repository/DbUserRepository'
import BcryptRepository from '../../utils/hash'

async function userChangePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Instanciamos repositorio de usuario
  const UserDb = new DbUserRepository()
  // Instanciamos el respositorio de HASHEO
  const HashRepository = new BcryptRepository()
  // Instanciamos caso de uso
  const changePassword = new ChangeOldPassword(UserDb, HashRepository)
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
export default userChangePassword
