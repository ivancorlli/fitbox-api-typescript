import { Router } from 'express'
import findAllDays from '../controller/Day/findAllDays'

const DayRouter = Router()
// ? Public Router
DayRouter.get('/all', findAllDays)

export default DayRouter
