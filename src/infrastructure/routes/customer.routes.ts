import { Router } from 'express'
import customerSuscribeGym from '../controller/Suscription/customerSuscribeGym'
import requireCustomer from '../middleware/requireCustomer'
import requireUser from '../middleware/requireUser'
import CustomerValidator from './middleware/Customer.validation'

const CustomerRouter = Router()
const Validator = new CustomerValidator()

// ? Public Router

// ? Private Router
// * Require user Authentication
CustomerRouter.use(requireUser)
CustomerRouter.use(requireCustomer)
CustomerRouter.post(
  '/:planId',
  Validator.customerSuscribePlanQueryValidator,
  customerSuscribeGym
)
export default CustomerRouter
