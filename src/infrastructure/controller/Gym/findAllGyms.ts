import { NextFunction, Request, Response } from 'express'
import GetAllGymsActive from '../../../application/use-case/gym/GetAllGymsActive'
import GymDto from '../../DTO/GymDto'

import MongoGymRepository from '../../mongo/repository/MongoGymRepository'

async function findAllGyms(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio GIMNASIO
  const _Gym = new MongoGymRepository()
  // Instanciamos caso de uso ENCONTRART TODOS LOS GIMNASIOS ACTIVOS
  const getAll = new GetAllGymsActive(_Gym)
  try {
    // Buscamos todos los gimansios
    const response = await getAll.start()
    return res
      .status(200)
      .send({ ok: true, response: GymDto.multiplesUser(response!) })
  } catch (err) {
    return next(err)
  }
}
export default findAllGyms
