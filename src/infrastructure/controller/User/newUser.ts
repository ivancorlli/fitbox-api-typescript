import { Request, Response, NextFunction } from 'express'
import CreateNew from '../../../application/use-case/user/CreateNew'
import User from '../../../domain/entity/User'
import { v4 as uuidv4 } from 'uuid'
import MongoGymRepository from '../../mongo/repository/MongoGymRepository'
import UserRepository from '../../../domain/repository/UserRepository'
import BcryptRepository from '../../utils/bcrypt'

async function newUser(req: Request, res: Response, next: NextFunction) {
  // Obtenemos los datos del usuuario a crear
  const { email, password } = req.body
  // Obtenemos el tipo de usuario a crear
  const type = req.query.type // 1=> Gym 2=> CLient
  // Instanciamos el repositorio de encriptado
  const hashPassword = new BcryptRepository()
  // Creamo un nuevo Id
  const ID = uuidv4()
  // Instanciamos el usuario a crear
  const user: User = {
    _id: ID,
    email,
    password
  }
  let UserDb: UserRepository
  // Definimos el tipo de usuario a crear dependiendo del tipo de query enviada
  if (type === '1') {
    // Creamos un Gimnasio
    UserDb = new MongoGymRepository()
  }
  if (type === '2') {
    // Creamos un Cliente
    UserDb = new MongoGymRepository()
  }
  // Instanciamos el caso de uso
  const createUser = new CreateNew(UserDb!, hashPassword)
  try {
    // Guardamos el nuevo usuario en base de datos
    await createUser.start(user)
    // Devolvemos una respuesta correcta
    res.status(201).send({ ok: true, message: 'Usuario creado correctamente' })
  } catch (err) {
    // Envaimos el error al middelware
    res.status(500).send({ ok: false, message: err })
  }
}

export default newUser
