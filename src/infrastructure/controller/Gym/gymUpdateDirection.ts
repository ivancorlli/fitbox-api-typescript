import { NextFunction, Request, Response } from 'express'
import { GymDirection } from '../../../domain/entity/Gym'

import MongoGymRepository from '../../mongo/repository/MongoGymRepository'

async function gymUpdateDirection(
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
    let { country, city, state, street, streetNumber, postalCode } = req.body

    // Sanitizamos los datos enviados
    if (country) {
      country = country.toLowerCase().trim()
    }
    if (city) {
      city = city.toLowerCase().trim()
    }
    if (state) {
      state = state.toLowerCase().trim()
    }
    if (street) {
      street = street.toLowerCase().trim()
    }
    if (streetNumber) {
      streetNumber = streetNumber.trim()
    }
    if (postalCode) {
      postalCode = postalCode.trim()
    }
    // Datos a actualizar
    const direction: GymDirection = {
      country,
      city,
      state,
      street,
      streetNumber,
      postalCode
    }
    // Actualizamos al usuario
    const gymUpdated = await _Gym.updateById(
      uid,
      { direction },
      { ignoreUndefined: true }
    )
    return res
      .status(200)
      .send({ ok: true, message: 'Cambios guardados', gymUpdated })
  } catch (err) {
    return next(err)
  }
}

export default gymUpdateDirection
