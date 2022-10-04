import { Router } from 'express'
import suscribePlan from '../../modules/suscription/infrastructure/controller/suscribePlan'
import suscribers from '../../modules/suscription/infrastructure/controller/suscribers'
import userSuscriptions from '../../modules/suscription/infrastructure/controller/userSuscriptions'
import deserializeGym from '../middleware/deserializeGym'
import deserializeUser from '../middleware/deserializeUser'
import requireGym from '../middleware/requireGym'
import requireUser from '../middleware/requireUser'

const SuscriptionRouter = Router()

SuscriptionRouter.get('/suscribers', deserializeGym, requireGym, suscribers)
SuscriptionRouter.get('/user', deserializeUser, requireUser, userSuscriptions)
SuscriptionRouter.post('/', deserializeUser, requireUser, suscribePlan)

export default SuscriptionRouter
