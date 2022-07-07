import { NextFunction, Request, Response } from 'express'
import DeleteSessionById from '../../../application/use-case/session/DeleteSessionById'
import DbSessionRepository from '../../mongo/repository/DbSessionRepository'

async function userLogout(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio de la session
  const Session = new DbSessionRepository()
  // Instanciamos caso de uso ELIMINAR SESION POR ID
  const deleteSession = new DeleteSessionById(Session)
  // ------------------------------------------ //
  try {
    // obtener User Auth
    const { sid } = req.user
    // Eliminamos la session creada del usuario
    await deleteSession.start(sid)
    // Eliminamos access Cookie
    res.cookie('accessToken', {
      maxAge: 0,
      httpOnly: true,
      sameSite: true
    })
    // Eliminamos refresh Cookie
    res.cookie('refreshToken', {
      maxAge: 0,
      httpOnly: true,
      sameSite: true
    })
    return res.status(200).send({ ok: true, message: 'Sesion cerrada' })
  } catch (err) {
    return next(err)
  }
}
export default userLogout
