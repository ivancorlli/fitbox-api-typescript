import { NextFunction, Request, Response } from 'express'
import ChangeOldPassword from '../../../application/use-case/user/ChangeOldPassword'
import MongoUserRepository from '../../mongo/repository/MongoUserRepository'
import BcryptRepository from '../../utils/hash'

async function userChangeOldPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Obtenemos vieja y nueva contraseña
  const { id, oldPassword, newPassword } = req.body
  // Instanciamos repositorio de hasheo
  const hashPassword = new BcryptRepository()
  // Instanciamos repositorio de usuario
  const UserDb = new MongoUserRepository()
  // Instanciamos caso de uso
  const changePassword = new ChangeOldPassword(UserDb, hashPassword)
  try {
    // guardamos nueva contraseña
    await changePassword.start(id, oldPassword, newPassword)
    return res.status(201).send({ ok: true, message: 'Contraseña actualizada' })
  } catch (err) {
    next(err)
  }
}
export default userChangeOldPassword
