import { Router } from 'express'
import GymRouter from './gym.routes'
import UserRouter from './user.routes'

const AllRoutes = Router()
AllRoutes.use('/user', UserRouter)
AllRoutes.use('/gym', GymRouter)

export default AllRoutes
