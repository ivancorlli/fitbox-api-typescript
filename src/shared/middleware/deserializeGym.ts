import { NextFunction, Request, Response } from 'express'
import { NodeStatus } from '../../config/config'
import CookieAge from '../utils/CookieAge'
import TokenAge from '../utils/TokenAge'
import TokenRepository from '../utils/token'
import DbSession from '../../modules/session/infrastructure/DbSession'
import deleteGymCookies from '../helper/deleteGymCookies'

async function deserializeGym(req: Request, res: Response, next: NextFunction) {
  // Importamos Repositorio de Session
  const _Session = new DbSession()
  // Instanciamos el respositorio de Token
  const _Token = new TokenRepository()

  // Obtenemos tokens
  const { gymAccessToken } = req.signedCookies
  const { gymAccessRefresh } = req.signedCookies
  // Obtenemos id del usuario
  const UserAuth = req.User
  // Si no hay un access token o refresh, no enviamos los datos del usuario
  if (!gymAccessToken || !gymAccessRefresh) return next()
  // Verificamos el token de accesso
  // @ts-ignore
  const { payload, expired } = await _Token.verifyGymAccessToken(gymAccessToken)

  // Si hay payload, verificamos la session
  if (payload) {
    // Verificamos que la session sea valida
    const session = await _Session.findById(payload.sid, ['gid', 'access'])

    // Si no hay session, no enviamos usuario
    if (!session) {
      deleteGymCookies(res)
      return next()
    }
    // Si no encuentra al gimnasio o los roles en la session, no permitimos continuar y eliminamos la session
    if (!session.gid || !session.access) {
      await _Session.deleteById(session.uuid)
      deleteGymCookies(res)
      return next()
    }

    // Si el usuario que esta en session no coincide con el mismo enviado por cookies, no permitimos ingresar y eliminamos session
    if (UserAuth && session.uid) {
      if (UserAuth.uid !== session.uid) {
        await _Session.deleteById(session.uuid)
        deleteGymCookies(res)
        return next()
      }
    }

    // Si el user de la session no coincide con el enviado en el token, no enviamos usuario
    const gymSession = session.gid
    const rolesSession = session.access

    req.Gym = {
      gid: gymSession.uuid,
      sid: session.uuid,
      account: {
        email: gymSession.account.email,
        username: gymSession.account.username,
        status: gymSession.account.status,
        verified: gymSession.account.verified
      },
      access: rolesSession
    }

    return next()
  }
  // ------------------------ //

  // Si no hay payload y el token expiro, verificamos el refresh
  if (!payload && expired && gymAccessRefresh) {
    console.log('reresh')
    // @ts-ignore
    const { payload: refresh } = await _Token.verifyGymAccessToken(
      gymAccessRefresh
    )

    // Si no hay refresh, no enviamos usuario
    if (!refresh) return next()

    // Verificamos la session del refresh
    const refreshSession = await _Session.findById(refresh.sid, [
      'gid',
      'access'
    ])

    // Si no existe la session, no enviamos usuario
    if (!refreshSession) {
      deleteGymCookies(res)
      return next()
    }
    // Si no encuentra al gimnasio y los roles, no permitimos continuar y eliminamos la session
    if (!refreshSession.gid || !refreshSession.access) {
      await _Session.deleteById(refreshSession.uuid)
      deleteGymCookies(res)
      return next()
    }

    const userSession = refreshSession.uid
    const gymSession = refreshSession.gid
    const rolesSession = refresh.roles
    const newAccessToken = await _Token.createGymAccessToken(
      {
        sid: refreshSession.uuid,
        // Si tenemos session del usuario la enviamos
        // Esto lo sabremos si el usuario tiene el otro token de accesso
        uid: userSession ? userSession.uuid : undefined,
        gid: gymSession.uuid
      },
      TokenAge.AccessToken
    )
    // Enviamos Access Cookie
    res.cookie('gymAccessToken', newAccessToken, {
      maxAge: CookieAge.AccessCookie,
      httpOnly: true,
      sameSite: true,
      signed: true,
      secure:
        NodeStatus.env === 'development' || NodeStatus.env === 'test'
          ? undefined
          : true
    })

    // Definimos roles
    req.Gym = {
      gid: gymSession.uuid,
      sid: refreshSession.uuid,
      account: {
        email: gymSession.email,
        username: gymSession.username,
        status: gymSession.status,
        verified: gymSession.verified
      },
      access: rolesSession
    }
    return next()
  }
}

export default deserializeGym
