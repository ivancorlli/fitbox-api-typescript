import { Router } from 'express'
import forgotPassword from '../controller/User/forgotPassword'
import newUser from '../controller/User/newUser'
import resetPassword from '../controller/User/resetPassword'
import userChangeEmail from '../controller/User/userChangeEmail'
import userChangePassword from '../controller/User/userChangePassword'
import userLogin from '../controller/User/userLogin'
import userLogout from '../controller/User/userLogout'
import userSuspendAccount from '../controller/User/userSuspendAccount'
import userVerification from '../controller/User/userVerification'
import requireUser from '../middleware/requireUser'
import UserValidation from './middleware/User.validation'
const UserRouter = Router()
const Validation = new UserValidation()

// ? Public Router
// * Dont require user Athentication
UserRouter.post(
  '/',
  Validation.userQueryValidation,
  Validation.userRegistration,
  newUser
)
UserRouter.post(
  '/forgot-password',
  Validation.forgotPasswordValidation,
  forgotPassword
)
UserRouter.post('/login', Validation.userRegistration, userLogin)
UserRouter.patch('/verify/:token', userVerification)
UserRouter.patch('/reset/:token', resetPassword)

// ? Private Router
// * Require user Authentication
UserRouter.use(requireUser)
UserRouter.post('/logout', userLogout)
UserRouter.patch('/suspend', userSuspendAccount)
UserRouter.patch(
  '/change-password',
  Validation.changeOldPassValidation,
  userChangePassword
)
UserRouter.patch(
  '/change-email',
  Validation.changeEmailValidation,
  userChangeEmail
)
export default UserRouter
