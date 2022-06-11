import { NextFunction, Request, Response } from 'express'
import ChangePassword from '../../../application/use-case/user/ChangePassword'
import MongoUserRepository from '../../mongo/repository/MongoUserRepository'
import BcryptRepository from '../../utils/hash'

async function userChangePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Instanciamos repositorio de hasheo
  const hashPassword = new BcryptRepository()
  // Instanciamos repositorio de usuario
  const UserDb = new MongoUserRepository()
  // Instanciamos caso de uso
  const changePassword = new ChangePassword(UserDb, hashPassword)
  try {
    // Obtenemos vieja y nueva contraseña
    const { id, oldPassword, newPassword } = req.body
    // guardamos nueva contraseña
    await changePassword.start(id, oldPassword, newPassword)
    return res.status(201).send({ ok: true, message: 'Contraseña actualizada' })
  } catch (err) {
    next(err)
  }
}
export default userChangePassword
