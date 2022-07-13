import { Router } from 'express'
import CustomerRouter from './customer.routes'
import DayRouter from './day.routes'
import GymRouter from './gym.routes'
import PlanRouter from './plan.routes'
import SuscriptionRouter from './suscription.routes'
import UserRouter from './user.routes'

const AllRoutes = Router()
AllRoutes.use('/user', UserRouter)
AllRoutes.use('/gym', GymRouter)
AllRoutes.use('/plan', PlanRouter)
AllRoutes.use('/day', DayRouter)
AllRoutes.use('/customer', CustomerRouter)
AllRoutes.use('/suscription', SuscriptionRouter)

export default AllRoutes
