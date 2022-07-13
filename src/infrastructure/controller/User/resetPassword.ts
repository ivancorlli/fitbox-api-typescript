import { NextFunction, Request, Response } from 'express'
import DbUser from '../../db/DbUser'
import CryptRepository from '../../utils/encrypt'
import TokenRepository from '../../utils/token'
import BcryptRepository from '../../utils/hash'
import RecoverPassword from '../../../application/use-case/user/RecoverPassword'

async function resetPassword(req: Request, res: Response, next: NextFunction) {
  // Instanciamos Repositorio del uusario
  const _User = new DbUser()
  // Instanciamos el respositorio de HASHEO
  const _Hash = new BcryptRepository()
  // Instanciamos el respositorio de ENCRIPTADO
  const _Crypt = new CryptRepository()
  // Instanciamos el respositorio de Token
  const _Token = new TokenRepository()
  // Instanciamos caso de uso CAMBIAR CONTRASENIA
  const recoverPassword = new RecoverPassword(_User, _Hash)
  try {
    // Obtenemos nueva contrasenia
    const { newPassword } = req.body
    // Obtenemos token
    const { token } = req.params
    // Verificamos el token enviado
    const tokenVerified = await _Token.verifyToken(token)
    // Desencriptamos la informacion
    const decripted = await _Crypt.decrypt(tokenVerified!.payload)
    // Actualizamos contrasenia
    await recoverPassword.start(decripted.uid, newPassword)
    return res.status(200).send({ ok: true, message: 'Contraseña actualizada' })
  } catch (err) {
    return next(err)
  }
}
export default resetPassword
