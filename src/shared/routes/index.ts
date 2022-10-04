import { Router } from 'express'
import UtilsRouter from './utils.routes'
import SessionRouter from './session.routes'
import UserRouter from './user.routes'
import GymRouter from './gym.routes'
import EmergencyRouter from './emergency.routes'
import deserializeUser from '../middleware/deserializeUser'
import requireUser from '../middleware/requireUser'
import AccessRouter from './access.routes'
import PlanRouter from './plan.routes'
import SuscriptionRouter from './sucription.routes'

const AllRoutes = Router()
AllRoutes.use('/user', UserRouter)
AllRoutes.use('/emergency', deserializeUser, requireUser, EmergencyRouter)
AllRoutes.use('/gym', GymRouter)
AllRoutes.use('/access', AccessRouter)
AllRoutes.use('/plan', PlanRouter)
AllRoutes.use('/utils', UtilsRouter)
AllRoutes.use('/suscription', SuscriptionRouter)
AllRoutes.use('/session', SessionRouter)

export default AllRoutes
