import { NextFunction, Request, Response } from 'express'
import VerifyUser from '../../../application/use-case/user/VerifyUser'
import CustomError from '../../../domain/exception/CustomError'
import MongoClientRepository from '../../mongo/repository/MongoClientRepository'
import CryptRepository from '../../utils/encrypt'
import TokenRepository from '../../utils/token'
async function userVerification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Instanciamos Repositorio del Usuario
  const UserDb = new MongoClientRepository()
  // Instanciamos el respositorio de ENCRIPTADO
  const Crypt = new CryptRepository()
  // Instanciamos el respositorio de Token
  const Token = new TokenRepository()
  // Instanciamos caso de uso
  const verify = new VerifyUser(UserDb)
  // --------------------------------- //
  // Obtenemos codigo de verificacion
  const { code } = req.body
  // Obtenemos Token de verificacion
  const { token } = req.params
  try {
    // verificamos el token
    const tokenVerified = await Token.verifyToken(token)
    // Desencriptamos informacion
    const decrypted = await Crypt.decrypt(tokenVerified!.payload)
    // Verificamos el codigo encriptado con el cargado por el usuario
    if (parseInt(code) !== decrypted.code) {
      throw CustomError('El codigo enviado es invalido').badRequest()
    }
    // Verificamos al usuario
    await verify.start(decrypted.uid, true)
    return res.status(200).send({ ok: true, message: 'Usuario Verificado' })
  } catch (err) {
    next(err)
  }
}
export default userVerification
