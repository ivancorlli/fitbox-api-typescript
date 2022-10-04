import { Router } from 'express'
import deserializeGym from '../middleware/deserializeGym'
import requireGym from '../middleware/requireGym'
import deleteUserAccess from '../../modules/access/infrastructure/controller/deleteUserAccess'
import getGymAccesses from '../../modules/access/infrastructure/controller/getGymAccesses'
import newUserAccess from '../../modules/access/infrastructure/controller/newUserAccess'
import updateUserAccess from '../../modules/access/infrastructure/controller/updateUserAccess'

const AccessRouter = Router()

AccessRouter.delete('/', deserializeGym, requireGym, deleteUserAccess)
AccessRouter.patch('/', deserializeGym, requireGym, updateUserAccess)
AccessRouter.post('/', deserializeGym, requireGym, newUserAccess)
AccessRouter.get('/', deserializeGym, requireGym, getGymAccesses)

export default AccessRouter
