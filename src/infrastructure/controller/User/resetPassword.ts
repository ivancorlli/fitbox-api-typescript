import { NextFunction, Request, Response } from 'express'
import MongoUserRepository from '../../mongo/repository/MongoUserRepository'
import CryptRepository from '../../utils/encrypt'
import TokenRepository from '../../utils/token'
import BcryptRepository from '../../utils/hash'
import RecoverPassword from '../../../application/use-case/user/RecoverPassword'

async function resetPassword(req: Request, res: Response, next: NextFunction) {
  // Instanciamos Repositorio del uusario
  const UserDb = new MongoUserRepository()
  // Instanciamos Repositorio de hasheo
  const HashPass = new BcryptRepository()
  // Instanciamos Repositorio de encriptado
  const Crypt = new CryptRepository()
  // Instanciamos Repositorio de token
  const Token = new TokenRepository()
  // Instanciamos caso de uso CAMBIAR CONTRASENIA
  const changePassowrd = new RecoverPassword(UserDb, HashPass)
  try {
    // Obtenemos nueva contrasenia
    const { newPassword } = req.body
    // Obtenemos token
    const { token } = req.params
    // Verificamos el token enviado
    const tokenVerified = await Token.verifyToken(token)
    // Desencriptamos la informacion
    const decripted = await Crypt.decrypt(tokenVerified!.payload)
    // Actualizamos contrasenia
    await changePassowrd.start(decripted!.uid, newPassword)
    return res.status(200).send({ ok: true, message: 'Contraseña actualizada' })
  } catch (err) {
    next(err)
  }
}
export default resetPassword