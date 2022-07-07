import { NextFunction, Request, Response } from 'express'
import CreateNew from '../../../application/use-case/session/CreateNew'
import Session from '../../../domain/entity/Session'
import DbSessionRepository from '../../mongo/repository/DbSessionRepository'
import DbUserRepository from '../../mongo/repository/DbUserRepository'
import BcryptRepository from '../../utils/hash'
import { v4 as uuidv4 } from 'uuid'
import TokenRepository from '../../utils/token'
import { NodeStatus } from '../../../config/config'
import { CookieAge } from '../../../domain/object-value/CookieAge'
import { TokenAge } from '../../../domain/object-value/TokenAge'
import Login from '../../../application/use-case/user/Login'

async function userLogin(req: Request, res: Response, next: NextFunction) {
  // Instanciamos Repositorio de usuario
  const UserDb = new DbUserRepository()
  // Instanciamos Repositorio de Session
  const SessionDb = new DbSessionRepository()
  // Instanciamos el respositorio de HASHEO
  const HashRepository = new BcryptRepository()
  // Instanciamos el respositorio de Token
  const Token = new TokenRepository()
  // Instanciamos caso de uso LOGIN
  const login = new Login(UserDb, HashRepository)
  // Instanciamos caos de uso CREAR SESION
  const session = new CreateNew(SessionDb)
  // Instanciamos repositorio para crear ID
  const ID = uuidv4()
  // ------------------------------------ //
  try {
    // Obtenemos email y password del body
    const { email, password } = req.body
    // Inciamos caso de uso INICIAR SESION
    const user = await login.start(email, password)
    // Definimos los parametros para la nueva session
    const Session: Session = {
      _id: ID,
      uid: user!._id!
    }
    // Creamos una nueva session
    const newSession = await session.start(Session)
    // Creamos accesstoken
    const accessToken = await Token.createAccessToken(
      {
        sid: newSession!._id,
        uid: newSession?.uid
      },
      TokenAge.AccessToken
    )
    // creamos Refresh Token
    const refreshToken = await Token.createAccessToken(
      {
        sid: newSession!._id
      },
      TokenAge.RefreshToken
    )
    // Enviamos Access Cookie
    res.cookie('accessToken', accessToken, {
      maxAge: CookieAge.AccessCookie,
      httpOnly: true,
      sameSite: true,
      signed: true,
      secure:
        NodeStatus.env === 'development' || NodeStatus.env === 'test'
          ? undefined
          : true
    })
    // Enviamos Refresh Cookie
    res.cookie('refreshToken', refreshToken, {
      maxAge: CookieAge.RefreshCookie,
      httpOnly: true,
      sameSite: true,
      signed: true,
      secure:
        NodeStatus.env === 'development' || NodeStatus.env === 'test'
          ? undefined
          : true
    })
    res.status(200).send({ ok: true, message: 'Ingreso exitoso' })
    return
  } catch (err) {
    return next(err)
  }
}
export default userLogin
