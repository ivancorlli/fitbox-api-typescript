import { NextFunction, Request, Response } from 'express'
import GetGymActiveById from '../../../application/use-case/gym/GetGymActiveById'
import GymDto from '../../DTO/GymDto'
import DbGym from '../../db/DbGym'

async function findGymById(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio del Usuario
  const User = new DbGym()
  // Instanciamos caso de uso ENCONTRAR GIMNASIO POR SU ID
  const getGymActive = new GetGymActiveById(User)
  try {
    const { id } = req.params

    console.log(id)
    const userFound = await getGymActive.start(id)
    return res.status(200).send({
      ok: true,
      response: GymDto.singlePublicGym(userFound)
    })
  } catch (err) {
    return next(err)
  }
}

export default findGymById
