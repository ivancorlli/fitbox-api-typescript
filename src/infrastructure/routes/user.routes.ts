import { Router } from 'express'
import forgotPassword from '../controller/User/forgotPassword'
import resetPassword from '../controller/User/resetPassword'
import changeEmail from '../controller/User/changeEmail'
import changePassword from '../controller/User/changePassword'
import login from '../controller/User/login'
import logout from '../controller/User/logout'
import verification from '../controller/User/verification'
import requireUser from '../middleware/requireUser'
import UserValidation from './middleware/User.validation'
const UserRouter = Router()
const Validation = new UserValidation()

// ? Public Router
// * Dont require user Athentication

// Verificar cuenta
UserRouter.patch('/verify/:token', verification)
// Ingresar a la aplicacion
UserRouter.post('/login', Validation.userRegistration, login)
// Solicitar nueva contrasenia
UserRouter.post(
  '/forgot-password',
  Validation.forgotPasswordValidation,
  forgotPassword
)
// Cambiar contrasenia olvidada
UserRouter.patch('/reset/:token', resetPassword)

// ? Private Router
// * Require user Authentication

// Cambiar mi contrasenia actual
UserRouter.patch(
  '/change-password',
  requireUser,
  Validation.changeOldPassValidation,
  changePassword
)
// Cambiar mi email actual
UserRouter.patch(
  '/change-email',
  requireUser,
  Validation.changeEmailValidation,
  changeEmail
)
// Cerrar Session
UserRouter.post('/logout', requireUser, logout)
export default UserRouter
