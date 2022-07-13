import { Router } from 'express'
import findAllDays from '../controller/Day/findAllDays'

const DayRouter = Router()
// ? Public Router
DayRouter.get('/', findAllDays)

export default DayRouter
