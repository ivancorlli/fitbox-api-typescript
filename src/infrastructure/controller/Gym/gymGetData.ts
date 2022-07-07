import { NextFunction, Request, Response } from 'express'
import GetGym from '../../../application/use-case/gym/GetGym'
import GymDto from '../../DTO/GymDto'
import DbGymRepository from '../../mongo/repository/DbGymRepository'

async function gymGetData(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio del Usuario
  const User = new DbGymRepository()
  // Instanciamos caso de uso ENCONTRAR GIMNASIO POR SU ID
  const findById = new GetGym(User)
  try {
    const { uid } = req.user
    const userFound = await findById.start(uid)
    return res
      .status(200)
      .send({ ok: true, response: GymDto.singlePrivateGym(userFound) })
  } catch (err) {
    return next(err)
  }
}

export default gymGetData
