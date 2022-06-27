import { NextFunction, Request, Response } from 'express'
import { GymPhone } from '../../../domain/entity/Gym'

import MongoGymRepository from '../../mongo/repository/MongoGymRepository'

async function gymUpdatePhone(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio de Gimnasio
  const _Gym = new MongoGymRepository()
  try {
    // obtenemos uid
    const { uid } = req.user
    // obtenemos parametros a actualizar
    let { areaCode, phoneNumber } = req.body

    // Sanitizamos los datos enviados
    if (areaCode) {
      areaCode = areaCode.trim()
    }
    if (phoneNumber) {
      phoneNumber = phoneNumber.trim()
    }
    // Datos a actualizar
    const phone: GymPhone = {
      areaCode,
      phoneNumber
    }
    // Actualizamos al usuario
    const gymUpdated = await _Gym.updateById(
      uid,
      { phone },
      { ignoreUndefined: true }
    )
    return res
      .status(200)
      .send({ ok: true, message: 'Cambios guardados', gymUpdated })
  } catch (err) {
    return next(err)
  }
}

export default gymUpdatePhone
