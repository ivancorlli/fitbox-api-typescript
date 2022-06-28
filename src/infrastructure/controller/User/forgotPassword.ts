import { NextFunction, Request, Response } from 'express'
import CustomError from '../../../domain/exception/CustomError'
import { TokenAge } from '../../../domain/object-value/TokenAge'
import MongoUserRepository from '../../mongo/repository/MongoUserRepository'
import CryptRepository from '../../utils/encrypt'
import TokenRepository from '../../utils/token'

async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  // Instanciamos Repositorio del Usuario
  const UserDb = new MongoUserRepository()
  // Instanciamos el respositorio de ENCRIPTADO
  const Crypt = new CryptRepository()
  // Instanciamos el respositorio de Token
  const Token = new TokenRepository()
  try {
    // Obetenemos email del usuario
    const { email } = req.body
    // Bucamos si existe el email enviado
    const userFound = await UserDb.getByEmail(email)
    // Arrojamos error si no existe un usuario con ese email
    if (!userFound) {
      throw CustomError.badRequest(
        'No existe un usuario registrado con ese email'
      )
    }
    // Encriptamos los datos
    const encripted = await Crypt.encrypt({ uid: userFound!._id })
    // Creamos un nuevo token para verificar la informacionenviada
    const newToken = await Token.newToken(encripted, TokenAge['1Hora'])
    // TODO LLAMAR SUSCRIBER
    // TODO -- ENVIAR EMAIL DE RECUPERACION
    return res.status(200).send({
      ok: true,
      message: 'Hemos enviado un email de recuperacion a su correo',
      newToken
    })
  } catch (err) {
    return next(err)
  }
}
export default forgotPassword
