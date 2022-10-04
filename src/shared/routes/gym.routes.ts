import { Router } from 'express'
import getData from '../../modules/users/infrastructure/controller/gym/getData'
import newGym from '../../modules/users/infrastructure/controller/gym/newGym'
import updateProfile from '../../modules/users/infrastructure/controller/gym/updateProfile'
import changePassword from '../../modules/users/infrastructure/controller/gym/changePassword'
import changeEmail from '../../modules/users/infrastructure/controller/gym/changeEmail'
import changeUsername from '../../modules/users/infrastructure/controller/gym/changeUsername'
import deserializeGym from '../middleware/deserializeGym'
import requireGym from '../middleware/requireGym'
import searchGym from '../../modules/users/infrastructure/controller/gym/searchGym'

const GymRouter = Router()

// Cambiar mi contrasenia actual
GymRouter.patch('/password', deserializeGym, requireGym, changePassword)
// Cambiar mi email actual
GymRouter.patch('/email', deserializeGym, requireGym, changeEmail)
// Cambiar mi username actual
GymRouter.patch('/username', deserializeGym, requireGym, changeUsername)

// Buscar gimnasios
GymRouter.get('/search', searchGym)
// Actualizar datos del gimnasio
GymRouter.patch('/', deserializeGym, requireGym, updateProfile)
// Obtener datos del gimnasio
GymRouter.get('/', deserializeGym, requireGym, getData)
// Nuevo gimnasio
GymRouter.post('/', newGym)
export default GymRouter
