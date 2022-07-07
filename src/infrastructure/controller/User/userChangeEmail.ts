import { NextFunction, Request, Response } from 'express'
import ChangeEmail from '../../../application/use-case/user/ChangeEmail'
import DbUserRepository from '../../mongo/repository/DbUserRepository'

async function userChangeEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Instanciamos Repositorio de usuario
  const UserDb = new DbUserRepository()
  // instanciamos caso de uso CAMBIAR EMAIL
  const changeEmail = new ChangeEmail(UserDb)
  // Obtenemos id del usuario
  const { uid } = req.user
  // Obtenemos el nuevo email
  const { newEmail } = req.body
  try {
    // Actualizamos el nuevo email y guardamos en base de datos
    await changeEmail.start(uid, newEmail)
    return res.status(200).send({ ok: true, message: 'Email Actualizado' })
  } catch (err) {
    return next(err)
  }
}
export default userChangeEmail
