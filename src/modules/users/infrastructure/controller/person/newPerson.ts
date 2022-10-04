import { NextFunction, Request, Response } from 'express'
import User from '../../../application/Person'
import DbUser from '../../db/DbPerson'
import DbUserBase from '../../db/DbUser'
import BcryptRepository from '../../../../../shared/utils/hash'
import ProduceUser from '../../events/ProduceUser'

/**
 * iCorlli: 13-8-2022 ✅ \
 * Crea un nuevo usuario
 */
async function newPerson(req: Request, res: Response, next: NextFunction) {
  try {
    const _User = new DbUser()
    const _Hash = new BcryptRepository()
    const _Other = new DbUserBase()
    // ---------------------------------------- //

    // Obtenemos los datos del usuuario a crear
    const {
      email,
      username,
      password
    }: { email: string; username: string; password: string } = req.body
    // Definimos el usuario a crear
    const lUser = new User(_User, _Hash, _Other)
    // Guardamos el nuevo usuario en base de datos
    const newUser = await lUser.createNew(email, username, password)
    // Creamos evento nuevo usuario para enviar email
    const msg: object = {
      uid: newUser.uuid,
      email: newUser.account.email
    }
    await ProduceUser.newUser(Buffer.from(JSON.stringify(msg)))
    return res.status(201).send({ ok: true, message: 'Usuario creado' })
  } catch (err) {
    return next(err)
  }
}

export default newPerson
