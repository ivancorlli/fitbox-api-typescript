import { NextFunction, Request, Response } from 'express'
import UserBase from '../../application/User'
import DbUserBase from '../db/DbUser'
import CryptRepository from '../../../../shared/utils/encrypt'
import BcryptRepository from '../../../../shared/utils/hash'
import TokenRepository from '../../../../shared/utils/token'

/**
 ICorlli: 2-9-2022 ✅ \
 Recupera la contrasenia del usuario

*/
async function resetPassword(req: Request, res: Response, next: NextFunction) {
  // Instanciamos Repositorio del uusario
  const _User = new DbUserBase()
  // Instanciamos el respositorio de HASHEO
  const _Hash = new BcryptRepository()
  // Instanciamos el respositorio de ENCRIPTADO
  const _Crypt = new CryptRepository()
  // Instanciamos el respositorio de Token
  const _Token = new TokenRepository()
  try {
    // Obtenemos nueva contrasenia
    const { newPassword } = req.body
    // Obtenemos token
    const { token } = req.query
    // Verificamos el token enviado
    const tokenVerified = await _Token.verifyToken(token as string)
    // Desencriptamos la informacion
    const decripted = await _Crypt.decrypt(tokenVerified!.payload)
    // Definimos usuario
    const lUser = new UserBase(_User, _Hash)
    // Actualizamos contrasenia
    await lUser.recoverPassword(decripted.uid, newPassword)
    return res.status(200).send({ ok: true, message: 'Contraseña actualizada' })
  } catch (err) {
    return next(err)
  }
}
export default resetPassword
