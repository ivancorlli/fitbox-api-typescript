import { Router } from 'express'
import newUser from '../controller/User/newUser'
const UserRouter = Router()

UserRouter.post('/', newUser)
export default UserRouter
