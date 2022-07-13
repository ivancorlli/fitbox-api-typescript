import { NextFunction, Request, Response } from 'express'
import UpdateData from '../../../application/use-case/gym/UpdateData'

import DbGym from '../../db/DbGym'

async function updateData(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio de Gimnasio
  const _Gym = new DbGym()
  // Instnaciamos caso de uso ACTUALIZAR DATOS DEL USUARIO
  const updateData = new UpdateData(_Gym)

  try {
    // obtenemos uid
    const { uid } = req.user
    // obtenemos parametros a actualizar
    const {
      name,
      trainings,
      description,
      country,
      city,
      state,
      street,
      streetNumber,
      postalCode,
      areaCode,
      phoneNumber
    } = req.body

    // Actualizamos al usuario
    const gymUpdated = await updateData.start(
      uid,
      name,
      trainings,
      description,
      country,
      city,
      state,
      street,
      streetNumber,
      postalCode,
      areaCode,
      phoneNumber
    )
    return res
      .status(200)
      .send({ ok: true, message: 'Cambios guardados', gymUpdated })
  } catch (err) {
    return next(err)
  }
}

export default updateData
