import { Router } from 'express'
import gymAccess from '../../modules/session/infrastructure/controller/gymAccess'
import GymOut from '../../modules/session/infrastructure/controller/gymOut'
import login from '../../modules/session/infrastructure/controller/login'
import logout from '../../modules/session/infrastructure/controller/logout'
import deserializeGym from '../middleware/deserializeGym'
import deserializeUser from '../middleware/deserializeUser'
import requireGym from '../middleware/requireGym'
import requireUser from '../middleware/requireUser'

const SessionRouter = Router()
// ? Public Router

// User Access Gym
SessionRouter.post(
  '/access/:username',
  deserializeUser,
  deserializeGym,
  gymAccess
)
// User Access Gym Out
SessionRouter.post('/accessout', deserializeGym, requireGym, GymOut)
// Cerrar Session
SessionRouter.post(
  '/logout',
  deserializeUser,
  deserializeGym,
  requireUser,
  logout
)
// Ingresar a la aplicacion
SessionRouter.post('/login', deserializeUser, deserializeGym, login)

export default SessionRouter
