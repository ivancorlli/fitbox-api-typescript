import { Router } from 'express'
import newCustomer from '../controller/Customer/newCustomer'
import updateData from '../controller/Customer/updateData'
import requireCustomer from '../middleware/requireCustomer'
import requireUser from '../middleware/requireUser'

const CustomerRouter = Router()

// ? Private Router
// * Require user Authentication

// El cliente actualiza sus datos
CustomerRouter.patch('/data', requireUser, requireCustomer, updateData)

// ? Public Router
// Crear un nuevo usuario
CustomerRouter.post('/', newCustomer)
export default CustomerRouter
