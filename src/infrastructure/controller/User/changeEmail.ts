import { NextFunction, Request, Response } from 'express'
import ChangeEmail from '../../../application/use-case/user/ChangeEmail'
import DbUser from '../../db/DbUser'

async function changeEmail(req: Request, res: Response, next: NextFunction) {
  // Instanciamos Repositorio de usuario
  const _User = new DbUser()
  // instanciamos caso de uso CAMBIAR EMAIL
  const changeEmail = new ChangeEmail(_User)
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
export default changeEmail
