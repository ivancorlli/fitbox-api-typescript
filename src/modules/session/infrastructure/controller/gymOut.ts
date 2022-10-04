import { NextFunction, Request, Response } from 'express'
import Session from '../../application/Session'
import DbSession from '../DbSession'
import deleteGymCookies from '../../../../shared/helper/deleteGymCookies'

/**
 * iCorlli: 13-8-2022 ✅ \
 * Cierra sesion del gimnasio
 */
async function GymOut(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio de la session
  const _Session = new DbSession()
  // ------------------------------------------ //
  try {
    // obtener User Auth
    const { sid } = req.Gym
    // Definimos session
    const lSession = new Session(_Session)
    // Eliminamos la session creada del usuario
    await lSession.deleteById(sid)
    // Eliminamos cookies
    deleteGymCookies(res)
    return res.status(200).send({ ok: true, message: 'Sesion cerrada' })
  } catch (err) {
    return next(err)
  }
}
export default GymOut
