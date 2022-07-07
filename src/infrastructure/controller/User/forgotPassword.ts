import { NextFunction, Request, Response } from 'express'
import RecoverPassword from '../../../application/use-case/email/RecoverPassword'
import FindUserByEmail from '../../../application/use-case/user/FindUserByEmail'
import { TokenAge } from '../../../domain/object-value/TokenAge'
import DbUserRepository from '../../mongo/repository/DbUserRepository'
import CryptRepository from '../../utils/encrypt'
import Emailer from '../../utils/mail'
import TokenRepository from '../../utils/token'

async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  // Instanciamos Repositorio del Usuario
  const _User = new DbUserRepository()
  // Instanciamos el respositorio de ENCRIPTADO
  const Crypt = new CryptRepository()
  // Instanciamos el respositorio de Token
  const Token = new TokenRepository()
  // Instanciamos caso de uso ENCONTRAR USUARIO POR SU EMAIL
  const userByEmail = new FindUserByEmail(_User)
  // Instanciamos repositorio de emial
  const Emialer = new Emailer()
  // Instanciamos caso de uso RECUOERAR CONTRASENIA
  const recoverPassword = new RecoverPassword(Emialer)
  try {
    // Obetenemos email del usuario
    const { email } = req.body
    // Bucamos si existe el email enviado
    const userFound = await userByEmail.start(email)
    // Encriptamos los datos
    const encripted = await Crypt.encrypt({ uid: userFound._id })
    // Creamos un nuevo token para verificar la informacionenviada
    const newToken = await Token.newToken(encripted, TokenAge['1Hora'])
    // TODO LLAMAR SUSCRIBER
    // TODO -- ENVIAR EMAIL DE RECUPERACION
    await recoverPassword.start(userFound.email, newToken)
    return res.status(200).send({
      ok: true,
      message: `Hemos enviado un email de recuperacion a ${userFound.email}`
    })
  } catch (err) {
    return next(err)
  }
}
export default forgotPassword
