import { Request, Response, NextFunction } from 'express'
import CreateNew from '../../../application/use-case/user/CreateNew'
import User from '../../../domain/entity/User'
import { v4 as uuidv4 } from 'uuid'
import MongoGymRepository from '../../mongo/repository/MongoGymRepository'
import UserRepository from '../../../domain/repository/UserRepository'
import BcryptRepository from '../../utils/hash'
import MongoClientRepository from '../../mongo/repository/MongoClientRepository'
import CryptRepository from '../../utils/encrypt'
import { QueryType } from '../../../domain/object-value/QueryType'
import TokenRepository from '../../utils/token'
import { TokenAge } from '../../../domain/object-value/TokenAge'

async function newUser(req: Request, res: Response, next: NextFunction) {
  // Instanciamos el repositorio de encriptado
  const hashPassword = new BcryptRepository()
  // Instanciamos Repositorio de ID
  const ID = uuidv4()
  // Obtenemos el tipo de usuario a crear
  const type = req.query.type

  let UserDb: UserRepository
  // Definimos el tipo de usuario a crear dependiendo del tipo de query enviada
  if (type === QueryType.Gym) {
    // Creamos un Gimnasio
    UserDb = new MongoGymRepository()
  }
  if (type === QueryType.Client) {
    // Creamos un Cliente
    UserDb = new MongoClientRepository()
  }
  // Instanciamos repositorio de encriptacion
  const Crypto = new CryptRepository()
  // Instanciamos el caso de uso
  const createUser = new CreateNew(UserDb!, hashPassword)
  // Instanciamos repositorio de Token
  const Token = new TokenRepository()
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
    // Guardamos el nuevo usuario en base de datos
    const newUser = await createUser.start(user)
    // Creamos codigo para verificacion
    let randomDigit: number
    do {
      randomDigit = Math.floor(Math.random() * 100000)
    } while (randomDigit < 10000 && randomDigit < 100000)
    // Encriptamos el id del usuario y el codigo de validacion
    const encripted = Crypto.encrypt({ uid: newUser!._id, code: randomDigit })
    // Creamos el token de verificacion
    const newToken = await Token.newToken(encripted, TokenAge['24Horas'])
    // TODO LLAMAR SUSCRIBER

    // TODO -- ENVIAR EMAIL DE BIENVENIDA
    // TODO -- ENVIAR EMAIL DE VERIFICACION

    // Devolvemos una respuesta correcta
    return res.status(201).send({
      ok: true,
      message: 'Usuario creado correctamente',
      newToken
    })
  } catch (err) {
    return next(err)
  }
}

export default newUser
