import { NextFunction, Request, Response } from 'express'
import DbAccess from '../../../access/infrastructure/DbAccess'
import Session from '../../application/Session'
import DbSession from '../DbSession'
import TokenRepository from '../../../../shared/utils/token'
import TokenAge from '../../../../shared/utils/TokenAge'
import CookieAge from '../../../../shared/utils/CookieAge'
import { NodeStatus } from '../../../../config/config'
import DbGym from '../../../users/infrastructure/db/DbGym'
import Gym from '../../../users/application/Gym'
import IGym from '../../../users/domain/IGym'
import Access from '../../../access/application/Access'

/**
ICorlli: 2-9-2022 ✅\
Inicia sesion a los usuarios con access de un gimnasio\
Depende de:\
 👉 Gym\
 👉 Access
*/
async function gymAccess(req: Request, res: Response, next: NextFunction) {
  const _Gym = new DbGym()
  const _Access = new DbAccess()
  const _Session = new DbSession()
  const _Token = new TokenRepository()

  try {
    // Obtenemos username del gimnasio
    const { username } = req.params
    // Obtenemos datos del usuario solicitante
    const UserAuth = req.User
    //  Obtenemos autoizacion de gimnasio
    const GymAuth = req.Gym

    if (UserAuth && GymAuth) {
      if (
        GymAuth.access &&
        username &&
        username.toLowerCase().trim() === GymAuth.account.username
      ) {
        return res.status(200).send({ ok: true, message: 'Reingreso exitoso' })
      }
    }

    // Validamos el gimnasio
    const lGym = new Gym(_Gym)
    let gymFound: IGym | null = null
    // Obtenemos los roles del usuario en ese gimnasio
    const lAccess = new Access(_Access)
    let AccessFound: any

    if (username && UserAuth) {
      gymFound = await lGym.findByUsername(username)
      AccessFound = await lAccess.findUserAccesss(UserAuth.uid, gymFound.uuid)
    }

    // Validamos que el usuario tenga los Access necesarios para acceder
    if (gymFound && UserAuth && AccessFound && AccessFound.length > 0) {
      // Creamos una nueva sesion
      const lSession = new Session(_Session)
      const newSession = await lSession.createGymSession(
        UserAuth.uid,
        gymFound.uuid,
        AccessFound
      )
      // Cremos accessToken
      const accessToken = await _Token.createGymAccessToken(
        {
          sid: newSession.uuid,
          uid: UserAuth.uid,
          gid: gymFound.uuid
        },
        TokenAge.AccessToken
      )

      // Cremos refreshToken
      const refreshToken = await _Token.createGymAccessToken(
        {
          sid: newSession.uuid
        },
        TokenAge.RefreshToken
      )

      // Enviamos Access Cookie
      res.cookie('gymAccessToken', accessToken, {
        maxAge: CookieAge.AccessCookie,
        httpOnly: true,
        sameSite: true,
        signed: true,
        secure:
          NodeStatus.env === 'development' || NodeStatus.env === 'test'
            ? undefined
            : true
      })

      // Enviamos Access Cookie
      res.cookie('gymAccessRefresh', refreshToken, {
        maxAge: CookieAge.AccessCookie,
        httpOnly: true,
        sameSite: true,
        signed: true,
        secure:
          NodeStatus.env === 'development' || NodeStatus.env === 'test'
            ? undefined
            : true
      })
      return res.status(200).send({ ok: true, message: 'Ingreso exitoso' })
      // Si el usuario no tiene los permisos necesario no le otorgamos credenciales
    } else {
      return res
        .status(403)
        .send({ ok: false, message: 'No puedes acceder a este recurso' })
    }
  } catch (err) {
    return next(err)
  }
}

export default gymAccess
