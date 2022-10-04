import { Router } from 'express'
import findAllDays from '../controller/findAllDays'

const UtilsRouter = Router()

UtilsRouter.get('/days', findAllDays)

export default UtilsRouter
