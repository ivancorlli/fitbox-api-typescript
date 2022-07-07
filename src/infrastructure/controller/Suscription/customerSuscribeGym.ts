import { NextFunction, Request, Response } from 'express'
import InscriptToGym from '../../../application/use-case/customer/InscriptToGym'
import InscriptCustomer from '../../../application/use-case/gym/InscriptCustomer'
import GetPlanEnableById from '../../../application/use-case/plan/GetPlanEnableById'
import CreateNew from '../../../application/use-case/suscription/CreateNew'
import Suscription from '../../../domain/entity/Suscription'
import { PaymentType } from '../../../domain/object-value/PaymentType'
import { SuscriptionStatus } from '../../../domain/object-value/SuscriptionStatus'
import DbCustomerRepository from '../../mongo/repository/DbCustomerRepository'
import DbGymRepository from '../../mongo/repository/DbGymRepository'
import DbPlanRepository from '../../mongo/repository/DbPlanRepository'
import DbSuscriptionRepository from '../../mongo/repository/DbSuscriptionRepository'
import { v4 as uuidv4 } from 'uuid'

async function customerSuscribeGym(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Instanciamos repositorio de GIMNASIO
  const _Gym = new DbGymRepository()
  // Instanciamos repositorio de CLIENTE
  const _Customer = new DbCustomerRepository()
  // Instanciamos repositorio de PLAN
  const _Plan = new DbPlanRepository()
  // Instanciamos repositorio de SUSCRIPCION
  const _Suscription = new DbSuscriptionRepository()
  // Instanciamos caso de uso OBTENER PLAN ACTIVO POR ID
  const getPlanById = new GetPlanEnableById(_Plan)
  // Instanciamos caso de uso INSCRIBIR CLIENTE EN GIMNASIO
  const inscriptCustomer = new InscriptCustomer(_Gym)
  // Instanciamos caso de usp INSCRIBIRME A UN GIMNSAIO
  const inscriptToGym = new InscriptToGym(_Customer)
  // Instanciamos caso de uso CREAR NUEVA SUSCRIPCION
  const createSuscription = new CreateNew(_Suscription)
  try {
    // Obtenemos id del plan a suscribir
    const { planId, gymId } = req.params
    // Obtenemos el tipo de pago
    const { type } = req.query
    // Obtenemos id del cliente
    const { uid } = req.user
    // Buscamos si existe el plan
    const planFound = await getPlanById.start(planId)
    // TODO Definir la fecha de inscripcion
    // TODO Inscribir al cliente en el gimnasio
    const gymInscription = await inscriptCustomer.start(gymId, uid)
    // TODO Inscribir al gimnasio en el cliente
    const customerInscription = await inscriptToGym.start(uid, gymId)
    // Crear nueva suscripcion
    const suscription: Suscription = {
      _id: uuidv4(),
      suscriptionNumber: 0,
      initDate: Date.now(),
      finishDate: Date.now() * 10,
      status: SuscriptionStatus.InProgress,
      paymentType: PaymentType.Cash,
      paymentTotal: planFound.price,
      customer: customerInscription!._id,
      gym: gymInscription!._id,
      plan: planFound._id
    }
    await createSuscription.start(suscription)
    // TODO Notificar al gimnasio que tiene un nuevo cliente
    // TODO Enviar un correo de confirmacion al gimnasio sobre el nuevo cliente
    // TODO Enviar un correo de confirmacion de suscripcion al cliente
    return res.status(201).send({ ok: true, message: 'Suscripcion creada' })
  } catch (err) {
    return next(err)
  }
}
export default customerSuscribeGym
