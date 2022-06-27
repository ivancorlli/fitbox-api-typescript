import { NextFunction, Request, Response } from 'express'
import GetGymActiveById from '../../../application/use-case/gym/GetGymActiveById'
import GymDto from '../../DTO/GymDto'
import MongoGymRepository from '../../mongo/repository/MongoGymRepository'

async function findGymById(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio del Usuario
  const User = new MongoGymRepository()
  // Instanciamos caso de uso ENCONTRAR GIMNASIO POR SU ID
  const findById = new GetGymActiveById(User)
  try {
    const { gymId } = req.params
    const userFound = await findById.start(gymId)
    return res.status(200).send({
      ok: true,
      response: GymDto.singlePublicUser(userFound)
    })
  } catch (err) {
    return next(err)
  }
}

export default findGymById
