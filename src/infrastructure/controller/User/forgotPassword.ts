import { NextFunction, Request, Response } from 'express'
import FindUserByEmail from '../../../application/use-case/user/FindUserByEmail'
import TokenAge from '../../../domain/object-value/TokenAge'
import DbUser from '../../db/DbUser'
import Command from '../../events/Command'
import CryptRepository from '../../utils/encrypt'
import TokenRepository from '../../utils/token'

async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  // Instanciamos Repositorio del Usuario
  const _User = new DbUser()
  // Instanciamos el respositorio de ENCRIPTADO
  const _Crypt = new CryptRepository()
  // Instanciamos el respositorio de Token
  const _Token = new TokenRepository()
  // Instanciamos caso de uso ENCONTRAR USUARIO POR SU EMAIL
  const findUserByEmail = new FindUserByEmail(_User)
  try {
    // Obetenemos email del usuario
    const { email } = req.body
    // Bucamos si existe el email enviado
    const userFound = await findUserByEmail.start(email)
    // Encriptamos los datos
    const encripted = await _Crypt.encrypt({ uid: userFound._id })
    // Creamos un nuevo token para verificar la informacion enviada
    const newToken = await _Token.newToken(encripted, TokenAge['1Hora'])
    // Llamar command para ENVIAR EMAIL DE RECUPERACION
    await Command.ForgotPassword.add('send-email', {
      email: userFound.email,
      link: newToken
    })
    return res.status(200).send({
      ok: true,
      message: `Hemos enviado un email de recuperacion a ${userFound.email}`
    })
  } catch (err) {
    return next(err)
  }
}
export default forgotPassword
