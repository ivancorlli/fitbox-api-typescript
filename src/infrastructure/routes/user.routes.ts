import { Router } from 'express'
import newUser from '../controller/User/newUser'
import userChangeOldPassword from '../controller/User/userChangeOldPassword'
import userLogin from '../controller/User/userLogin'
import UserValidation from './middleware/User.validation'
const UserRouter = Router()
const Validation = new UserValidation()

UserRouter.post(
  '/',
  Validation.userQueryValidation,
  Validation.userRegistration,
  newUser
)
UserRouter.post('/login', Validation.userRegistration, userLogin)
UserRouter.post('/change-old-password', userChangeOldPassword)
export default UserRouter
