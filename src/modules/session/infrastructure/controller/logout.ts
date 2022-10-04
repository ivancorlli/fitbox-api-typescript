import { NextFunction, Request, Response } from 'express'
import Session from '../../application/Session'
import DbSession from '../DbSession'
import deleteCookies from '../../../../shared/helper/deleteCookies'
import deleteGymCookies from '../../../../shared/helper/deleteGymCookies'

/**
 * iCorlli: 13-8-2022 ✅ \
 * Cierra sesion del usuario
 */
async function logout(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio de la session
  const _Session = new DbSession()
  // ------------------------------------------ //
  try {
    // obtener User Auth
    const { sid } = req.User
    // Obtenemos datos de la session del gimnasio
    const GymAuth = req.Gym
    // Definimos session
    const lSession = new Session(_Session)
    // Eliminamos la session creada del usuario
    await lSession.deleteById(sid)
    // Eliminamos cookies
    deleteCookies(res)

    // Si el usuario tiene session de gimnasio, tambien la cerramos, por que si la dejamos abierta crea un problema de seguridad
    if (GymAuth) {
      if (GymAuth.sid) {
        await lSession.deleteById(GymAuth.sid)
        deleteGymCookies(res)
      }
    }

    return res.status(200).send({ ok: true, message: 'Sesion cerrada' })
  } catch (err) {
    return next(err)
  }
}
export default logout
