import CreateNew from '../../../application/use-case/user/CreateNew'
import User from '../../../domain/entity/User'
import { v4 as uuidv4 } from 'uuid'
import DbGym from '../../db/DbGym'
import BcryptRepository from '../../utils/hash'
import CryptRepository from '../../utils/encrypt'
import TokenAge from '../../../domain/object-value/TokenAge'
import EmailExists from '../../../application/use-case/user/EmailExists'
import TokenRepository from '../../utils/token'
import { Request, Response } from 'express'
import Command from '../../events/Command'

async function newGym(req: Request, res: Response, next: any) {
  // Instanciamos Repositorio de ID
  const ID = uuidv4()
  // Instanciamos el respositorio de HASHEO
  const _Hash = new BcryptRepository()
  // Instanciamos el respositorio de ENCRIPTADO
  const _Crypt = new CryptRepository()
  // Instanciamos el respositorio de Token
  const _Token = new TokenRepository()

  const _Gym = new DbGym()
  // Instanciamos el caso de uso CREAR NUEVO USUARIO
  const createNew = new CreateNew(_Gym, _Hash)
  // Instanciamos caso de uso EMAIL EXISTENTE
  const emailExists = new EmailExists(_Gym)
  // ---------------------------------------- //
  try {
    // Obtenemos los datos del usuuario a crear
    const { email, password } = req.body
    // Definimos el usuario a crear
    const user: User = {
      _id: ID,
      email,
      password
    }
    // Verificamos si ya ha sido registrado el email
    await emailExists.start(email)
    // Guardamos el nuevo usuario en base de datos
    const newUser = await createNew.start(user)
    // Creamos codigo para verificacion
    let randomDigit: number
    do {
      randomDigit = Math.floor(Math.random() * 1000000)
    } while (randomDigit < 100000 && randomDigit < 1000000)
    // Encriptamos el id del usuario y el codigo de validacion
    const encripted = _Crypt.encrypt({
      uid: newUser._id,
      code: randomDigit
    })
    // Creamos el token de verificacion
    const newToken = await _Token.newToken(encripted, TokenAge['24Horas'])
    // Llamar commando de USUARIO y aniadir trabajo ENVIAR EMAIL
    await Command.NewUser.add('send-email', {
      email: newUser.email,
      code: randomDigit,
      link: newToken
    })
    return res.status(201).send({ ok: true, message: 'Usuario creado' })
  } catch (err) {
    return next(err)
  }
}

export default newGym
