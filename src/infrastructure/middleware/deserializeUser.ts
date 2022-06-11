import { NextFunction, Request, Response } from 'express'
import { NodeStatus } from '../../config/config'
import { CookieAge } from '../../domain/object-value/CookieAge'
import { TokenAge } from '../../domain/object-value/TokenAge'
import MongoSessionRepository from '../mongo/repository/MongoSessionRepository'
import TokenRepository from '../utils/token'
// import Error from '../../domain/entity/Error'

interface RequireUser {
  sid: string
  uid: string
}

async function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Importamos Repositorio de Tokens
  const Token = new TokenRepository()
  // Importamos Repositorio de Session
  const Session = new MongoSessionRepository()

  // Obtenemos tokens
  const { accessToken } = req.signedCookies
  const { refreshToken } = req.signedCookies

  // Si no hay un access token o refresh, no enviamos los datos del usuario
  if (!accessToken || !refreshToken) next()

  // Verificamos el token de accesso
  // @ts-ignore
  const { payload, expired } = await Token.verifyAccessToken(accessToken)

  // Si hay payload, verificamos la session
  if (payload) {
    // Verificamos que la session sea valida
    const session = await Session.findById(payload.sid)
    // Si no hay session, no enviamos usuario
    if (!session) return next()
    // Si el user de la session no coincide con el enviado en el token, no enviamos usuario
    if (session!.uid !== payload.uid) return next()
    // Definimos los parametros para el usuario
    const user: RequireUser = {
      sid: session!._id,
      uid: session!.uid
    }
    // Enviamos los parametros mediante un request
    // @ts-ignore
    req.user = user
    return next()
  }
  // ------------------------ //

  // Si no hay payload y el token expiro, verificamos el refresh
  if (!payload && expired && refreshToken) {
    // @ts-ignore
    const { payload: refresh } = await Token.verifyAccessToken(refreshToken)

    // Si no hay refresh, no enviamos usuario
    if (!refresh) return next()

    // Verificamos la session del refresh
    const refreshSession = await Session.findById(refresh.sid)

    // Si no existe la session, no enviamos usuario
    if (!refreshSession) return next()

    const newAccessToken = await Token.createAccessToken(
      {
        sid: refreshSession!._id,
        uid: refreshSession!.uid
      },
      TokenAge.AccessToken
    )
    // Enviamos Access Cookie
    res.cookie('accessToken', newAccessToken, {
      maxAge: CookieAge.AccessCookie,
      httpOnly: true,
      sameSite: true,
      signed: true,
      secure:
        NodeStatus.env === 'development' || NodeStatus.env === 'test'
          ? undefined
          : true
    })

    // Definimos parametros del usuario
    const user: RequireUser = {
      sid: refreshSession!._id,
      uid: refreshSession!.uid
    }
    // @ts-ignore
    req.user = user
    next()
  }
}

export default deserializeUser
