import { Router } from 'express'
import findAllGyms from '../controller/Gym/findAllGyms'
import findGymById from '../controller/Gym/findGymById'
import getData from '../controller/Gym/getData'
import updateData from '../controller/Plan/updateData'
import requireGym from '../middleware/requireGym'
import requireUser from '../middleware/requireUser'
import newGym from '../controller/Gym/newGym'

const GymRouter = Router()

// ? Private Router
// * Require user Authentication

// El gimnasio obtiene sus propios datos
GymRouter.get('/data', requireUser, requireGym, getData)
// El gimnasio actualiza sus datos
GymRouter.patch('/data', requireUser, requireGym, updateData)

// ? Public Router
// Crear un nuevo usuario
GymRouter.post('/', newGym)
// Obtener todos los gimnasios
GymRouter.get('/all', findAllGyms)
// Obtener un unico gimnasio
GymRouter.get('/:id', findGymById)
export default GymRouter
