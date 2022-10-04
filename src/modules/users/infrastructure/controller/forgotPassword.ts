import { NextFunction, Request, Response } from 'express'
import UserBase from '../../application/User'
import DbUserBase from '../db/DbUser'
import ProduceUser from '../events/ProduceUser'

/**
 ICorlli: 2-9-2022 ✅\
 Envia un correo electronico para recuperar contrasenia
*/
async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const _User = new DbUserBase()
    // ---------------------------------------- //
    // Obetenemos email del usuario
    const { email } = req.body
    // Instanciamos usuario
    const lUser = new UserBase(_User)
    // Bucamos si existe el email enviado
    const userFound = await lUser.findByEmail(email)
    // Creamos evento olvido contrasenia
    const msg: object = {
      uid: userFound.uuid,
      email: userFound.account.email
    }
    await ProduceUser.forgotPassword(Buffer.from(JSON.stringify(msg)))

    return res.status(202).send({
      ok: true,
      message: `Hemos enviado un email de recuperacion a ${userFound.account.email}`
    })
  } catch (err) {
    return next(err)
  }
}
export default forgotPassword
