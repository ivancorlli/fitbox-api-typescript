import { NextFunction, Request, Response } from 'express'
import GetData from '../../../application/use-case/gym/GetData'
import GymDto from '../../DTO/GymDto'
import DbGym from '../../db/DbGym'

async function getData(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio del Usuario
  const User = new DbGym()
  // Instanciamos caso de uso ENCONTRAR GIMNASIO POR SU ID
  const getData = new GetData(User)
  try {
    const { uid } = req.user
    console.log(uid)
    const userFound = await getData.start(uid)
    return res
      .status(200)
      .send({ ok: true, response: GymDto.singlePrivateGym(userFound) })
  } catch (err) {
    return next(err)
  }
}

export default getData
