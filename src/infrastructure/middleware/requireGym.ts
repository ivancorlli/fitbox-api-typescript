import { NextFunction, Request, Response } from 'express'
import { UserRoles } from '../../config/config'
import MongoGymRepository from '../mongo/repository/MongoGymRepository'

async function requireGym(req: Request, res: Response, next: NextFunction) {
  // Obtenemos id
  const { uid } = req.user
  // Instanciamos repositorio del gymnasio
  const Gym = new MongoGymRepository()
  try {
    // Buscamos el usuario
    const gym = await Gym.getById(uid)
    if (!gym || gym.role !== UserRoles.gym) {
      return res.status(403).send({ ok: false, message: 'No tienes permisos' })
    }
    return next()
  } catch (err) {
    return res
      .status(500)
      .send({ ok: false, message: 'Se produjo un error interno' })
  }
}

export default requireGym
