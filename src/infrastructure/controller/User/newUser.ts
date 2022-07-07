import CreateNew from '../../../application/use-case/user/CreateNew'
import User from '../../../domain/entity/User'
import { v4 as uuidv4 } from 'uuid'
import DbGymRepository from '../../mongo/repository/DbGymRepository'
import UserRepository from '../../../domain/repository/UserRepository'
import BcryptRepository from '../../utils/hash'
import DbClientRepository from '../../mongo/repository/DbCustomerRepository'
import CryptRepository from '../../utils/encrypt'
import { QueryUserType } from '../../../domain/object-value/QueryUserType'
import { TokenAge } from '../../../domain/object-value/TokenAge'
import EmailExists from '../../../application/use-case/user/EmailExists'
import TokenRepository from '../../utils/token'
import { Request, Response } from 'express'
import Emailer from '../../utils/mail'
import WelcomeEmail from '../../../application/use-case/email/WelcomeEmail'
import ConfirmEmail from '../../../application/use-case/email/ConfirmEmail'

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
  // Instanciamos Repositorio de EMAIL
  const emailer = new Emailer()
  // Instanciamos caso de uso de uso ENVIAR EMAIL DE BIENVENIDA
  const welcome = new WelcomeEmail(emailer)
  // Instanciamos caso de uso ENVIAR EMAIL DE CONFIRMACION
  const confirm = new ConfirmEmail(emailer)

  let UserDb: UserRepository
  // Definimos el tipo de usuario a crear dependiendo del tipo de query enviada
  if (type === QueryUserType.Gym) {
    // Creamos un Gimnasio
    UserDb = new DbGymRepository()
  }
  if (type === QueryUserType.Client) {
    // Creamos un Cliente
    UserDb = new DbClientRepository()
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
      randomDigit = Math.floor(Math.random() * 1000000)
    } while (randomDigit < 100000 && randomDigit < 1000000)
    // Encriptamos el id del usuario y el codigo de validacion
    const encripted = Crypt.encrypt({
      uid: newUser._id,
      code: randomDigit
    })
    // Creamos el token de verificacion
    const newToken = await Token.newToken(encripted, TokenAge['24Horas'])
    // TODO LLAMAR SUSCRIBER
    // TODO -- ENVIAR EMAIL DE BIENVENIDA
    await welcome.start(newUser.email)
    // TODO -- ENVIAR EMAIL DE VERIFICACION
    await confirm.start(newUser.email, randomDigit, newToken)
    return res.status(201).send({ ok: true, message: 'Usuario creado' })
  } catch (err) {
    return next(err)
  }
}

export default newUser
