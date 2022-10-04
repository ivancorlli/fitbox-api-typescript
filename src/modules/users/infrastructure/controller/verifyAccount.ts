import { NextFunction, Request, Response } from 'express'
import UserBase from '../../application/User'
import DbUserBase from '../db/DbUser'
import CryptRepository from '../../../../shared/utils/encrypt'
import TokenRepository from '../../../../shared/utils/token'

/**
 ICorlli: 2-9-2022 ✅ \
 Verifica la cuenta del usuario
*/
async function verifyAccount(req: Request, res: Response, next: NextFunction) {
  const _User = new DbUserBase()
  const Crypt = new CryptRepository()
  const Token = new TokenRepository()

  // --------------------------------- //
  try {
    // Obtenemos codigo de verificacion
    const { code } = req.body
    // Obtenemos Token de verificacion
    const { token } = req.query
    // verificamos el token
    const tokenVerified = await Token.verifyToken(token as string)
    // Desencriptamos informacion
    const decrypted = await Crypt.decrypt(tokenVerified!.payload)
    // Verificamos al usuario
    const lUser = new UserBase(_User)
    await lUser.verifyAccount(decrypted.uid, parseInt(code), decrypted.code)
    return res.status(200).send({ ok: true, message: 'Usuario verificado' })
  } catch (err) {
    return next(err)
  }
}
export default verifyAccount
