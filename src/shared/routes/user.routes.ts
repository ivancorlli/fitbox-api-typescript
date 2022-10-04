import { Router } from 'express'
import forgotPassword from '../../modules/users/infrastructure/controller/forgotPassword'
import resetPassword from '../../modules/users/infrastructure/controller/resetPassword'
import changeEmail from '../../modules/users/infrastructure/controller/person/changeEmail'
import changePassword from '../../modules/users/infrastructure/controller/person/changePassword'
import verifyAccount from '../../modules/users/infrastructure/controller/verifyAccount'

import newPerson from '../../modules/users/infrastructure/controller/person/newPerson'
import updateProfile from '../../modules/users/infrastructure/controller/person/updateProfile'
import getData from '../../modules/users/infrastructure/controller/person/getData'
import changeUsername from '../../modules/users/infrastructure/controller/person/changeUsername'
import deserializeUser from '../middleware/deserializeUser'
import requireUser from '../middleware/requireUser'
import searchUser from '../../modules/users/infrastructure/controller/person/searchUser'
const UserRouter = Router()

// Verificar cuenta
UserRouter.patch('/verify', verifyAccount)
// Cambiar contrasenia olvidada
UserRouter.patch('/reset', resetPassword)
// Solicitar nueva contrasenia
UserRouter.post('/password', forgotPassword)

// Cambiar mi contrasenia actual
UserRouter.patch('/password', deserializeUser, requireUser, changePassword)
// Cambiar mi email actual
UserRouter.patch('/email', deserializeUser, requireUser, changeEmail)
// Cambiar mi username actual
UserRouter.patch('/username', deserializeUser, requireUser, changeUsername)
// Obtener todos los usuarios
UserRouter.get('/search', searchUser)
// Obtener data
UserRouter.get('/', deserializeUser, requireUser, getData)
// Actualizar cuenta
UserRouter.patch('/', deserializeUser, requireUser, updateProfile)
// Nuevo usuario
UserRouter.post('/', newPerson)
export default UserRouter
