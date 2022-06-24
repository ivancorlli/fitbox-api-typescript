import { Router } from 'express'
import gymUpdateProfile from '../controller/Gym/gymUpdateProfile'
import requireUser from '../middleware/requireUser'

const GymRouter = Router()

// ? Private Router
// * Require user Authentication
GymRouter.use(requireUser)
GymRouter.post('/', gymUpdateProfile)

export default GymRouter
