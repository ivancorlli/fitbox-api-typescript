import { Router } from 'express'
import deserializeGym from '../middleware/deserializeGym'
import requireGym from '../middleware/requireGym'
import activePlan from '../../modules/plan/infrastructure/controller/activePlan'
import activePlans from '../../modules/plan/infrastructure/controller/activePlans'
import changeStatus from '../../modules/plan/infrastructure/controller/changeStatus'
import getData from '../../modules/plan/infrastructure/controller/getData'
import gymPlans from '../../modules/plan/infrastructure/controller/gymPlans'
import newPlan from '../../modules/plan/infrastructure/controller/newPlan'
import updatePlan from '../../modules/plan/infrastructure/controller/updatePlan'

const PlanRouter = Router()

PlanRouter.get('/active/all', activePlans)
PlanRouter.get('/active', activePlan)
PlanRouter.patch('/status', deserializeGym, requireGym, changeStatus)
PlanRouter.get('/all', deserializeGym, requireGym, gymPlans)
PlanRouter.patch('/', deserializeGym, requireGym, updatePlan)
PlanRouter.post('/', deserializeGym, requireGym, newPlan)
PlanRouter.get('/', deserializeGym, requireGym, getData)

export default PlanRouter
