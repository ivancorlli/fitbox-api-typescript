import { NextFunction, Request, Response } from 'express'
import { GymProfile } from '../../../domain/entity/Gym'

import MongoGymRepository from '../../mongo/repository/MongoGymRepository'

async function gymUpdateProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Instanciamos repositorio de Gimnasio
  const _Gym = new MongoGymRepository()
  try {
    // obtenemos uid
    const { uid } = req.user
    // obtenemos parametros a actualizar
    let { name, trainings, description, profileImage } = req.body

    // Sanitizamos los datos enviados
    if (name) {
      name = name.toLowerCase().trim()
    }
    if (trainings) {
      trainings = trainings.split(',')
    }
    if (description) {
      description = description.trim()
    }
    // Datos a actualizar
    const profile: GymProfile = {
      name,
      trainings,
      description,
      profileImage
    }
    // Actualizamos al usuario
    const gymUpdated = await _Gym.updateById(
      uid,
      { profile },
      { ignoreUndefined: true }
    )
    return res
      .status(200)
      .send({ ok: true, message: 'Cambios guardados', gymUpdated })
  } catch (err) {
    return next(err)
  }
}

export default gymUpdateProfile
