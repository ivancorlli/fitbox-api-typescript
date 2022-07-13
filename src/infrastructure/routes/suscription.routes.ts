import { Router } from 'express'
import cancelSuscription from '../controller/Suscription/cancelSuscription'
import suscribeGym from '../controller/Suscription/suscribeGym'
import chargeSuscription from '../controller/Suscription/chargeSuscription'
import searchPendingSuscriptions from '../controller/Suscription/searchPendingSuscriptions'
import requireCustomer from '../middleware/requireCustomer'
import requireGym from '../middleware/requireGym'
import requireUser from '../middleware/requireUser'

const SuscriptionRouter = Router()

// El cliente se suscribe a un plan
SuscriptionRouter.post('/:plan/:gym', requireUser, requireCustomer, suscribeGym)
SuscriptionRouter.delete(
  '/:id',
  requireUser,
  requireCustomer,
  cancelSuscription
)
// Gimnasio busca suscripciones pendientes
SuscriptionRouter.get(
  '/search/:number?',
  requireUser,
  requireGym,
  searchPendingSuscriptions
)
// Gimnasio cobra suscripcion
SuscriptionRouter.patch(
  '/charge/:id',
  requireUser,
  requireGym,
  chargeSuscription
)

export default SuscriptionRouter
