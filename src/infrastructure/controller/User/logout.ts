import { NextFunction, Request, Response } from 'express'
import DeleteSessionById from '../../../application/use-case/session/DeleteSessionById'
import DbSession from '../../db/DbSession'
import deleteCookies from '../../utils/helper/deleteCookies'

async function logout(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio de la session
  const _Session = new DbSession()
  // Instanciamos caso de uso ELIMINAR SESION POR ID
  const deleteSession = new DeleteSessionById(_Session)
  // ------------------------------------------ //
  try {
    // obtener User Auth
    const { sid } = req.user
    // Eliminamos la session creada del usuario
    await deleteSession.start(sid)
    // Eliminamos cookies
    deleteCookies(res)
    return res.status(200).send({ ok: true, message: 'Sesion cerrada' })
  } catch (err) {
    return next(err)
  }
}
export default logout
