import { NextFunction, Request, Response } from 'express'
import Gym from '../../../application/Gym'
import DbGym from '../../db/DbGym'
import DbUserBase from '../../db/DbUser'
import BcryptRepository from '../../../../../shared/utils/hash'
import DbAccess from '../../../../access/infrastructure/DbAccess'
import Access from '../../../../access/application/Access'
import ProduceUser from '../../events/ProduceUser'

/**
 * iCorlli: 13-8-2022 ✅ \
 * Crea un nuevo usuario \
 * Depende de: \
 *  👉 Access
 */
async function newGym(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio USUARIO
  const _Gym = new DbGym()
  const _Other = new DbUserBase()
  const _Access = new DbAccess()
  const _Hash = new BcryptRepository()

  // ---------------------------------------- //
  try {
    // Obtenemos los datos del usuuario a crear
    const {
      email,
      username,
      password
    }: { email: string; username: string; password: string } = req.body
    // Definimos el usuario a crear
    const lUser = new Gym(_Gym, _Hash, _Other)
    // Guardamos el nuevo usuario en base de datos
    const newUser = await lUser.createNew(email, username, password)
    // creamos role de super usuario
    const lAccess = new Access(_Access)
    await lAccess.createSuperAdmin(newUser.uuid)
    // Creamos evento NUEVO USUARIO
    const msg: object = {
      uid: newUser.uuid,
      email: newUser.account.email
    }
    // Creamos evento NUEVO USUARIO
    await ProduceUser.newUser(Buffer.from(JSON.stringify(msg)))
    return res.status(201).send({ ok: true, message: 'Usuario creado' })
  } catch (err) {
    return next(err)
  }
}

export default newGym
