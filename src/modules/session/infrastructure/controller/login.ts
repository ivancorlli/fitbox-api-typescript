import { NextFunction, Request, Response } from 'express'
import { NodeStatus } from '../../../../config/config'
import CookieAge from '../../../../shared/utils/CookieAge'
import TokenAge from '../../../../shared/utils/TokenAge'
import BcryptRepository from '../../../../shared/utils/hash'
import TokenRepository from '../../../../shared/utils/token'
import Session from '../../application/Session'
import DbSession from '../DbSession'
import UserBase from '../../../users/application/User'
import DbUserBase from '../../../users/infrastructure/db/DbUser'
import Access from '../../../access/application/Access'
import DbAccess from '../../../access/infrastructure/DbAccess'
import CustomError from '../../../error/CustomError'
import deleteCookies from '../../../../shared/helper/deleteCookies'
import deleteGymCookies from '../../../../shared/helper/deleteGymCookies'

/**
ICorlli: 2-9-2022 ✅\
Inicia sesion al gimnasio y a la persona\
Depende de:\
 👉 User\
 👉 Access
*/
async function login(req: Request, res: Response, next: NextFunction) {
  // Instanciamos DB de usuario
  const _User = new DbUserBase()
  // Instanciamos DB de Session
  const _Session = new DbSession()
  // Instanciamos el respositorio de HASHEO
  const _Hash = new BcryptRepository()
  // Instanciamos el respositorio de Token
  const _Token = new TokenRepository()
  // Role Db
  const _Access = new DbAccess()

  // ------------------------------------ //
  try {
    // Obtenemos email y password del body
    const { accessName, password } = req.body
    // Obtenemos datos del usuario
    const UserAuth = req.User
    const GymAuth = req.Gym

    // Instanciamos Usuario
    const lUser = new UserBase(_User, _Hash)
    // Logeamos al ususario
    const userLogged = await lUser.login(accessName, password)
    // Definimos session
    const lSession = new Session(_Session)

    // Si el usuario logueado no es del tipo usuario o gimnasio arrojamos error
    if (userLogged.type !== 'Person' && userLogged.type !== 'Gym') {
      throw CustomError.internalError('Se produojo un error al iniciar sesion')
    }

    // Si el usuario tiene credenciales de session de usaurio, no volvemos a loguearlo
    if (userLogged.type === 'Person' && UserAuth) {
      // Si el uusario tiene credenciales deben ser iguales a las del usuario que quiere acceder
      if (userLogged.uuid === UserAuth.uid) {
        // Si existen credenciales de session de gimnasio, las eliminamos
        if (GymAuth) {
          await lSession.deleteById(GymAuth.sid)
          deleteGymCookies(res)
        }
        return res.status(200).send({ ok: true, message: 'Reingreso exitoso' })
        // si las credenciales no son iguales, quitamos cookies y cerramos session de cookies
      } else {
        await lSession.deleteById(UserAuth.sid)
        deleteCookies(res)
      }
    }

    // Si el usuario tiene credenciales de gimnasio, no volvemos a loguearlo
    if (userLogged.type === 'Gym' && GymAuth) {
      // Si el gimnasio tiene credenciales deben ser iguales a las del gimnasio que quiere acceder
      if (userLogged.uuid === GymAuth.gid) {
        // Si existen credenciales de session de usuario, las eliminamos
        if (UserAuth) {
          await lSession.deleteById(UserAuth.sid)
          deleteCookies(res)
        }
        return res.status(200).send({ ok: true, message: 'Reingreso exitoso' })
        // Si no son iguales, quitamos cookies y cerramos session
      } else {
        await lSession.deleteById(GymAuth.sid)
        deleteGymCookies(res)
      }
    }

    // Si el usuario logueado es de tipo usuario enviamos sus credenciales
    if (userLogged.type === 'Person') {
      // Creamos una nueva session
      const newSession = await lSession.createUserSession(userLogged.uuid)
      // Creamos accesstoken
      const accessToken = await _Token.createAccessToken(
        {
          sid: newSession.uuid,
          uid: newSession.uid
        },
        TokenAge.AccessToken
      )
      // creamos Refresh Token
      const refreshToken = await _Token.createAccessToken(
        {
          sid: newSession.uuid
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
    }

    // Si el usuario logueado es de tipo gimnasio enviamos sus credenciales
    if (userLogged.type === 'Gym') {
      // Buscamos roles del gimnasio
      const lAccess = new Access(_Access)
      const accesssFound = await lAccess.findGymAccess(userLogged.uuid)
      // Creamos una nueva sesion
      const lSession = new Session(_Session)
      const newSession = await lSession.createGymSession(
        undefined,
        userLogged.uuid,
        accesssFound
      )
      // Cremos accessToken
      const accessToken = await _Token.createGymAccessToken(
        {
          sid: newSession.uuid,
          // Si tenemos session del usuario la enviamos
          uid: undefined,
          gid: userLogged.uuid
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
    }

    return res.status(200).send({ ok: true, message: 'Ingreso exitoso' })
  } catch (err) {
    return next(err)
  }
}
export default login
