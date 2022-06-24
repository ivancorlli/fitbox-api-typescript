import { NextFunction, Request, Response } from 'express'
import UserDto from '../../DTO/UserDto'
import MongoUserRepository from '../../mongo/repository/MongoUserRepository'

async function userGetData(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio del Usuario
  const User = new MongoUserRepository()
  try {
    const { uid } = req.user
    const userFound = await User.getById(uid)
    return res
      .status(200)
      .send({ ok: true, response: UserDto.singleUser(userFound!) })
  } catch (err) {
    next(err)
  }
}

export default userGetData
