import { NextFunction, Request, Response } from 'express'
import { NodeStatus } from '../../config/config'
import CookieAge from '../utils/CookieAge'
import TokenAge from '../utils/TokenAge'
import deleteCookies from '../helper/deleteCookies'
import TokenRepository from '../utils/token'
import DbSession from '../../modules/session/infrastructure/DbSession'

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
    const session = await _Session.findById(payload.sid, 'uid')
    // Si no hay session, no enviamos usuario
    if (!session) {
      deleteCookies(res)
      return next()
    }
    // Si no encuentra al usuario en la session, no permitimos continuar y eliminamos la session
    if (!session.uid) {
      await _Session.deleteById(session.uuid)
      deleteCookies(res)
      return next()
    }
    // Si el user de la session no coincide con el enviado en el token, no enviamos usuario
    const userSession = session.uid
    if (userSession.uuid !== payload.uid) return next()

    // Enviamos los parametros mediante un request
    req.User = {
      uid: userSession.uuid,
      sid: session.uuid,
      account: {
        email: userSession.account.email,
        username: userSession.account.username,
        status: userSession.account.status,
        verified: userSession.account.verified
      }
    }
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
    const refreshSession = await _Session.findById(refresh.sid, 'uid')

    // Si no existe la session, no enviamos usuario
    if (!refreshSession) {
      deleteCookies(res)
      return next()
    }
    // Si no encuentra al usuario en la session, no permitimos continuar y eliminamos la session
    if (!refreshSession.uid) {
      await _Session.deleteById(refreshSession.uuid)
      deleteCookies(res)
      return next()
    }

    const userSession = refreshSession.uid
    const newAccessToken = await _Token.createAccessToken(
      {
        sid: refreshSession.uuid,
        uid: userSession.uuid
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

    req.User = {
      uid: userSession.uid,
      sid: refreshSession.uuid,
      account: {
        email: userSession.email,
        username: userSession.username,
        status: userSession.status,
        verified: userSession.verified
      }
    }
    return next()
  }
}

export default deserializeUser
