import CreateNew from '../../../application/use-case/user/CreateNew'
import User from '../../../domain/entity/User'
import { v4 as uuidv4 } from 'uuid'
import MongoGymRepository from '../../mongo/repository/MongoGymRepository'
import UserRepository from '../../../domain/repository/UserRepository'
import BcryptRepository from '../../utils/hash'
import MongoClientRepository from '../../mongo/repository/MongoClientRepository'
import CryptRepository from '../../utils/encrypt'
import { QueryType } from '../../../domain/object-value/QueryType'
import { TokenAge } from '../../../domain/object-value/TokenAge'
import EmailExists from '../../../application/use-case/user/EmailExists'
import TokenRepository from '../../utils/token'
import { Request, Response } from 'express'

async function newUser(req: Request, res: Response, next: any) {
  // Instanciamos Repositorio de ID
  const ID = uuidv4()
  // Obtenemos el tipo de usuario a crear
  const type = req.query.type
  // Instanciamos el respositorio de HASHEO
  const HashRepository = new BcryptRepository()
  // Instanciamos el respositorio de ENCRIPTADO
  const Crypt = new CryptRepository()
  // Instanciamos el respositorio de Token
  const Token = new TokenRepository()

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
  // Instanciamos el caso de uso CREAR NUEVO USUARIO
  const createUser = new CreateNew(UserDb!, HashRepository)
  // Instanciamos caso de uso EMAIL YA EN USO
  const emailExists = new EmailExists(UserDb!)
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
    const newUser = await createUser.start(user)
    // Creamos codigo para verificacion
    let randomDigit: number
    do {
      randomDigit = Math.floor(Math.random() * 100000)
    } while (randomDigit < 10000 && randomDigit < 100000)
    // Encriptamos el id del usuario y el codigo de validacion
    const encripted = Crypt.encrypt({
      uid: newUser!._id,
      code: randomDigit
    })
    // Creamos el token de verificacion
    const newToken = await Token.newToken(encripted, TokenAge['24Horas'])
    // TODO LLAMAR SUSCRIBER
    // TODO -- ENVIAR EMAIL DE BIENVENIDA
    // TODO -- ENVIAR EMAIL DE VERIFICACION
    return res
      .status(201)
      .send({ ok: true, message: 'Usuario creado', newToken })
  } catch (err) {
    return next(err)
  }
}

export default newUser
