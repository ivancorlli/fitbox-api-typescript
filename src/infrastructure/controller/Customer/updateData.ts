import { NextFunction, Request, Response } from 'express'
import UpdateData from '../../../application/use-case/customer/UpdateData'
import DbCustomer from '../../db/DbCustomer'

async function updateData(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio de Gimnasio
  const _Customer = new DbCustomer()
  // Instnaciamos caso de uso ACTUALIZAR DATOS DEL USUARIO
  const updateData = new UpdateData(_Customer)

  try {
    // obtenemos uid
    const { uid } = req.user
    // obtenemos parametros a actualizar
    const {
      name,
      surname,
      gender,
      birth,
      country,
      city,
      state,
      postalCode,
      areaCode,
      phoneNumber
    } = req.body

    // Actualizamos al usuario
    const customerUpdated = await updateData.start(
      uid,
      name,
      surname,
      gender,
      birth,
      country,
      city,
      state,
      postalCode,
      areaCode,
      phoneNumber
    )
    return res
      .status(200)
      .send({ ok: true, message: 'Cambios guardados', customerUpdated })
  } catch (err) {
    return next(err)
  }
}

export default updateData
