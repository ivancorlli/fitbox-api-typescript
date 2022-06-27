import { Router } from 'express'
import findAllGymPlans from '../controller/Plan/findAllGymPlans'
import findPlanById from '../controller/Plan/findPlanById'
import gymCreatePlan from '../controller/Plan/gymCreatePlan'
import gymDisablePlan from '../controller/Plan/gymDisablePlan'
import gymEnablePlan from '../controller/Plan/gymEnablePlan'
import gymGetPlan from '../controller/Plan/gymGetPlan'
import gymGetPlans from '../controller/Plan/gymGetPlans'
import gymUpdatePlan from '../controller/Plan/gymUpdatePlan'

import requireGym from '../middleware/requireGym'
import requireUser from '../middleware/requireUser'

const PlanRouter = Router()

// ? Public Router
PlanRouter.get('/id/:planId', findPlanById)
PlanRouter.get('/all/:gymId', findAllGymPlans)

// ? Private Router
// * Require user Authentication
PlanRouter.use(requireUser)
PlanRouter.use(requireGym)
PlanRouter.post('/', gymCreatePlan)
PlanRouter.patch('/:planId', gymUpdatePlan)
PlanRouter.patch('/enable/:planId', gymEnablePlan)
PlanRouter.patch('/disable/:planId', gymDisablePlan)
PlanRouter.get('/a', gymGetPlans)
PlanRouter.get('/u/:planId', gymGetPlan)

export default PlanRouter
