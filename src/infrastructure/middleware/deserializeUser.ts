import { NextFunction, Request, Response } from 'express'
import { NodeStatus } from '../../config/config'
import User from '../../domain/entity/User'
import UserAuth from '../../domain/entity/UserAuth'
import CookieAge from '../../domain/object-value/CookieAge'
import TokenAge from '../../domain/object-value/TokenAge'
import DbSession from '../db/DbSession'
import deleteCookies from '../utils/helper/deleteCookies'
import TokenRepository from '../utils/token'

async function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Importamos Repositorio de Session
  const _Session = new DbSession()
  // Instanciamos el respositorio de Token
  const _Token = new TokenRepository()

  // Obtenemos tokens
  const { accessToken } = req.signedCookies
  const { refreshToken } = req.signedCookies

  // Si no hay un access token o refresh, no enviamos los datos del usuario
  if (!accessToken || !refreshToken) return next()
  // Verificamos el token de accesso
  // @ts-ignore
  const { payload, expired } = await _Token.verifyAccessToken(accessToken)

  // Si hay payload, verificamos la session
  if (payload) {
    // Verificamos que la session sea valida
    const session = await _Session.getById(payload.sid, 'uid')
    // Si no hay session, no enviamos usuario
    if (!session) {
      deleteCookies(res)
      return next()
    }
    // Si no encuentra al usuario en la session, no permitimos continuar y eliminamos la session
    if (!session.uid) {
      await _Session.deleteById(session._id)
      deleteCookies(res)
      return next()
    }
    // Si el user de la session no coincide con el enviado en el token, no enviamos usuario
    const userSession = session.uid as User
    if (userSession._id !== payload.uid) return next()
    // Definimos los parametros para el usuario
    const user: UserAuth = {
      sid: session._id,
      uid: userSession._id,
      role: userSession.role!
    }
    // Enviamos los parametros mediante un request
    req.user = user
    return next()
  }
  // ------------------------ //

  // Si no hay payload y el token expiro, verificamos el refresh
  if (!payload && expired && refreshToken) {
    // @ts-ignore
    const { payload: refresh } = await _Token.verifyAccessToken(refreshToken)

    // Si no hay refresh, no enviamos usuario
    if (!refresh) return next()

    // Verificamos la session del refresh
    const refreshSession = await _Session.getById(refresh.sid, 'uid')

    // Si no existe la session, no enviamos usuario
    if (!refreshSession) {
      deleteCookies(res)
      return next()
    }
    // Si no encuentra al usuario en la session, no permitimos continuar y eliminamos la session
    if (!refreshSession.uid) {
      await _Session.deleteById(refreshSession._id)
      deleteCookies(res)
      return next()
    }

    const userSession = refreshSession.uid as User
    const newAccessToken = await _Token.createAccessToken(
      {
        sid: refreshSession._id,
        uid: userSession._id
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
    const user: UserAuth = {
      sid: refreshSession._id,
      uid: userSession._id,
      role: userSession.role!
    }
    req.user = user
    return next()
  }
}

export default deserializeUser
