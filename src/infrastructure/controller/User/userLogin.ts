import { NextFunction, Request, Response } from 'express'
import CreateNew from '../../../application/use-case/session/CreateNew'
import UserLogin from '../../../application/use-case/user/UserLogin'
import Session from '../../../domain/entity/Session'
import MongoSessionRepository from '../../mongo/repository/MongoSessionRepository'
import MongoUserRepository from '../../mongo/repository/MongoUserRepository'
import BcryptRepository from '../../utils/hash'
import { v4 as uuidv4 } from 'uuid'

async function userLogin(req: Request, res: Response, next: NextFunction) {
  const UserDb = new MongoUserRepository()
  const SessionDb = new MongoSessionRepository()
  const hashPassword = new BcryptRepository()
  const login = new UserLogin(UserDb, hashPassword)
  const session = new CreateNew(SessionDb)
  const ID = uuidv4()
  const { email, password } = req.body
  try {
    const user = await login.start(email, password)
    const Session: Session = {
      _id: ID,
      uid: user!._id
    }
    const newSession = await session.start(Session)
    res.cookie('accessToken', newSession, {
      httpOnly: true,
      sameSite: true
      // secure: true
    })
    return res.status(200).send({ ok: true, message: 'Loggin exitoso' })
  } catch (err) {
    next(err)
  }
}
export default userLogin
