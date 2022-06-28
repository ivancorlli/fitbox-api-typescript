import { NextFunction, Request, Response } from 'express'
import UpdateStatus from '../../../application/use-case/user/UpdateStatus'

import { UserStatus } from '../../../domain/object-value/UserStatus'
import MongoUserRepository from '../../mongo/repository/MongoUserRepository'

async function userSuspendAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Instanciamos repositorio del usuario
  const User = new MongoUserRepository()
  // Instanciamos caso de uso CAMBIAR ESTADO DEL USUARIO
  const changeStatus = new UpdateStatus(User)
  // obtenemos id del usuario
  const { uid } = req.user
  try {
    // Suspendemos cuenta del usuario
    await changeStatus.start(uid, UserStatus.Suspended)
    // TODO NOTIFICAR A LOS CLIENTES INSCRIPTOS EN EL GIMNASIO
    return res
      .status(200)
      .send({ ok: true, message: 'Su cuenta ha sido suspendida temporalmente' })
  } catch (err) {
    return next(err)
  }
}

export default userSuspendAccount
