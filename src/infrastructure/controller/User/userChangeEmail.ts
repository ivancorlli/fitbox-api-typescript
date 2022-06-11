import { NextFunction, Request, Response } from 'express'
import ChangeEmail from '../../../application/use-case/user/ChangeEmail'
import MongoUserRepository from '../../mongo/repository/MongoUserRepository'

async function userChangeEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Instanciamos Repositorio de usuario
  const UserDb = new MongoUserRepository()
  // instanciamos caso de uso CAMBIAR EMAIL
  const changeEmail = new ChangeEmail(UserDb)
  // Obtenemos el nuevo email
  const { id, newEmail } = req.body
  try {
    // Actualizamos el nuevo email y guardamos en base de datos
    await changeEmail.start(id, newEmail)
    return res.status(200).send({ ok: true, message: 'Email Actualizado' })
  } catch (err) {
    next(err)
  }
}
export default userChangeEmail
