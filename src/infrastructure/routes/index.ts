import { Router } from 'express'
import DayRouter from './day.routes'
import GymRouter from './gym.routes'
import PlanRouter from './plan.routes'
import UserRouter from './user.routes'

const AllRoutes = Router()
AllRoutes.use('/user', UserRouter)
AllRoutes.use('/gym', GymRouter)
AllRoutes.use('/plan', PlanRouter)
AllRoutes.use('/day', DayRouter)

export default AllRoutes
