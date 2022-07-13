import { Router } from 'express'
import findAllGymPlans from '../controller/Plan/findAllGymPlans'
import findPlanById from '../controller/Plan/findPlanById'
import createPlan from '../controller/Plan/createPlan'
import disablePlan from '../controller/Plan/disablePlan'
import enablePlan from '../controller/Plan/enablePlan'
import getPlanData from '../controller/Plan/getPlanData'
import getPlans from '../controller/Plan/getPlans'
import updatePlan from '../controller/Plan/updatePlan'

import requireGym from '../middleware/requireGym'
import requireUser from '../middleware/requireUser'

const PlanRouter = Router()

// ? Private Router
// * Require user Authentication

// Habilitar plan
PlanRouter.patch('/enable/:id', requireUser, requireGym, enablePlan)
// Deshabilitar plan
PlanRouter.patch('/disable/:id', requireUser, requireGym, disablePlan)
// Gimnasio obtiene todos los planes
PlanRouter.get('/g', requireUser, requireGym, getPlans)
// Gimnasio obtiene un plan
PlanRouter.get('/g/:id', requireUser, requireGym, getPlanData)
// Editar plan
PlanRouter.patch('/:id', requireUser, requireGym, updatePlan)
// Crear nuevo plan
PlanRouter.post('/', requireUser, requireGym, createPlan)

// ? Public Router
// Obtener todos los planes
PlanRouter.get('/all/:id', findAllGymPlans)
// Obetener okan por su id
PlanRouter.get('/:id', findPlanById)
export default PlanRouter
