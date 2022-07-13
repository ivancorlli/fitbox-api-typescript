import { NextFunction, Request, Response } from 'express'
import GetPlanEnable from '../../../application/use-case/plan/GetPlanEnable'
import CreateNew from '../../../application/use-case/suscription/CreateNew'
import Suscription from '../../../domain/entity/Suscription'
import PaymentType from '../../../domain/object-value/PaymentType'
import SuscriptionStatus from '../../../domain/object-value/SuscriptionStatus'
import DbGymRepository from '../../db/DbGym'
import DbPlanRepository from '../../db/DbPlan'
import DbSuscriptionRepository from '../../db/DbSuscription'
import { v4 as uuidv4 } from 'uuid'
import GetGymActiveById from '../../../application/use-case/gym/GetGymActiveById'
import Command from '../../events/Command'

async function suscribeGym(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio de GIMNASIO
  const _Gym = new DbGymRepository()
  // Instanciamos repositorio de PLAN
  const _Plan = new DbPlanRepository()
  // Instanciamos repositorio de SUSCRIPCION
  const _Suscription = new DbSuscriptionRepository()
  // Instanciamos caso de uso OBTENER PLAN ACTIVO POR ID
  const getPlanEnable = new GetPlanEnable(_Plan)
  // Instanciamos caso de uso OBETENER GYM POR ID
  const getGymActive = new GetGymActiveById(_Gym)
  // Instanciamos caso de uso CREAR NUEVA SUSCRIPCION
  const createSuscription = new CreateNew(_Suscription)
  try {
    // Obtenemos id del plan y del gimnasio a suscribir
    const { plan, gym } = req.params
    // Obtenemos id del cliente
    const { uid } = req.user
    // Buscamos si existe el plan
    const planFound = await getPlanEnable.start(plan)
    // Buscamos si existe el gimnasio
    const gymFound = await getGymActive.start(gym)
    // Crear nueva suscripcion
    const suscription: Suscription = {
      _id: uuidv4(),
      suscriptionNumber: Date.now(),
      initDate: Date.now(),
      finishDate: Date.now() * 10,
      status: SuscriptionStatus.InProgress,
      paymentType: PaymentType.Cash,
      paymentTotal: planFound.price,
      customer: uid,
      gym: gymFound._id,
      plan: planFound._id
    }
    await createSuscription.start(suscription)
    // LLamar a commnad para crear una nueva suscripcion
    await Command.NewSuscription.add('pending', {})
    return res.status(201).send({ ok: true, message: 'Suscripcion creada' })
  } catch (err) {
    return next(err)
  }
}
export default suscribeGym
