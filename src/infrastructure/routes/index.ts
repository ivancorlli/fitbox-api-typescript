import { Router } from 'express'
import UserRouter from './user.routes'

const AllRoutes = Router()
AllRoutes.use('/user', UserRouter)

export default AllRoutes
