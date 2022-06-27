import { Router } from 'express'
import findAllGyms from '../controller/Gym/findAllGyms'
import findGymById from '../controller/Gym/findGymById'
import gymGetData from '../controller/Gym/gymGetData'
import gymUpdateDirection from '../controller/Gym/gymUpdateDirection'
import gymUpdatePhone from '../controller/Gym/gymUpdatePhone'
import gymUpdateProfile from '../controller/Gym/gymUpdateProfile'
import requireGym from '../middleware/requireGym'
import requireUser from '../middleware/requireUser'

const GymRouter = Router()

// ? Public Router
GymRouter.get('/all', findAllGyms)
GymRouter.get('/id/:gymId', findGymById)

// ? Private Router
// * Require user Authentication
GymRouter.use(requireUser)
GymRouter.use(requireGym)
GymRouter.get('/', gymGetData)
GymRouter.patch('/profile', gymUpdateProfile)
GymRouter.patch('/direction', gymUpdateDirection)
GymRouter.patch('/phone', gymUpdatePhone)

export default GymRouter
