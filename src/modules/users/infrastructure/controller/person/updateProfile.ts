import { NextFunction, Request, Response } from 'express'
import User from '../../../application/Person'
import DbUser from '../../db/DbPerson'

/**
 * iCorlli: 13-8-2022 ✅ \
 * Actualiza el perfil del usuario
 */
async function updateProfile(req: Request, res: Response, next: NextFunction) {
  const _User = new DbUser()

  try {
    // obtenemos uid
    const { uid } = req.User
    // obtenemos parametros a actualizar
    const {
      name,
      surname,
      gender,
      birth,
      biography,
      country,
      city,
      state,
      postalCode,
      areaCode,
      phoneNumber,
      allergies,
      disabilities
    } = req.body

    // Actualizamos al usuario
    // Definimos gimnasio
    const lUser = new User(_User)
    // Actualizamos al usuario
    await lUser.updateProfile(
      uid,
      name,
      surname,
      gender,
      birth,
      biography,
      country,
      city,
      state,
      postalCode,
      areaCode,
      phoneNumber,
      allergies,
      disabilities
    )
    return res.status(200).send({ ok: true, message: 'Cambios guardados' })
  } catch (err) {
    return next(err)
  }
}

export default updateProfile
