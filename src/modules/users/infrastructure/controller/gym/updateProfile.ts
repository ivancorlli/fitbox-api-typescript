import { NextFunction, Request, Response } from 'express'
import Gym from '../../../application/Gym'
import DbGym from '../../db/DbGym'

/**
 * iCorlli: 13-8-2022 ✅ \
 * Actualiza el perfil del usuario
 */
async function updateProfile(req: Request, res: Response, next: NextFunction) {
  const _Gym = new DbGym()

  try {
    // obtenemos id del gimnasio
    const { gid } = req.Gym
    // obtenemos parametros a actualizar
    const {
      name,
      biography,
      country,
      city,
      state,
      postalCode,
      areaCode,
      phoneNumber
    } = req.body
    let { trainings } = req.body

    // Actualizamos al usuario
    // Definimos gimnasio
    const lGym = new Gym(_Gym)
    // Actualizamos al usuario
    trainings = trainings ? trainings.split(',') : []
    await lGym.updateProfile(
      gid,
      name,
      trainings,
      biography,
      country,
      city,
      state,
      postalCode,
      areaCode,
      phoneNumber
    )
    return res.status(200).send({ ok: true, message: 'Cambios guardados' })
  } catch (err) {
    return next(err)
  }
}

export default updateProfile
